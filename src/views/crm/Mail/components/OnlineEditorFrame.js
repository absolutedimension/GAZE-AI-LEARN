import React from 'react'
import TutorChatList from './TutorChatList'
import MailDetail from './MailDetail'
import { Timeline } from 'components/ui'
import ChatComponent from './ChatComponent'



const OnlineEditorFrame = () => {
    return (
        <div className="flex flex-auto w-full">
            <iframe
                src="https://glitch.com/embed/#!/embed/reactwebapp?path=src/app.jsx&previewSize=0&attributionHidden=true"
                title="verdant-valuable-latency on Glitch"
                allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
                allowFullScreen
                style={{ height: '100%', width: '100%'}}
            ></iframe>
           
            <TutorChatList />
            {/* {<ChatComponent/>} */}
        </div>
    )
}

export default OnlineEditorFrame
