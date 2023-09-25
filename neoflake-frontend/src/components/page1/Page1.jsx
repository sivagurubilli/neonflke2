import React, { useState } from "react";
import axios from "axios";
import "./page1.css";
import dotenv from "dotenv";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Page1 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (type) => {
    const formData = new FormData();

    formData.append("file", type === "image" ? thumbnail : video);
    formData.append(
      "upload_preset",
      type === "image" ? "images_preset" : "videos_preset"
    );
    try {
      let cloudName = "dj1sn04ni";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, formData);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;

      // Handle success
    } catch (error) {
      console.log(error);
      // Handle errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const imgUrl = await handleUpload("image");
      const videoUrl = await handleUpload("video");

      setThumbnail(imgUrl);
      setVideo(videoUrl);

      setLoading(false);
      await axios.post("/api/upload", {
        title: title,
        description: description,
        thumbnailUrl: imgUrl,
        videoUrl: videoUrl,
      });

      console.log("uploaded succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="gopage2">
        <Link to="/page2">go to webPage 2</Link>
      </div>
      <h2 className="heading">Web Page 1 - Upload</h2>

      <form className="upload-form">
        <div>
          <label className="lebel">Title:</label>
          <input
            className="input"
            type="text"
            value={title}  
             maxLength="50"

            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="description">
          <label className="lebel-desc">Description:</label>
          <textarea
            className="text-area"
            maxLength="250"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="dropzone-container">
          <label className="lebel">Thumbnail:</label>
          <div className="dropzone">
            <input 
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setThumbnail((prev) => e.target.files[0])}
            />
          </div>
        </div>
        <div className="dropzone-container">
          <label className="lebel">Video:</label>
          <div className="dropzone">
            <input
              type="file"
              accept=".mpg, .avi, .mp4"
              onChange={(e) => setVideo((prev) => e.target.files[0])}
            />
          </div>
        </div>
        <div>

        {loading === true ? (
          <div className="loading">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperStyle
          wrapperClass
        />
        </div>
      ) : (
        <button type="button" onClick={handleSubmit}>
        Upload
      </button>
      )}
          
        </div>
      
      </form>
      
    </div>
  );
};

export default Page1;
