import React from "react";
import "../../App.js";
import Footer from "../Footer";
import UploadVideo from "../UploadVideo.jsx";

export default function EditVideo() {
  return (
    <>
      <div className="edit">
        <h1>EDIT</h1>
        <div className="edit-item">
          <UploadVideo />
        </div>
      </div>
      <Footer />
    </>
  );
}
