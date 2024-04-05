import { Link } from "react-router-dom"
import LandingLayout from "./Layouts/LandingLayout"
import seawa from './images/seawa.jpeg'
import corvallis from './images/corvallis.jpeg'

function LandingPage(){
    return(
        <div className="App">
            <LandingLayout>
                <header className="App-header">
                    <h1>
                    Welcome to Travel Planner
                    </h1>

                    <div id='container'>
                        <div id='placeholder_r'>
                            <img src={seawa} alt=""/>
                        </div>

                        <div id='landing_content_l'>
                            <h3>What is the Travel Planner App?</h3>

                            <p>
                            Travel Planner helps people can create their own experience and trip with other users. Users can create their ID and password to start the app. After that user can see create or search menu for trips and experiences. Users can search other user's experience or trip and rate other user's eperience and trip. Based on the rate, user can choose to add this trip in their trip list or not. Trip list helps user can make a plan for future trip.
                            </p>
                        </div>
                    </div>

                    <div id='container'>
                        <div id='placeholder_l'>
                            <img src={corvallis} alt=""/>
                        </div>

                        <div id='landing_content_r'>
                            <h3>What Makes us Different?</h3>

                            <p>
                            Travel Planner uses the power of crowdsourcing to find the best experiences and trips for a user. Every user has the oppourtunity to share their share their own experiences and other user can rate them. Since every post on the app is made by and rated by users, higher quality experiences and trips are promoted. This application ensures that a user can find the most enjoyable things to do on a vacation.
                            </p>
                        </div>
                    </div>

                    <div id='landing_content_c'>
                        <h3>Who we are</h3>

                        <p>
                        The Travel Planner team is made up of three seniors from Oregon State University exploring a way to change travel planning and media. We have a variety of backgrounds ranging from business to robotics to game development. Together with a passion for traveling and our own curiosities for exploring new web stacks, the Travel Planner app came to be.
                        </p>
                    </div>

                </header>


            </LandingLayout>
        </div>
    )
}

export default LandingPage