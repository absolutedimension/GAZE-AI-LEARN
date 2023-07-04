import React from 'react';
import  AnimatedText  from 'react-animated-headline';



export const ChatFragment = ({chatMessage,isLoading, loadingMessageId}) => {
  const headlineStyles = {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#333',
    // Add any other custom styles here
  };

  const overlayStyles = {
    // Styles for the overlay (background color, etc.)
  };

  const animationStyles = {
    // Styles for the animated text
  };

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-4xl font-bold mb-8">Animated Text Headline</h1> */}
      <div >
        {/* <AnimatedText
          duration={1500}
          textColor="#333"
          overlayColor="#f7fafc"
          overlayClassName="text-lg font-medium"
          animationClassName="text-4xl font-bold"
          headlineStyles={headlineStyles}
          overlayStyles={overlayStyles}
          animationStyles={animationStyles}
        > */}

        {chatMessage.message}
          {/* Array of text items */}
          {/* {isLoading && loadingMessageId === chatMessage.id ? (
         
            chatMessage.message
           
        
        ) : (
          
           chatMessage.message
         
            // <div> {chatMessage.isMe?(chatMessage.message):(<WebSocketComponent/>)}</div>
         
        )} */}
          {/* {[
            'Welcome to the example component!',
            'Experience smooth animated text.',
            'Learn and enjoy!',
          ]} */}
        {/* </AnimatedText> */}
      </div>
    </div>
  );
};

