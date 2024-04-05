import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import './App.css';
import AppLayout from './Layouts/AppLayout';

interface Trip {
  id: string;
  title: string;
  location: string;
  description: string;
  imageID: string;
}

function CreateTrip() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !location || !description || !image) {
      return;
    }
    setUploading(true);
    const db = firebase.firestore();
    const storage = firebase.storage();
    const tripsRef = db.collection('createtrip');
    const imageName = Date.now() + image.name;
    const imageRef = storage.ref().child(imageName);
    await imageRef.put(image);
    const newTrip: Trip = {
      id: '',
      title,
      location,
      description,
      imageID: imageName,
    };
    const docRef = await tripsRef.add(newTrip);
    newTrip.id = docRef.id;
    await docRef.set(newTrip);
    setTitle('');
    setLocation('');
    setDescription('');
    setImage(null);
    setUploading(false);
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
          <h1>Create Trip</h1>
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="title"></label>
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                
              />
            </p>
            <p>
              <label htmlFor="location"></label>
              <input
                type="text"
                placeholder="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </p>
              <p>
              <label htmlFor="image"></label>
              <input
                type="file"
                placeholder="image"
                onChange={(event) => handleFileChange(event)}
                style={{ marginLeft: "80px" }}/>
            </p>
            <p>
              <label htmlFor="context" ></label>
              <textarea
                placeholder="context"
                value={description}
                onChange={(event) => setDescription(event.target.value)  }
                style={{ height: '200px' }} 
                
              />
            </p>

            <p>
              <button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Post'}
              </button>
            </p>
          </form>
        </header>
      </AppLayout>
    </div>
  );
}

export default CreateTrip;
  