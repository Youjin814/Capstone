import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function LoginNavigation(){
  return (
    <div id="navbar">
      <div id="title">
        <Link to='/'>Travel Planner</Link>
      </div>
      <div id="navdiv">
        <nav>
          <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
              <Link to='/register'>Register</Link>
              </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LoginNavigation;