import '../App.css';
import { getImage } from '../firebaseHandler';
import './Experience.css'
import { Link } from "react-router-dom"


function Experience (props: any) {
  
  getImage(props.imageID).then((url) => {
    const img = document.getElementById(props.imageID)
    img?.setAttribute('src', url)
  })

  return (
      <div className='container'>
        <Link to={`/Experience/${props.id}`}>
          <div className='experience_card'>
            <h2>{props.title}</h2>
            <p>{props.location._lat}&emsp;{props.location._long}</p>
            <img id={props.imageID}/>
            <h4>{props.description}</h4>
            {props.rating}⭐
          </div>
        </Link>
      </div>
  )
};

export default Experience;