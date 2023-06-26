// websocketService.js

import { messageRecieved, webSocketConnected, webSocketDisconneted, webSocketError ,extractedData} from '../../../../store/tutor/tutor';
import { useDispatch } from 'react-redux';
import { Buffer, constants } from 'buffer'
import {  getChatGPTApiData} from "../../../../store/tutor/tutor";

import store from '../../../../store/index'

const socketUrl = 'ws://34.171.99.103:8082';

let socket = null;
//let dispatch= store.dispatch;
const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};


export const initializeWebSocket = () => {
  
 //  {dispatch} = store;
  socket = new WebSocket(socketUrl);


  
  socket.onopen = () => {
    store.dispatch(webSocketConnected());
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
//    console.log("Data from socket=="+message);
               const bufferData = Buffer.from(JSON.parse(event.data).data); // Example buffer data
    //         //   var sentence = [];
            const readableData = bufferData.toString();
            console.log(JSON.parse(readableData).content);
            //  sentence.push(JSON.parse(readableData).content)// Output: "H
    //         //   characters=JSON.parse(readableData).content;

    store.dispatch(messageRecieved(JSON.parse(readableData).content));

  //  store.dispatch(extractedData());

  };

  socket.onclose = () => {
    store.dispatch(webSocketDisconneted());
  };

  socket.webSocketError = (error) => {
    store.dispatch(webSocketError(error));
  };
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendMessage = (message) => {
    if (socket) {

        if (message !== "") {
            const newMessage = {
              id: generateRandomId(),
              prompt: message,
              last_context:'',
              isMe: true,
            };

            store.dispatch(getChatGPTApiData(newMessage));
        }
    //  socket.send(JSON.stringify(message));
      
    //  store.dispatch(messageSent(message)); // Dispatch the messageSent action with the sent message
    }
  };
