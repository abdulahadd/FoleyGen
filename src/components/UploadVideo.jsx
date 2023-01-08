import React, { useState } from "react";
import "./Button.css";

const UploadVideo = () => {
  // State to store the selected video file
  const [videoFile, setVideoFile] = useState(null);

  // State to store the start and end times for the trimmed video
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);

  // Event handler for when the user selects a video file
  const handleFileSelect = (event) => {
    setVideoFile(event.target.files[0]);
  };

  // Event handler for when the user updates the trim start time
  const handleTrimStartChange = (event) => {
    setTrimStart(event.target.value);
  };

  // Event handler for when the user updates the trim end time
  const handleTrimEndChange = (event) => {
    setTrimEnd(event.target.value);
  };

  // Event handler for when the user clicks the 'Save' button
  const handleSaveClick = () => {
    // Create a new Blob object with the trimmed video
    const trimmedVideoBlob = new Blob(videoFile, {
      type: videoFile.type,
      start: trimStart,
      end: trimEnd,
    });

    // Generate a download URL for the trimmed video
    const downloadUrl = URL.createObjectURL(trimmedVideoBlob);

    // Create a temporary anchor element to simulate a download
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = downloadUrl;
    a.download = "trimmed-video.mp4";

    // Append the anchor element to the document and click it
    document.body.appendChild(a);
    a.click();

    // Remove the anchor element and revoke the download URL
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileSelect} />
      <input type="number" value={trimStart} onChange={handleTrimStartChange} />
      <input type="number" value={trimEnd} onChange={handleTrimEndChange} />
      <button className="hero-btns" onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default UploadVideo;
