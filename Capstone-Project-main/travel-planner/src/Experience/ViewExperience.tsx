import '../App.css';
import './Experience.css'
import { currUser, getExperiences, getReviews, createReview, getImage } from '../firebaseHandler';
import { Link, useParams } from "react-router-dom";
import { DocumentData } from 'firebase/firestore';
import { useState, useEffect } from "react";
import AppLayout from '../Layouts/AppLayout';


type Experience = {
    id: string;
    data: DocumentData;
}

type Review = {
    id: string;
    data: DocumentData;
}

let state = {
    allReviews: false,
    writeReview: false
}

export default function ViewExperience() {

    let { experienceID } = useParams();

    let props: Experience = { id: "", data: [] };

    const [exs, setExs] = useState<Experience[]>([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            const exs = await getExperiences();
            setExs(exs);
        }
        fetchExperiences();
    }, [])

    exs?.forEach((e) => {
        if(e.id === experienceID) {
            props = e;
        }
    })
    
    getImage(props.data.imageID).then((url) => {
        const img = document.getElementById(props.data.imageID)
        img?.setAttribute('src', url)
      })

    let star_arr = []
    let no_star = []

    for(let i = 0; i < Number(props.data.rating); i++) {
        star_arr.push(<Star />)
    }

    for(let i = star_arr.length; i < 5; i++) {
        no_star.push(<Star_Empty />)
    }

    return(
        <div className='App'>
            <AppLayout>
            <header className="App-header">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="view_experience">
                    <h1>{props.data.title}</h1>
                    <img id={props.data.imageID}/><br/>
                    
                    {/* {props.data.location._lat}&emsp;{props.data.location._long} */}
                    <br/>
                    {props.data.description}
                    <br/>
                    {star_arr.map((s) => (
                        <Star />
                    ))}

                    {no_star.map((s) => (
                        <Star_Empty />
                    ))}

                    <ShowReviews />
                </div>
                </header>
            </AppLayout>
        </div>
    );
}

//react component shows first 3 reviews, can show all reviews when "Show All Reviews" is clicked
function ShowReviews() {

    let { experienceID } = useParams();

    let matching_reviews: Review[] = [];

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const reviews = await getReviews();
            setReviews(reviews);
        }
        fetchReviews();
    }, [])

    reviews?.forEach((r) => {
        if(r.data.eid === experienceID) {
            matching_reviews.push(r);
        }
    })

    return(
        <div>
            {
                (!state.writeReview) ?
                <Link to={'/Experience/' + experienceID}>
                    <button id='new_review' onClick={() => {state.writeReview = true}}>Write A Reivew</button>
                </Link>
                :
                <WriteReview />
            }
            <br></br>
            {
                (!state.allReviews) ?
                matching_reviews?.slice(0, 3)?.map((r) => (
                    <Review_Box {...r}/>
                ))
                :
                matching_reviews?.map((r) => (
                    <Review_Box {...r}/>
                ))
            }

            {
                //button that either shows more reviews or less reviews
                (!state.allReviews) ?
                <Link to={'/Experience/' + experienceID}>
                    <button id='show_reviews' onClick={() => {
                        state.allReviews = true
                        }}>
                        Show All Reviews
                    </button>
                </Link>
                :
                <Link to={'/Experience/' + experienceID}>
                    <button id='show_reviews' onClick={() => {
                        state.allReviews = false
                        }}>
                        Show Less Reviews
                    </button>
                </Link>
            }
            

        </div>
    )
}

function Review_Box(r: Review) {

    let star_arr = []
    let no_star = []

    for(let i = 0; i < Number(r.data.rating); i++) {
        star_arr.push(<Star />)
    }

    for(let i = star_arr.length; i < 5; i++) {
        no_star.push(<Star_Empty />)
    }

    return(
        <div className="review_card" key={r.id}>
            <p>{r.data.username}</p>

            <p>{star_arr.map((s) => (
                <Star />
            ))}

            {no_star.map((s) => (
                <Star_Empty />
            ))}</p>
            <p className="bottom">{r.data.description}</p>
        </div>
    )
}


function WriteReview() {
    let { experienceID } = useParams();
    
    const [reviewbody, setReviewbody] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    //send review data (description, rating, user) to database
    const handleSubmit = (event: any) => {
        event.preventDefault();

        console.log("creating review by " + currUser + "\nbody: " + reviewbody + "\nrating: " + rating + "\nid: " + experienceID);
        let rate = rating;

        if(experienceID)
            createReview(reviewbody, experienceID, rate);
    }

    return(
        <form id='review' onSubmit={handleSubmit}>
            <input type="text"
             id='SearchBar'
             placeholder="Write Your Review"
             value={reviewbody}
             onChange={(e) => setReviewbody(e.target.value)} />
             <br/>
            <select 
             id='SearchBar'
             value={rating}
             onChange={(e) => setRating(e.target.value)}>
                <option value="1">Choose A Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br/>
            <input id='review_submit' type="submit" />
        </form>
    )

}

function Star() {
    return (<span className="fa fa-star checked"></span>)
}

function Star_Empty() {
    return (<span className="fa fa-star"></span>)
}

export { WriteReview }