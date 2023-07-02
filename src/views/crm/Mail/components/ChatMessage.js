import React, { useState ,useRef,useEffect} from 'react';
import ThreeDotsWave from 'components/ui/ThreeWaveDots';
import ElegantText from './ElegantText';
import './Blog.css';
import ReactMarkdown from 'react-markdown';
import { AdaptableCard } from 'components/shared'
import { FiMousePointer } from 'react-icons/fi';
import WebSocketComponent from './WebSocketComponent.js.js';
import { useSelector, useDispatch } from 'react-redux'
import UserStoryCardList from 'views/project/ProjectList/components/UserStoryCardList';


const ChatMessage = ({ chatMessage, isLoading, loadingMessageId }) => {
  const handleKeywordClick = () => {
    // Handle keyword click event
  };

  const pattern = /(\d+\.\s[\w\s]+):/g;

  const chatContainerRef = useRef(null);


  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const markdownContent = chatMessage.message ? (
    <ReactMarkdown
     escapeHtml={true} 
     className="blog-content"
    //  renderers={{
    //     link: ({ href, children }) => (
    //       <a href={href}>
    //         <UserStoryCardList />
    //       </a>
    //     ),
    //   }}
     
     >

{chatMessage.message.replace(
      pattern,
      (match, group) => `[${group}](https://www.google.com) :`
    )}
    </ReactMarkdown>
  ) : null;


  //const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll the chat container to the bottom
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatMessage]);

  const prevChatMessage = useRef(null);

  useEffect(() => {
    prevChatMessage.current = chatMessage;
  });

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    if (prevChatMessage.current && prevChatMessage.current.id !== chatMessage.id) {
      scrollToBottom();
    }
  }, [chatMessage]);


  return (

    // <div>{chatMessage}</div>
    // <div>{chatMessage.message}</div>
   
    <div
      key={chatMessage.length}
      className={`flex ${chatMessage.isMe ? 'justify-end' : 'justify-start'}`}
      ref={chatContainerRef}
    >
      <div
        className={`${
          chatMessage.isMe ? 'rounded-bl-none' : 'rounded-br-none'
        } border p-3 flex-grow`}
      >
        {isLoading && loadingMessageId === chatMessage.id ? (
          <div className="flex">
            <AdaptableCard>{chatMessage.message}</AdaptableCard>
           
          </div>
        ) : (
          
          <AdaptableCard> {chatMessage.message}
           </AdaptableCard>
            // <div> {chatMessage.isMe?(chatMessage.message):(<WebSocketComponent/>)}</div>
         
        )}
      </div>
    </div>
  
  );
};

export default ChatMessage;
