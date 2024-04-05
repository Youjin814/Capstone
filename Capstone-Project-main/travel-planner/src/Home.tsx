import { useEffect, useState } from 'react';
import './App.css';
import { getExperiences } from './firebaseHandler';
import { DocumentData } from 'firebase/firestore';
import Experience from './Experience/Experience';
import AppLayout from './Layouts/AppLayout';

type Post = {
  id: string;
  data: DocumentData;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getExperiences();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <AppLayout>
      <header className="App-header">

        {posts.map((post) => (
          <Experience
            id={post.id}
            title={post.data.title}
            imageID={post.data.imageID}
            description={post.data.description}
            location={post.data.location}
            rating={post.data.rating}
          />
        ))}
      </header>
    </AppLayout>
    </div>
  );
}

export default App;

