import React, { useState, useEffect } from 'react';
import performApiCall from '../api/api';
import './Components.scss';

const Querying = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [sources, setSources] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { text: inputText, isUser: true },
    ]);
    
    try {
        const { text: responseData, sources: responseSources} = await performApiCall(inputText);
    
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { text: responseData, isUser: false },
        ]);
    
        setInputText('');
        setResponseMessage('');
        setErrorMessage('');
    
        setSources(responseSources); // Set the sources separately
        
    
        typeResponse(responseData);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error occurred while processing the request');
    }
  };
  
  

  const typeResponse = (message) => {
    setResponseMessage(message);
  };;

  useEffect(() => {
    setResponseMessage(''); // Reset response message
  }, [inputText]);

  return (
    <div className="query">
      <div className="query__title">Ask me a question!</div>
      <form onSubmit={handleSubmit} className="query__input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send your message..."
        />
        <button type="submit">
          Send
        </button>
      </form>
      <div className="query__results">
        <div className="query__title">Response</div>
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
            {message.text}
          </div>
        ))}
        {responseMessage && (
          <div className="message bot">
            {responseMessage}
          </div>
        )}
      </div>
      <div className="query__sources">
        <div className="query__title">
          <button onClick={() => setShowSources(!showSources)}>
            {showSources ? 'Hide Sources' : 'Show Sources'}
          </button>
        </div>
        {showSources && (
          <div className="query__results">
            {sources.map((source, index) => (
              <div key={index} className="query__sources__item">
                <p className="query__sources__item__text">
                  <span>Page Label: {source.page_label}</span>
                  <span>File Name: {source.file_name}</span>
                  <span>Relationships: {source.relationships}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
export default Querying;
  
