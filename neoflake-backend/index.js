require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())

const productController = require("./controllers/product.controller");

//based on route it calls the function 
app.use("/", productController);

module.exports = app;


