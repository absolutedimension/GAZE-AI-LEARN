import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import questionData from './questions.json';
import { useDispatch,useSelector,connect } from 'react-redux';
import { getChatGPTApiData, sendMessageToChatBox,takeTest } from 'store/tutor/tutor';

const QuestionList = ({layoutType}) => {
  const [questions, setQuestions] = useState(questionData);

  const dispatch = useDispatch();
   layoutType = useSelector((state) => state.base.common.currentRouteKey)

  const handleTakeTest = () => {
    
    dispatch(takeTest(true));
  };
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleRowClick = (question) => {

    const quest = question.question + question.description


    const newMessage = {
      id: generateRandomId(),
      prompt: quest,
      isMe: true,
    };

    //  console.log("topic name=="+quest);
    dispatch(sendMessageToChatBox(quest));
    dispatch(getChatGPTApiData(newMessage));
  };

  return (
    <div className="container  mx-auto px-4 py-8">
      {questions.map((topic) => (
        <motion.div
          key={topic.topic}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{topic.topic}</h3>
            <button className="bg-purple-300 hover:bg-purple-500 text-white rounded-lg py-1 px-2 text-sm" onClick={handleTakeTest}>
              Take Test
            </button>
          </div> */}
          {topic.questions.map((question) => (
            <motion.div
              key={uuidv4()}
              onClick={() => handleRowClick(question)}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-lg p-4 mb-4 cursor-pointer"
            >
              <h4 className="text-lg font-bold mb-2">{question.question}</h4>
              <p className="text-gray-600">{question.description}</p>

            </motion.div>
          ))}
        </motion.div>
      ))}

      {/* <motion.button
        onClick={handleGenerateQuestions}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-4"
      >
        Generate More Questions
      </motion.button> */}
    </div>
  );
};
export default QuestionList;

