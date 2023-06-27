import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { connect } from "react-redux";
import { StickyFooter } from "components/shared";
//import { sendMessage,fetchChatRequest } from "../redux/actions/chatActions";
import { motion } from 'framer-motion';
import { sendPromptChatGPT, getChatGPTApiData, updateHistory, setMessageAddress, updateHistoryLiveCode } from "store/tutor/tutor";
import { useDispatch, useSelector } from 'react-redux';
import ThreeDotsWave from "components/ui/ThreeWaveDots";
import { sendMessageToChatBoxProjectTutor } from "../../../../../store/tutor/tutorLiveCode";

const InputProjectTutor = ({ messages, isLoading, sendMessage }) => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

 //   const history = useSelector((state) => state.tutor.history);
    const userStoryInitialContext = useSelector((state) => state.userStorySlice.userStoryInitialContext);

    const projectTutorContext = useSelector((state) => state.tutor.projectTutorContext);
    const userStories = useSelector((state) => state.userStorySlice.userStories);


    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== "") {
            const newMessage = {
                id: generateRandomId,
                prompt: message,
                last_context:(userStoryInitialContext)+(userStories?(userStories.join(',')):(""))+(projectTutorContext?(projectTutorContext.join(',')):("")),
                isMe: true,
            };
            //  setChatMessages([...chatMessages, newMessage]);
            // fetchChatRequest();
            console.log("before calling" + message);
            //  sendPromptChatGPT(message);
            dispatch(setMessageAddress("projectTutor"));
            dispatch(sendMessageToChatBoxProjectTutor(message));
            dispatch(getChatGPTApiData(newMessage));

            //   const updatedHistory = [...projectTuto, message];
            dispatch(updateHistoryLiveCode());
            // console.log("after calling"+message);
            setMessage("");
        }
    };

    return (

        <div>
         
            {/* <StickyFooter
                className="px-8 flex items-center justify-between py-4"
                stickyClass="border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            > */}
                <div >
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center p-1 bg-grey "
                    >


                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your Question here..."
                            className="flex-1 p-3 mr-0   rounded-lg focus:outline-none"
                        />

                        <button type="button" className="flex items-center justify-center p-2 " disabled={isLoading}>
                            <FiSend />
                        </button>
                        {/* {isLoading ? 'Answering you' : 'Ask your tutor'} */}


                    </form>
                </div>
            {/* </StickyFooter> */}
        </div>






    );
};



const mapStateToProps = (state) => {
    return {
        messages: state.tutor.messages,
        isLoading: state.tutor.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendPromptChatGPT: (message) => dispatch(sendPromptChatGPT(message))
    };
};

export default InputProjectTutor;
