import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTrips, currUser, getExperiences, deleteTrip, updateTripExperiences } from '../firebaseHandler';
import { DocumentData } from 'firebase/firestore';
import Experience from '../Experience/Experience';
import AppLayout from "../Layouts/AppLayout";
import '../App.css';

type Trip = {
    id: string;
    data: DocumentData;
  }

//global variable to hold the trip a use select to view
var tripSelected: Trip = {id:"-1", data: []};

export default function MyTrips() {

    //set user to current user stored in firebaseHandler
    const user = currUser; 

    //get all trips
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
          const trips = await getTrips();
          setTrips(trips);
        };
        fetchTrips();
    }, []);
 
    //loops through all trips and finds ones made by user
    var tripArr: Trip[] = [];
    trips.forEach((trip) => {
        if(trip.data.username === user) {
            tripArr.push(trip)
        }
    })
    

    return (
        <div className="App">
            <AppLayout>
            <header className="App-header">
                <br></br>

                {tripArr.map((t) => (
                    <Link key={t.id} to={`/MyTrips/${t.id}`}>
                        <button onClick={() => (tripSelected = t)}>{t.data.tripName}</button>
                    </Link>
                ))}

                <br></br>

                <Link to={'/MyTrips/Create'}>
                    <button id='AddTrip'>Add Trip</button>
                </Link>

            </header>
        </AppLayout>
        </div>
    )
}

function RemoveTrip() {
    console.log("removing..." + tripSelected.id)

    deleteTrip(tripSelected.id)
}

export function ViewMyTrips() {
    const { tripID } = useParams();

    //get all experiences from trip list
    //use trip template since it is the same format as experiences
    const [exps, setExps] = useState<Trip[]>([]);
    const expArr: Trip[] = [];

    useEffect(() => {
        const fetchExp = async () => {
            const exps = await getExperiences();
            setExps(exps);
        };
        fetchExp();
    }, []);

    tripSelected.data.experiences?.forEach((eid: String) => {
        exps.forEach((e) => {
            if(e.id.substring(0, 20) === eid.substring(0, 20)) {
                expArr.push(e);
            }
        })
    });

    expArr?.forEach((e) => {
        console.log("loop value >> " + e.id)
    })


    return (
            <div className="App">
                <AppLayout>
                    <header className="App-header">
                        <h1>{tripSelected.data.tripName}</h1>
                        <br></br>


                        {expArr.map((exp) => (
                            <div>
                                <Experience
                                    id={exp.id}
                                    title={exp.data.title}
                                    imageID={exp.data.imageID}
                                    description={exp.data.description}
                                    location={exp.data.location}
                                    rating={exp.data.rating}
                                />

                                <Link to={`/MyTrips/${tripSelected.id}`}>
                                    <button onClick={() => {let idx = tripSelected.data.experiences.indexOf(exp.id)
                                    tripSelected.data.experiences.splice(idx, 1)
                                    updateTripExperiences(tripSelected)}}>
                                    Remove {exp.data.title}</button>
                                </Link>
                            </div>
                        ))}

                        <br></br>
                        <Link key={tripSelected.id} to={`/MyTrips/${tripSelected.id}/Add`}>
                            <button>Add</button>
                        </Link>
                        <br></br>

                        <Link to='/MyTrips'>
                            <button onClick={RemoveTrip}>Delete</button>
                        </Link>

                        <br></br>
                        <br></br>

                    </header>
                </AppLayout>
            </div>
    )
}