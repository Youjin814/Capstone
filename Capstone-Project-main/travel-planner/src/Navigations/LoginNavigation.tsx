import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function LoginNavigation(){
  return (
    <div id="navbar">
      <div id="title">
        <Link to='/'>Travel Planner</Link>
      </div>
    </div>
  );
};

export default LoginNavigation;