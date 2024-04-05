import AppLayout from "../Layouts/AppLayout";
import { useState } from "react";
import { createTrip } from '../firebaseHandler';
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
    const nav = useNavigate()

    const [tripname, setTripname] = useState<string>("");

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let docID = createTrip(tripname)
        console.log(docID)
        nav('/MyTrips/' + docID + '/Add')
    }

    return(
        <div className="App">
            <AppLayout>
                <header className="App-header">
                    <form id='review' onSubmit={handleSubmit}>
                        <input type="text"
                        id='SearchBar'
                        placeholder="Trip Name"
                        value={tripname}
                        onChange={(e) => setTripname(e.target.value)} />
                        <br/>
                        
                        <br/>
                        <button id='AddTrip' type="submit">Create Trip</button>
                    </form>
                </header>
            </AppLayout>
        </div>
    )
}