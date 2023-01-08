import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import video from "../videos/video-2.mp4";
import { Link } from "react-router-dom";

function HeroSection() {
  const [button, setButton] = useState(true);
  return (
    <div className="hero-container">
      {/* <video src={video} autoPlay loop muted /> */}
      <h1>Add Foley sounds automatically to your videos </h1>
      <p>What are you waiting for?</p>

      <div className="hero-btns">
        <Link to="/edit" className="edit-links-mobile">
          Start Now
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
