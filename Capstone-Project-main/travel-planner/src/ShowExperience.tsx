import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  imageID: string;
}

function ShowExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("experiences").onSnapshot((snapshot) => {
      const newExperiences: Experience[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Experience;
        return {
          id: doc.id,
          title: data.title,
          location: data.location,
          description: data.description,
          imageID: data.imageID,
        };
      });
      setExperiences(newExperiences);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredExperiences = experiences.filter((experience) =>
    experience.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Experiences</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
        />
        <ul>
          {filteredExperiences.map((experience) => (
            <div className="experience_card" key={experience.id}>
              <img src={experience.imageID} alt={experience.title} />
              <h2>{experience.title}</h2>
              <p>{experience.location}</p>
              <p>{experience.description}</p>
            </div>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default ShowExperience;

