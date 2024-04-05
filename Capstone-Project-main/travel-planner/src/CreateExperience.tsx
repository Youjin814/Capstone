import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './App.css';
import AppLayout from './Layouts/AppLayout';
import { useNavigate } from 'react-router-dom'

interface Experience {
  id: string;
  title: string;
  location: string;
  description: string;
  imageID: string;
}

function CreateExperience() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !location || !description || !image) {
      console.log("Missing a parameter, unable to upload.")
      return;
    }
    setUploading(true);
    const db = firebase.firestore();
    const storage = firebase.storage();
    const experiencesRef = db.collection('Experiences');
    const imageName = Date.now() + image.name;
    const imageRef = storage.ref().child(imageName);
    await imageRef.put(image);
    const newExperience: Experience = {
      id: '',
      title,
      location,
      description,
      imageID: imageName,
    };
    const docRef = await experiencesRef.add(newExperience);
    newExperience.id = docRef.id;
    await docRef.set(newExperience);
    setTitle('');
    setLocation('');
    setDescription('');
    setImage(null);
    setUploading(false);

    navigate('/home')
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setImage(event.target.files[0]);
  };

  return (
    <div className="App">
      <AppLayout>
      <header className="App-header">
        <h1>Create Experience</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="title"></label>
            <input
              id="SearchBar"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              
            />
          </p>
          <p>
            <label htmlFor="location"></label>
            <input
              id="SearchBar"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </p>
            <p>
            <label htmlFor="image"></label>
            <input
              type="file"
              placeholder="Image"
              onChange={(event) => handleFileChange(event)}
              style={{ marginLeft: "80px" }}/>
          </p>
          <p>
            <label htmlFor="description" ></label>
            <textarea
              id="SearchBar"
              placeholder="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              style={{ height: '200px' }} 
            />
          </p>

          <p>
            <button id="SearchButton" type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Post'}
            </button>
          </p>
        </form>
      </header>
      </AppLayout>
    </div>
  );
}

export default CreateExperience;
