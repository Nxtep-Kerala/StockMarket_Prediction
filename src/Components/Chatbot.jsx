import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chatbot.css';

// Initialize the Gemini API using the environment variable
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const greetingShownRef = useRef(false);

  useEffect(() => {
    if (!greetingShownRef.current) {
      addMessage('bot', "Hello! I'm your Stock Market Guide AI. How can I assist you with stock market-related questions today?");
      greetingShownRef.current = true;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech when component unmounts
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (sender, text) => {
    setMessages(prevMessages => [...prevMessages, { id: Date.now(), sender, text }]);
  };

  const handleResponse = async (input) => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are a helpful AI assistant specializing in stock market information. 
                      Please provide an informative and concise answer to the following question 
                      about the stock market: "${input}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      addMessage('bot', text);
    } catch (error) {
      console.error('Error fetching response from Gemini:', error);
      addMessage('bot', "I'm sorry, I encountered an error while processing your request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    addMessage('user', input);
    handleResponse(input);
    setInput('');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleSpeech = (messageId, text) => {
    if (speakingMessageId === messageId) {
      // Stop speaking if it's the current message
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    } else {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      // Start speaking the new message
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => setSpeakingMessageId(null);
      window.speechSynthesis.speak(speech);
      setSpeakingMessageId(messageId);
    }
  };

  return (
    <div className={`chatbot ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header">
        <h3>Stock Market Guide AI</h3>
        <div className="chatbot-controls">
          <button onClick={toggleMinimize} className="minimize-btn">
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              <span>{message.text}</span>
            </div>
            {message.sender === 'bot' && (
              <button 
                onClick={() => toggleSpeech(message.id, message.text)} 
                className="speak-btn"
              >
                {speakingMessageId === message.id ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}
          </div>
        ))}
        {isLoading && <div className="loading">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a stock market question..."
        />
        <button type="submit" disabled={isLoading}><Send size={18} /></button>
      </form>
    </div>
  );
};

export default Chatbot;