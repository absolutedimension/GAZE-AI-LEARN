import React, { useState } from 'react';
import TutorChatList from './TutorChatList'
import MailDetail from './MailDetail'
import { Timeline } from 'components/ui'
import ChatComponent from './ChatComponent'
import { useSelector } from 'react-redux'
import TrainingMain from './TrainingMain'
import FormattingMaster from './trainingComponent/components/FormattingMaster'
import MonacoEditor from 'react-monaco-editor';
import MonacoEditorTraining from './trainingComponent/components/MonacoEditorTraining';
import AppView from 'components/ui/utils/AppView';

import { Card, Segment } from 'components/ui'
import CourseContentChatBox from './CourseContentChatBox';

//import { showEditor } from '../store/stateSlice'



const CoursesLauncher = () => {

   const showEditor = useSelector((state) => state.crmMail.state.showEditor)
   const options = {
    selectOnLineNumbers: true
  };

  const [code, setCode] = useState('// type your code here');

  function handleEditorChange(value, event) {
    setCode(value);
  }

    return (
        <div className="flex flex-auto">
         
          <div  style={{ height: '100%', width: '100%'}}>
          {showEditor?(  
       
    //    <AppView/>

    <Card className="mb-1" bordered={true}  clickable={true}>
      
       <MonacoEditorTraining/>
       </Card>
        //   <iframe
        //         src="https://glitch.com/embed/#!/embed/reactwebapp?path=src/app.jsx&previewSize=0&attributionHidden=true"
        //         title="verdant-valuable-latency on Glitch"
        //         allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
        //         allowFullScreen
        //         style={{ height: '100%', width: '100%'}}
        //     ></iframe>
            ):(<FormattingMaster/>)}
         </div>
       
          <CourseContentChatBox/>
            {/* <TutorChatList /> */}
            {/* {<ChatComponent/>} */}
        </div>
    )
}

export default CoursesLauncher
