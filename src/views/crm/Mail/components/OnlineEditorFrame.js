import React from 'react'
import TutorChatList from './TutorChatList'
import MailDetail from './MailDetail'
import { Timeline } from 'components/ui'
import ChatComponent from './ChatComponent'
import { useSelector } from 'react-redux'
import TrainingMain from './TrainingMain'
import FormattingMaster from './trainingComponent/components/FormattingMaster'
//import { showEditor } from '../store/stateSlice'



const OnlineEditorFrame = () => {

   const showEditor = useSelector((state) => state.crmMail.state.showEditor)

    return (
        <div className="flex flex-auto w-full">
         
          <div  style={{ height: '100%', width: '100%'}}>
          {showEditor?(  
          <iframe
                src="https://glitch.com/embed/#!/embed/reactwebapp?path=src/app.jsx&previewSize=0&attributionHidden=true"
                title="verdant-valuable-latency on Glitch"
                allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
                allowFullScreen
                style={{ height: '100%', width: '100%'}}
            ></iframe>
            ):(<FormattingMaster/>)}
         </div>
       
          <TrainingMain/>
            {/* <TutorChatList /> */}
            {/* {<ChatComponent/>} */}
        </div>
    )
}

export default OnlineEditorFrame
