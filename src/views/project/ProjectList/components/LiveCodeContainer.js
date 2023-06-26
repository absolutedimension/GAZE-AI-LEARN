
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import React, { useState, useSelector } from "react";
import MonacoEditor from "@monaco-editor/react";
import { motion } from "framer-motion";

import ListWithAnimation from "components/ui/utils/ListWithAnimation";

import YamlReaderComponent from 'components/ui/utils/YamlReaderComponent';
import { Tabs } from 'components/ui'
import { MonacoTree } from 'components/ui/monaco-tree';
import AppView from 'components/ui/utils/AppView';
import MailDetail from 'views/crm/Mail/components/MailDetail';
import { AdaptableCard } from 'components/shared';
import QuickStart from 'views/pages/Welcome/components/QuickStart';
import Step1 from 'views/pages/Welcome/components/Step1';
import Step2 from 'views/pages/Welcome/components/BuildUserStory';
import { ScrollBar, Avatar, Button } from 'components/ui'
import LiveCodeUserStory from 'views/crm/Mail/components/livecodeComponent/LiveCodeUserStory';
import ListUserStories from 'components/ui/utils/ListUserStories';
import BuildUserStory from 'views/pages/Welcome/components/BuildUserStory';
import UserStoriesListCard from 'views/crm/Mail/components/livecodeComponent/UserStoriesListCard';

import TrainingTopics from 'views/crm/Mail/components/TrainingTopics'
import UserStoryCardList from './UserStoryCardList';
import UserJourneyMenu from './UserJourneyMenu';


import { injectReducer } from '../store/index'
import reducer from '../store'


//injectReducer('liveCodeData', reducer)



const { TabNav, TabList, TabContent } = Tabs




const Pill = () => {

  return (
    <div>
      <Tabs defaultValue="tab1">
        <TabList>

          <TabNav value="tab0">Features to Develop</TabNav>
          <TabNav value="tab1">Implement Single Feature</TabNav>
          <TabNav value="tab2">Explanation</TabNav>
          <TabNav value="tab3">Code</TabNav>
          <TabNav value="tab4">Tutor</TabNav>
        </TabList>
        <div className="p-4">

          <TabContent value="tab0">
            {/* <Step2/>
          <Step2/>
           <QuickStart/> */}
            {/* <UserStoryCardList/> */}
            {/* <BuildUserStory/> */}
            {/* <ListUserStories/> */}

          </TabContent>
          <TabContent value="tab1">
            <div>Step 1: Create the Registration Form Component

              Create a new React component called RegistrationForm.
              Inside the component, design and implement a form that includes fields for username, email, and password.
              Use controlled inputs to handle user input and store the values in component state.</div>
          </TabContent>
          <TabContent value="tab2">
            <ListWithAnimation />
          </TabContent>
          <TabContent value="tab3">
            <YamlReaderComponent />
          </TabContent>
          <TabContent value="tab4">
            <div>Step 1: Create the Registration Form Component

              Create a new React component called RegistrationForm.
              Inside the component, design and implement a form that includes fields for username, email, and password.
              Use controlled inputs to handle user input and store the values in component state.</div>
          </TabContent>

        </div>
      </Tabs>
    </div>

  )
}


// const Tab = ({ label, activeTab, onClick }) => {
//   const isActive = activeTab === label;

//   return (
//     <motion.button
//       className={`tab-btn ${isActive ? "active" : ""} 
//                      bg-gray-200 text-gray-800
//                      py-2 px-4 rounded-md transition-colors duration-300`}
//       whileHover={{ backgroundColor: "#f3f4f6" }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => onClick(label)}
//     >
//       {label}
//     </motion.button>
//   );
// };

const LiveCodeContainer = () => {
  const [width, setWidth] = React.useState(window.innerWidth / 3);

  const [activeTab, setActiveTab] = useState("problem");
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [leftPanelWidth, setLeftPanelWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = (e, { size }) => {
    setWidth(size.width);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRunCode = () => {
    try {
      const result = eval(code); // Execute the code
      setConsoleOutput(result.toString()); // Set the console output
    } catch (error) {
      console.error(error);
      setConsoleOutput(error.toString()); // Set the error message as console output
    }
  };

  return (


    <AdaptableCard
      className="h-full overflow-hidden"
      bodyClass="p-0 h-full absolute inset-0 flex min-w-0 overflow-hidden"
    >
      {/* Left Panel */}
      <div className="flex flex-auto w-full">


        {/* <iframe
          src="https://glitch.com/embed/#!/embed/statuesque-spring-thing?path=.env&previewSize=0"
          title="statuesque-spring-thing on Glitch"
          allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
          allowFullScreen
          style="height: 100%; width: 100%; border: 0;">
        </iframe> */}

        <iframe
            src="https://glitch.com/embed/#!/embed/reactwebapp?path=src/app.jsx&previewSize=0&attributionHidden=true"
            title="ReactWebApp"
            allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
            allowFullScreen
            style={{ height: '100%', width: '100%', border: 0 }}
          ></iframe>
        {/* <Pill />  */}
        <UserStoryCardList />
      </div>
      {/* <TrainingTopics/> */}
      {<UserJourneyMenu />}
      {/* <Pill /> */}
      {/* <LiveCodeUserStory/> */}


      {/* Right Panel */}



    </AdaptableCard>

  );
};

export default LiveCodeContainer;
