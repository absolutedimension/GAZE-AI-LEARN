import React, { useState } from "react";

import { AdaptableCard } from 'components/shared';

import UserJourneyMenu from './UserJourneyMenu';


import TabComponent from './TabComponent'

import { useSelector } from "react-redux";


const LiveCodeContainer = () => {


  const showEditor = useSelector((state) => state.crmMail.state.showEditor)


  return (

   
      
     
    <div className="flex flex-auto w-full">
  
          {showEditor ? (
             <div style={{ height: '100%', width: '100%' }}>
            <iframe
              src="https://glitch.com/embed/#!/embed/reactwebapp?path=src/app.jsx&previewSize=0&attributionHidden=true"
              title="verdant-valuable-latency on Glitch"
              allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
              allowFullScreen
              style={{ height: '100%', width: '100%' }}
            ></iframe>  </div>
          ) : (null)}
      
        <TabComponent /> 
    </div>
     
      
   
  )
}

export default LiveCodeContainer;
