import React, { useState, useEffect } from "react";
import "./photos.css";

function Photos() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPhotos(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex min-w-0 gap-x-4">
      {photos.map((photo) => (
        <>
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={photo.url}
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {photo.title}
            </p>
          </div>
        </>
      ))}
    </div>
  );
}

export default Photos;
