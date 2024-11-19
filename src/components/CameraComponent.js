

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import 'primeicons/primeicons.css';

const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [capturedImage, setCapturedImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState("16:9");


  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };


  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      onCapture(imageSrc);
    }
  };


  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = 'captured_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.1, 1));


  const updateAspectRatio = (ratio) => setAspectRatio(ratio);

  return (
    <div className="camera-container py-[30px] px-[20px]">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode,
          aspectRatio: parseFloat(aspectRatio.split(":")[0]) / parseFloat(aspectRatio.split(":")[1]),
        }}
        style={{ transform: `scale(${zoomLevel})` }}
        className="flex items-center"
      />
      <div className="controls py-[12px]">
        <button onClick={toggleCamera}>Switch Camera</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleCapture}>Capture Image</button>


        <div className="aspect-ratio-options">
          {["16:9", "4:3", "1:1"].map((ratio) => (
            <button key={ratio} onClick={() => updateAspectRatio(ratio)}>
              {ratio}
            </button>
          ))}
        </div>


        {capturedImage && (
          <button onClick={handleDownload}>Download Image</button>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
