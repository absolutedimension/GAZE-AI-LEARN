import React, { useState } from 'react';
import ThreeDotsWave from 'components/ui/ThreeWaveDots';
import ElegantText from './ElegantText';
import './Blog.css';
import ReactMarkdown from 'react-markdown';
import { FiMousePointer } from 'react-icons/fi';

const StreamChatMessage = ({ chatMessage, isLoading, loadingMessageId }) => {
  const handleKeywordClick = () => {
    // Handle keyword click event
  };

  const pattern = /(\d+\.\s[\w\s]+):/g;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const markdownContent = chatMessage.message ? (
    <ReactMarkdown escapeHtml={true} className="blog-content">
      {chatMessage.message.replace(pattern, ' [$1]("") :')}
    </ReactMarkdown>
  ) : null;

  return (

    <div>{chatMessage.message}</div>
    // <div
    //   key={chatMessage.length}
    //   className={`flex ${chatMessage.isMe ? 'justify-end' : 'justify-start'}`}
    // >
    //   <div
    //     className={`${
    //       chatMessage.isMe ? 'rounded-bl-none' : 'rounded-br-none'
    //     } border p-3 flex-grow`}
    //   >
    //     {isLoading && loadingMessageId === chatMessage.id ? (
    //       <div className="flex">
    //         <div className="flex-grow">{chatMessage.message}</div>
    //         <div className="flex-grow">
    //           <ThreeDotsWave />
    //         </div>
    //       </div>
    //     ) : (
    //       <div>{chatMessage}</div>
    //     )}
    //   </div>
    // </div>
  );
};

export default StreamChatMessage;
