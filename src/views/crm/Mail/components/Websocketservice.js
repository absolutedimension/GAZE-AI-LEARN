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


export const initializeWebSocket = (token) => {
  
 //  {dispatch} = store;
  socket = new WebSocket(socketUrl);


  
  socket.onopen = () => {
    store.dispatch(webSocketConnected());
  //  const clientId = "YourClientId"; // Replace with the client's unique identifier
 // console.log("token==="+token);
  //  socket.send(token); // Send the initial message with the client ID
  };

  socket.onmessage = (event) => {

    try {



      const bufferData = Buffer.from(JSON.parse(event.data).data); // Example buffer data
    //         //   var sentence = [];
            const readableData = bufferData.toString();
         //   console.log(JSON.parse(readableData).content);
            // if (readableData.length > 0) {
                // Dispatch the event or perform the desired action
                store.dispatch(messageRecieved(JSON.parse(readableData).content));
    //  console.log("Message:", message1);

          //           console.log("Data from socket vbuffeererererererere=="+bufferData);
          // //         //   var sentence = [];
          //         const readableData = JSON.stringify(bufferData);
          //         console.log("Data after parse=="+readableData);
          //         //  sentence.push(JSON.parse(readableData).content)// Output: "H
          // //         //   characters=JSON.parse(readableData).content;

          // console.log("Client Id=="+JSON.stringify(JSON.parse(readableData)));

          // const bufferDataNew = Buffer.from(JSON.parse(readableData).data); 

          // console.log("last final dfata===="+bufferDataNew);
      
          // store.dispatch(messageRecieved(JSON.parse(readableData).content));
      
   // const message = JSON.parse(event.data);
  //  console.log("Data from socket=="+JSON.stringify(message));

//     const message = JSON.parse(event.data).data;
//     console.log("Data from socket == " + JSON.stringify(message));

//     const chars = message.map(num => String.fromCharCode(num)).join('');

// console.log("charactreeee==="+JSON.parse(chars['clientId']));

//     if (message && message.message && message.message.content) {
//       const content = message.message.content;
//       console.log(content);
//     } else {
//       console.log("Content not found in the received message.");
//     }
  
          //     const bufferData = Buffer.from(JSON.parse(event.data).data); // Example buffer data
    //         //   var sentence = [];
        //    const readableData = (bufferData).toString();
       //  console.log("All content in socket====="+JSON.stringify(JSON.parse(bufferData.message)));

     //  const message1 = String.fromCharCode(...message.data,message);
 //   console.log("Data from socket11111111 == " + JSON.parse(JSON.stringify(message1)));

      //  console.log("The string output=="+readableData );
         //   console.log(JSON.parse(readableData).content);
            //  sentence.push(JSON.parse(readableData).content)// Output: "H
    //         //   characters=JSON.parse(readableData).content;

  //  store.dispatch(messageRecieved(JSON.parse(readableData).content));

  //  store.dispatch(extractedData());

} catch (error) {
  console.error("Error parsing JSON data:", error);
}

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
