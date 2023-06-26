// ChatComponent.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeWebSocket, closeWebSocket, sendMessage } from './Websocketservice';
import { messageSent } from '../store/webSocketSlice';
import { FiSend } from "react-icons/fi";
import store from '../store/webSocketSlice'
import { Buffer, constants } from 'buffer'

import classNames from 'classnames'

const ChatComponent = ({chatHistory}) => {
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();
   chatHistory = useSelector((webSocketData) => webSocketData.history);
  const isConnected = useSelector((webSocketData) => webSocketData.isConnected);

  useEffect(() => {
    initializeWebSocket(); // Establish WebSocket connection on component mount

    return () => {
      closeWebSocket(); // Close WebSocket connection on component unmount
    };
  }, []);

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        content: messageText,
        sender: 'User',
        timestamp: new Date().toLocaleTimeString(),
      };
      sendMessage(newMessage);
      dispatch(messageSent());
      setMessageText('');
    }
  };

  return (
    <div
            className={classNames(
                'min-w-[430px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600',
               
              
            )}
        >
    <div className="chat-history">
      {chatHistory ? (
        chatHistory.map((message) => (
          <div key={message.id}>
            <span>{message.sender}</span>
            <span>{message.timestamp}</span>
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <p>No chat history available.</p>
      )}
    </div>
    <div className="flex-grow flex flex-col justify-end">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      {/* <button onClick={handleSendMessage} disabled={!isConnected}>
        Send
      </button> */}
      <button type="button" onClick={handleSendMessage}  className="flex items-center justify-center p-2 " disabled={isConnected}>
          <FiSend />
        </button>
    </div>
  </div>
  );
};

export default ChatComponent;
