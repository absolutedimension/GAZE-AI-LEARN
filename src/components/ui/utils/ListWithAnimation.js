import React from 'react';
import { motion } from 'framer-motion';
import listData from 'assets/livecodedata/websocketReact.json';

const ListWithAnimation = ({userStoryArray}) => {
  


  return (
    <div className="container mx-auto">
      <ul className="space-y-4">
        {
        
        userStoryArray?( userStoryArray.map((objStory) => (
          
          <motion.li
            key={objStory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 * 0.1 }}
            className="list-item"
          >
           {/* <h3 className="text-sm">{objStory.story}</h3> */}
            <p className="text-sm">{objStory.description}</p>
          </motion.li>
        ))):null
        
       
        
        
        
        }
      </ul>
    </div>
  );
};

export default ListWithAnimation;
