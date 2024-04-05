import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

interface Experience {
  id: string;
  title: string;
  location: string;
  context: string;
  imageUrl: string;
}

interface GroupedExperiences {
  location: string;
  experiences: Experience[];
}

function ShowTrips() {
  const [groups, setGroups] = useState<GroupedExperiences[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection("experiences").onSnapshot((snapshot) => {
      const experiences: Experience[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Experience;
        experiences.push({
          id: doc.id,
          title: data.title,
          location: data.location,
          context: data.context,
          imageUrl: data.imageUrl,
        });
      });
      const groupedExperiences: GroupedExperiences[] = [];
      experiences.forEach((experience) => {
        const group = groupedExperiences.find(
          (group) => group.location === experience.location
        );
        if (group) {
          group.experiences.push(experience);
        } else {
          groupedExperiences.push({
            location: experience.location,
            experiences: [experience],
          });
        }
      });
      setGroups(groupedExperiences);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setSelectedLocation(""); // Clear the selected location when performing a new search
  };

  const filteredGroups = groups.filter((group) =>
    group.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trips</h1>
        <input
          type="text"
          placeholder="Search by location"
          value={searchText}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredGroups.map((group) => (
            <div className="group" key={group.location}>
              <h2 onClick={() => handleLocationClick(group.location)}>{group.location}</h2>
              {selectedLocation === group.location && (
                <div className="experience_cards">
                  {group.experiences.map((experience) => (
                    <div className="experience_card" key={experience.id}>
                      <img src={experience.imageUrl} alt={experience.title} />
                      <h3>{experience.title}</h3>
                      <p>{experience.context}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default ShowTrips;




