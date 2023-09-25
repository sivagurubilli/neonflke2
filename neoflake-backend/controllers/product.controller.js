const Media = require("../models/media.model.js");
const express = require("express");
const multer = require('multer');
const dotenv = require('dotenv');
const router = express.Router();


  


  

// Get all product
router.get("/api/media", async (req, res) => {
  try {
    const data = await Media.find().lean().exec();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});


// Get Product by id 
router.get("/api/media/:id", async (req, res) => {
    try {
        
      const data = await Media.findById(req.params.id).lean().exec();
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  });

router.post('/api/upload',  async (req, res) => {
    try {
    
    const data = await Media.create(req.body);
    res.status(201).send({ data, status: "success" });
   
   
    } catch (error) {
      console.error(error);
    
    }
  });





  module.exports = router;