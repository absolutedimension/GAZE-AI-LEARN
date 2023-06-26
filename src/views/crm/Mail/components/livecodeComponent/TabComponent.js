import { Tabs } from 'components/ui'

import React, { useState ,useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames'

import ListWithAnimation from "components/ui/utils/ListWithAnimation";

import YamlReaderComponent from 'components/ui/utils/YamlReaderComponent';

import UserStoriesListCard from './UserStoriesListCard';
import LiveCodeChatList from './LiveCodeChatList';
import BuildUserStory from 'views/pages/Welcome/components/BuildUserStory';

import {setCurrentTabUserStory} from '../../../../../store/tutor/userStorySlice'
import UserStoryExplanation from './UserStoryExplanation';
import UserStoryCode from './UserStoryCode';

import { initializeWebSocket, closeWebSocket, sendMessage } from './WebSocketServiceLiveCode';


const { TabNav, TabList, TabContent } = Tabs

 const TabComponent = () => {

  //  let [currentTab, setCurrentTab] = useState('tab1');
  const dispatch = useDispatch();
  const  currentTab = useSelector((state) => state.userStorySlice.currentTab)

  // useEffect(() => {
  //   initializeWebSocket(currentTab); // Establish WebSocket connection on component mount

  //   return () => {
  //     closeWebSocket(); // Close WebSocket connection on component unmount
  //   };
  // }, []);
    

  return (
    <div
    className={classNames(
        'min-w-[530px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
     //   sideBarExpand && 'ltr:xl:ml-[20px] rtl:xl:mr-[20px]',
       // userStoryArray ? 'hidden xl:flex' : 'xs:flex'
    )}
>
       <Tabs value={currentTab} onChange={(val) => dispatch(setCurrentTabUserStory(val))}>
        <TabList>
          
          <TabNav value="tab1">Features to Develop</TabNav>
          <TabNav value="tab2">Feature Explanation</TabNav>
          <TabNav value="tab3">Code</TabNav>
          <TabNav value="tab4">Tutor</TabNav>
        
        </TabList>
        <div className="p-4">
        
        <TabContent value="tab1">
          {/* <Step2/>
          <Step2/>
           <QuickStart/> */}
          {/* <UserStoryCardList/> */}
           {/* <BuildUserStory/> */}
           {/* <ListUserStories/> */}
           {/* <UserStoryListCard/> */}
           {/* <BuildUserStory/> */}
           <UserStoriesListCard />
         
          </TabContent>
          <TabContent value="tab2">
        
            {/* <TutorChatList/> */}
            {/* <LiveCodeChatList /> */}
         <UserStoryExplanation/>
            {/* <div>Step 1: Create the Registration Form Component

              Create a new React component called RegistrationForm.
              Inside the component, design and implement a form that includes fields for username, email, and password.
              Use controlled inputs to handle user input and store the values in component state.</div> */}
          </TabContent>
          <TabContent value="tab3">
           <UserStoryCode/>
          </TabContent>
          {/* <TabContent value="tab4">
            <YamlReaderComponent />
          </TabContent> */}
          <TabContent value="tab4">
     
          <LiveCodeChatList/>
     
          </TabContent>
         
        </div>
      </Tabs>
    </div>

  )
}

export default TabComponent;