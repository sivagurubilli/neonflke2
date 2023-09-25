import React from 'react';
import {  Routes, Route} from 'react-router-dom';
import Page1 from './components/page1/Page1';
import Page2 from './components/page2/Page2';
import Page3 from './components/page3/Page3';
import Navbar from './components/Navbar/Navbar';
import axios from "axios"
axios.defaults.baseURL ="https://neonflake-400a.onrender.com"




function App() {
  return (
    <div>
       <Navbar />
    <Routes>
     
    <Route path="/" element={<Page1/>} />
        
        <Route path="/page2" element={<Page2/>} />
        <Route path="/page3/video/:id" element={<Page3/>} />
    </Routes>
    </div>
  );
}

export default App;

