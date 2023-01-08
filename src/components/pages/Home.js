import React from "react";
import "../../App.js";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import UploadVideo from "../UploadVideo.jsx";

function Home() {
  return (
    <>
      <HeroSection />
      {/* <UploadVideo /> */}
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
