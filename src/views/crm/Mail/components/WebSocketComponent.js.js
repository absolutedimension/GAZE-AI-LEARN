import React, { useEffect, useState } from 'react';
import { Buffer, constants } from 'buffer'

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const newSocket = new WebSocket('ws://34.171.99.103:8082');
    setSocket(newSocket);

    // Clean up WebSocket connection when component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Handle receiving messages from the WebSocket server
      socket.onmessage = (event) => {
      //  const message = event.data;

        const bufferData = Buffer.from(JSON.parse(event.data).data); // Example buffer data
        //   var sentence = [];
        const readableData = bufferData.toString();
        console.log(JSON.parse(readableData).content);
        setMessages((prevMessages) => [...prevMessages, JSON.parse(readableData).content]);
      };

      // Handle WebSocket connection errors
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }, [socket]);

  const sendMessage = (message) => {
    if (socket) {
      // Send message through the WebSocket connection
      socket.send(message);
    }
  };

  return (
   
    <div>
    {messages.length > 0 && <p>{messages.join(' ')}</p>}
   </div>
  
  );
};

export default WebSocketComponent;
