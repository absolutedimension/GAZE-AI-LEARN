import React, { useState } from "react";

import { AdaptableCard } from 'components/shared';

import UserJourneyMenu from './UserJourneyMenu';


import TabComponent from './TabComponent'


const LiveCodeContainer = () => {


  return (

   
      
     
    <div className="flex flex-auto w-full">
    <iframe
        src="https://glitch.com/embed/#!/embed/reactwebapp?path=src/app.jsx&previewSize=0&attributionHidden=true"
        title="ReactWebApp"
        allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
        allowFullScreen
        style={{ height: '100%', width: '100%', border: 0 }}
      ></iframe>
        <TabComponent /> 
    </div>
     
      
   
  )
}

export default LiveCodeContainer;
