// frontend/src/components/Page3.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import "./page3.css"



const Page3 = () => {
  const { id } = useParams();
const [itemData,setItemData] = useState({})
const [videoId,setVideoId] = useState("")


    useEffect(() => {
    // Fetch the list of media items from the server
    async function fetchMediaList() {
      try {
        const response = await axios.get("/api/media/"+id);
        console.log(response)
        setItemData(response.data);
        setVideoId(response.data.videoUrl)
    
      } catch (error) {
        console.log(error)
        // Handle errors
      }
    }

    fetchMediaList();
  }, []);


  return (
    <div className='container3'>
      <h2>Web Page 3 - Display Video</h2>
    
     
      {itemData.videoUrl && <video width="500" height="300"  controls autoPlay>
        <source src={videoId} type="video/mp4" />
      
      </video>
}


      <h3>{itemData.title}</h3>
    
      <h3>{itemData.description}</h3>
    </div>
  );
};

export default Page3;
