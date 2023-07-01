// websocketService.js

import { messageRecieved, webSocketConnected, webSocketDisconneted, webSocketError ,formatScreen,extractedData} from '../../../../../store/tutor/tutor';
import { useDispatch } from 'react-redux';
import { Buffer, constants } from 'buffer'
//import {  getUserStories} from "../../../../../store/tutor/userStorySlice";

import store from '../../../../../store/index'
import { getUserStories } from 'store/tutor/userStorySlice';

import { messageRecievedCode } from 'store/tutor/implementedCodeSlice';
import { messageRecievedUserStory } from 'store/tutor/userStorySlice';

const socketUrl = 'ws://34.171.99.103:8082';

let socket = null;
//let dispatch= store.dispatch;
const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};


export const initializeWebSocket = (componentName) => {
  
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
            // if (readableData.length > 0) {
                // Dispatch the event or perform the desired action
                store.dispatch(messageRecieved(JSON.parse(readableData).content));
            //   }else{
             //   store.dispatch(formatScreen());
            //   }
            //  sentence.push(JSON.parse(readableData).content)// Output: "H
    //         //   characters=JSON.parse(readableData).content;

  //  store.dispatch(messageRecieved(JSON.parse(readableData).content));

    // if(componentName == "tab3"){
    //     store.dispatch(messageRecievedCode(JSON.parse(readableData).content));

    //    // store.dispatch(extractedData());
    // }else if(componentName == "tab2"){
    //     store.dispatch(messageRecievedUserStory(JSON.parse(readableData).content));

    //     store.dispatch(extractedData());
    // }
    

   

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

            store.dispatch(getUserStories(newMessage));
        }
    //  socket.send(JSON.stringify(message));
      
    //  store.dispatch(messageSent(message)); // Dispatch the messageSent action with the sent message
    }
  };
