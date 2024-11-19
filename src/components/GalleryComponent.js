

import React from 'react';

const GalleryComponent = ({ images, onDelete }) => {

  const handleDownload = (imageSrc) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'captured_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="gallery-container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
      {images.map((image, index) => (
        <div key={index} className="image-item relative rounded-lg overflow-hidden">

          <img src={image} alt={`Captured ${index}`} className="w-full h-full object-cover" />


          <div className="absolute top-2 right-2 flex gap-2">

            <button
              onClick={() => handleDownload(image)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              title="Download Image"
            >
              <i className="pi pi-download"></i>
            </button>


            <button
              onClick={() => onDelete(index)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              title="Delete Image"
            >
              <i className="pi pi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryComponent;
