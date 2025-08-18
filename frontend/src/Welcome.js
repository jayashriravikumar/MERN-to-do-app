import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
    
      <div className="overlay">
        <h1>Welcome to Your To-Do List</h1>
        <p>Stay organized. Boost your productivity. Achieve more every day!</p>
        <button className="start-btn" onClick={() => navigate("/todos")}>
          Get Started ➜
        </button>
      </div>
    </div>
  );
}

export default Welcome;
