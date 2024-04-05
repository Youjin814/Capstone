import AppLayout from "../Layouts/AppLayout";
import { DocumentData } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { getExperiences, getTrips, updateTripExperiences } from '../firebaseHandler';
import SearchBar from "../SearchBar";
import Experience from '../Experience/Experience';
import { useParams, useNavigate } from "react-router-dom";

type Post = {
    id: string;
    data: DocumentData;
}

export default function AddExperience() {
    const { tripID } = useParams();
    const nav = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [result, setResutlts] = useState<Post[]>([])
    const [showResults, setShowResults] = useState(false)
    const [trips, setTrips] = useState<Post[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
          const trips = await getTrips();
          setTrips(trips);
        };
        fetchTrips();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
        const posts = await getExperiences();
        setPosts(posts);
        };
        fetchPosts();
    }, []);


    var trip: Post
    trips?.forEach((t) => {
        if(t.id === tripID) {
            trip = t
        }
    })


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
                                <div>
                                    <Experience
                                        key={post.id}
                                        title={post.data.title}
                                        imageID={post.data.imageID}
                                        description={post.data.description}
                                        location={post.data.location}
                                        rating={post.data.rating}
                                    />
                                    <button onClick={() => {
                                        trip.data.experiences.push(post.id)
                                        updateTripExperiences(trip)
                                        nav('/MyTrips/' + tripID)
                                    }}>Add</button>
                                </div>
                                ))}
                        </div>
                    }

                </header>
            </AppLayout>
        </div>
    )
}