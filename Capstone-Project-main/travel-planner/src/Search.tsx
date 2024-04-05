import { useState, useEffect } from "react";
import { getExperiences } from './firebaseHandler';
import { DocumentData } from 'firebase/firestore';
import Experience from './Experience/Experience';
import SearchBar from "./SearchBar";
import AppLayout from './Layouts/AppLayout';


type Post = {
    id: string;
    data: DocumentData;
  }

export default function Search(){

    const [posts, setPosts] = useState<Post[]>([]);
    const [result, setResutlts] = useState<Post[]>([])
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
        const posts = await getExperiences();
        setPosts(posts);
        };
        fetchPosts();
    }, []);

    const handleSearch = (query: string) => {
        console.log(`Searching for "${query}"...`);
        setResutlts(posts.filter(p => p.data.title.toUpperCase().includes(query.toUpperCase())))
        setShowResults(true)
      };

    return(
        <div className="App">
                <AppLayout>
                <header className="App-header">
                    <SearchBar onSearch={handleSearch} />

                    {showResults && 
                        <div>
                            {result.map((post) => (
                                <Experience
                                    id={post.id}
                                    title={post.data.title}
                                    imageID={post.data.imageID}
                                    description={post.data.description}
                                    location={post.data.location}
                                    rating={post.data.rating}
                                />
                                ))}
                        </div>
                    }

                </header>
            </AppLayout>
        </div>
    )
}