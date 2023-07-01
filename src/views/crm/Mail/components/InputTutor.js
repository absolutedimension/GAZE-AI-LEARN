import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { connect } from "react-redux";
//import { sendMessage,fetchChatRequest } from "../redux/actions/chatActions";
import { motion } from 'framer-motion';
import { sendPromptChatGPT ,getChatGPTApiData,sendMessageToChatBox,updateHistory, setMessageAddress} from "store/tutor/tutor";
import { useDispatch, useSelector } from 'react-redux';
import ThreeDotsWave from "components/ui/ThreeWaveDots";

const InputTutor = ({messages,isLoading, sendMessage }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const  history = useSelector((state) => state.tutor.history);
  const  tutorContext = useSelector((state) => state.tutor.tutorContext);
  const  token = useSelector((state) => state.auth.session.token);
 
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      const newMessage = {
        id: generateRandomId,
        prompt: message,
        client_id:token,
        last_context:(tutorContext?(tutorContext.join(',')):("")),
        isMe: true,
      };
    //  setChatMessages([...chatMessages, newMessage]);
     // fetchChatRequest();
     console.log("before calling"+message);
   //  sendPromptChatGPT(message);
      dispatch(setMessageAddress("tutor"));
     dispatch(sendMessageToChatBox(message));
     dispatch(getChatGPTApiData(newMessage));

     const updatedHistory = [...history, message];
    dispatch(updateHistory(updatedHistory));
    // console.log("after calling"+message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col  " >
      
      {/* <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-4 space-y-4">
          {messages.map((chatMessage) => (
            <div
              key={chatMessage.id}
              className={`flex ${
                chatMessage.isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 bg-white rounded-xl ${
                  chatMessage.isMe ? "rounded-bl-none" : "rounded-br-none"
                }`}
              >
                <p>{chatMessage.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-1 bg-grey "
      >

            {/* <InputGroup className="mb-4">
                <Input
                    prefix={
                        <HiOutlineMicrophone className="text-xl text-indigo-600 cursor-pointer" />
                    }
                />
                <Button>Send</Button>
            </InputGroup> */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your Question here..."
          className="flex-1 p-3 mr-0   rounded-lg focus:outline-none"
        />
        {/* <button className="flex items-center justify-center p-2 bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 text-white font-bold py-2 px-4 rounded">
        <FiSend />
        </button> */}
        <button type="button"  className="flex items-center justify-center p-2 " disabled={isLoading}>
          <FiSend />
        </button>
        {/* {isLoading ? 'Answering you' : 'Ask your tutor'} */}
        <div>
        {/* {isLoading ? (
        <div className="flex">
        <ThreeDotsWave></ThreeDotsWave>
    
 
        </div>
        ) : (
        <div style={{ display: 'none' }}>Content loaded!</div>
          )} */}
        </div>
     
    
      </form>
    </div>
  );
};



const mapStateToProps = (state) => {
  return {
    messages: state.tutor.messages,
   isLoading:state.tutor.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendPromptChatGPT: (message) => dispatch(sendPromptChatGPT(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTutor);
