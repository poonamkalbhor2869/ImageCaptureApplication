
import React, { useState, useEffect } from 'react';
import "../src/App.css";
import 'primeicons/primeicons.css';
import CameraComponent from './components/CameraComponent';
import GalleryComponent from './components/GalleryComponent';

const App = () => {
  const [images, setImages] = useState([]);
  const [showUI, setShowUI] = useState(false);
  const [showCamera, setShowCamera] = useState(false);


  useEffect(() => {
    const storedImages = localStorage.getItem('images');
    const storedShowUI = localStorage.getItem('showUI') === 'true';
    const storedShowCamera = localStorage.getItem('showCamera') === 'true';

    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
    setShowUI(storedShowUI);
    setShowCamera(storedShowCamera);
  }, []);


  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('showUI', showUI);
    localStorage.setItem('showCamera', showCamera);
  }, [images, showUI, showCamera]);

  const handleCapture = (image) => {
    setImages((prev) => [...prev, image]);
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCaptureClick = () => {
    setShowUI(true);
    setShowCamera(true);
  };

  const handleBackClick = () => {
    setShowUI(false);
    setShowCamera(false);
  };

  return (
    <>
      <div className="app-container">
        {!showUI && (
          <>
          <div className='app-background flex items-center w-full'>

            <div className='h-full m-[40px] '>
              <div className='flex justify-center text-[34px] sm:text-[16px] md:text-[30px] lg:text-[40px] xl:text-[38px] 3xl:text-[1.954vw] text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1b225c] via-[#2c52fc] to-[#8a02fa] items-center'>
                Welcome To Image Capture Application
              </div>
              <div className="capture-button-container flex items-center justify-center py-[20px]">
                <button
                  className="capture-button px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                  onClick={handleCaptureClick}
                >
                  Capture Image
                </button>
              </div>
            </div>
          </div>
          </>
        )}

        {showUI && (
          <>
            <div className='mx-[50px] md:mx-[150px] lg:mx-[250px] xl:mx-[350px] 2xl:mx-[490px] 3xl:mx-[33.25vw]'>
              <div className='flex justify-center py-[20px] xl:py-[20px] 3xl:py-[1.146vw] items-center gap-8'>
              <h1 className="text-[24px] xl:text-[24px] 2xl:text-[24px] 3xl:text-[1.406vw] text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-600 font-semibold">
  Capture Image
</h1>

                <button
                  className="px-4 py-2 bg-[#2c3d57] text-[#fff] font-semibold rounded-lg hover:bg-[#27364e] justify-end"
                  onClick={handleBackClick}
                >
                  <i className='pi pi-arrow-left pr-[8px]'></i>
                  Back
                </button>
              </div>
              <div className="flex capture-button-container flex-col items-center justify-center bg-[#434c58] border rounded-2xl border-[#313440]">
                {showCamera && <CameraComponent onCapture={handleCapture} />}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[20px] xl:gap-[20px] 3xl:gap-[1.042vw] p-[20px] xl:p-[20px] 3xl:p-[1.042vw]">
              {images.length > 0 &&
                images.map((image, index) => (
                  <div className="col-span-1" key={index}>
                    <GalleryComponent
                      images={[image]}
                      onDelete={() => handleDelete(index)}
                      className=""
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
