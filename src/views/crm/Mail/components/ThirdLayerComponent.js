import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from "react-redux";
//import { sendMessage } from '../redux/actions/chatActions';
import ElegantText from './ElegantText';



//import { FiSend } from "react-icons/fi";
//import RichTextView from './RichTextView';
import ChatMessage from './ChatMessage';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'; // Import the desired language syntax
//import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Import the desired code theme
//import AutoFormattedText from './AutoFormattedText';

import ReactMarkdown from 'react-markdown';
import ThreeDotsWave from 'components/ui/ThreeWaveDots';


import { useDispatch, useSelector } from 'react-redux';
import { sendPromptChatGPT, getChatGPTApiData, sendMessageToChatBox, getCourseDetailsApiData } from "store/tutor/tutor";


// Register the language syntax
SyntaxHighlighter.registerLanguage('javascript', javascript);


const ThirdLayeredComponent = ({ isLoading, messages, sendMessage, loadingMessageId }) => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleKeywordClick = (data) => {

    dispatch(sendMessageToChatBox(data));
    dispatch(getCourseDetailsApiData(data));

  }


  return (

    <div className="m-0 mt-0 right-00 h-screen mt-10  bg-white-200 shadow-lg p-8 z-30  rounded-xl overflow-y-auto">
      <div className="h-1/5  bg-white-200 p-10 z-30  "></div>
      <div className="flex flex-col justify-end">
        {messages.map((chatMessage) => (
          <ChatMessage chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
        ))}
      </div>
    </div>

  );
};

const mapStateToProps = (state) => {
  // console.log("Insdoe component from state ==="+JSON.stringify(state.chat.messages));
  // setChatMessages([...messages, state.chat.messages]);
  return {
    messages: state.tutor.messages,
    isLoading: state.tutor.isLoading,
    loadingMessageId: state.tutor.loadingMessageId


  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // sendMessage: (message) => dispatch(sendMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdLayeredComponent);
