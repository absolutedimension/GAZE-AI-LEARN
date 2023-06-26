import React from 'react';
import { motion } from 'framer-motion';
import listData from 'assets/livecodedata/websocketReact.json';
import QuickStart from 'views/pages/Welcome/components/QuickStart';

const ListUserStories = () => {
  return (
    <div className="container mx-auto">
      <ul className="space-y-4">
        {listData.steps.map((step, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="list-item"
          >
            <QuickStart/>
            {/* <h3 className="text-sm">{step.title}</h3>
            <p className="text-sm">{step.description}</p> */}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ListUserStories;
