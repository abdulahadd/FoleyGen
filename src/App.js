import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home.js";
import About from "./components/pages/About";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import EditVideo from "./components/pages/EditVideo";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          {/* <Route path="/products" exact element={<Products />} /> */}
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/edit" exact element={<EditVideo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
