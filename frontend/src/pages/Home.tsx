import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="typing-box">
          <h1 className="typing-text">Welcome to the AI Chat App</h1>
        </div>

        <div className="info-section">
          <p className="description">
            Need help with knowledge, business advice, or education?
          </p>
          <p className="highlight-text">
            You’re in the right place — chat with our smart assistant to get started.
          </p>
        </div>

        <div className="demo-box">
          <div className="message-box user-msg">Hi there 👋</div>
          <div className="message-box bot-msg">
            Hello! I’m here to assist you. Ask me anything.
          </div>
        </div>

        <button className="cta-button" onClick={() => navigate("/login")}>
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default Home;
