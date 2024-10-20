import React, { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Chatbot from './Components/Chatbot';
import { MessageCircle, X } from 'lucide-react';
import { useAuth } from './AuthContext'; // Import the AuthContext for login/logout

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { logout } = useAuth(); // Get the logout function from the context

  // Toggles the chatbot open and closed
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="App">
      {/* Header and Footer components */}
      <Header />

      {/* Logout button */}
      

      <Footer />

      {/* Chatbot container with toggle functionality */}
      <div className={`chatbot-container ${isChatbotOpen ? 'open' : ''}`}>
        {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />} 
        <button
          className="chatbot-toggle"
          onClick={toggleChatbot}
          aria-label={isChatbotOpen ? 'Close chat' : 'Open chat'}
        >
          {/* Toggle between MessageCircle and X icons */}
          {isChatbotOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
}

export default App;
