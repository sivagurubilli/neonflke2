
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./page2.css"
import { useNavigate } from 'react-router-dom';


const Page2 = () => {
  const [mediaList, setMediaList] = useState([]);
const navigate= useNavigate()


  useEffect(() => {
    // Fetch the list of media items from the server
    async function fetchMediaList() {
      try {
        const response = await axios.get('/api/media');
        setMediaList(response.data);
      } catch (error) {
        // Handle errors
        console.log(error)
      }
    }

    fetchMediaList();
  }, [mediaList]);


  const handleClick= (id)=>{
    navigate(`/page3/video/${id}`)
  }

  return (
    <div>
      <h2 className='heading'>Web Page 2</h2>
      {mediaList.length >= 1 ? (
     <div className='container' >
        { mediaList.map((media) => (
          <div className='card' onClick ={()=>handleClick(media._id)} key={media._id}>
            <img src={media.thumbnailUrl} alt={media.title} />
            <h4>{media.title}</h4>
            <h4>{media.description}</h4>
            {/* Add a click handler to navigate to Web Page 3 */}
          </div> 
        ))}
    </div> ): ""}
    </div>
  );
};

export default Page2;
