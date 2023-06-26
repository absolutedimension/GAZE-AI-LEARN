import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { ScrollBar, Avatar, Button } from 'components/ui'
import { Loading, StickyFooter,AdaptableCard } from 'components/shared'
import {
    HiOutlineFlag,
    HiStar,
    HiPaperClip,
    HiMenu,
    HiMenuAlt2,
} from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { getMails, updateMailId } from '../../store/dataSlice'
import {
    toggleSidebar,
    toggleMobileSidebar,
    updateReply,
} from '../../store/stateSlice'
import useResponsive from 'utils/hooks/useResponsive'
import { useNavigate, useLocation } from 'react-router-dom'

import ChatMessage from '../ChatMessage'

import '../Blog.css'

import ReactMarkdown from 'react-markdown';

import { initializeWebSocket, closeWebSocket, sendMessage } from './WebSocketServiceLiveCode';
import InputProjectTutor from './InputProjectTutor'


const htmlReg = /(<([^>]+)>)/gi

const pattern = /(\d+\.\s[\w\s]+):/g;

const ToggleButton = ({ sideBarExpand, mobileSidebarExpand }) => {
    const dispatch = useDispatch()

    const { smaller } = useResponsive()

    const onSideBarToggle = () => {
        dispatch(toggleSidebar(!sideBarExpand))
    }

    const onMobileSideBar = () => {
        dispatch(toggleMobileSidebar(!mobileSidebarExpand))
    }

    return (
        <Button
            icon={
                smaller.xl ? (
                    mobileSidebarExpand ? (
                        <HiMenu />
                    ) : (
                        <HiMenuAlt2 />
                    )
                ) : sideBarExpand ? (
                    <HiMenu />
                ) : (
                    <HiMenuAlt2 />
                )
            }
            onClick={smaller.xl ? onMobileSideBar : onSideBarToggle}
            size="sm"
            variant="plain"
            shape="circle"
        />
    )
}



const LiveCodeChatList = () => {
    const dispatch = useDispatch();
    //  const [ messages ,setMessages] = useState([]);


    //  const [blobURL, setBlobURL] = useState('');

    const messages = useSelector((state) => state.liveCodeSlice.messages)
    const isLoading = useSelector((state) => state.liveCodeSlice.isLoading)
    const loadingMessageId = useSelector((state) => state.liveCodeSlice.loadingMessageId)

    // const  history = useSelector((state) => state.userStorySlice.history)

    const projectTutorStringStream = useSelector((state) => state.tutor.projectTutorStringStream)


    // const mails = useSelector((state) => state.crmMail.data.mailList)
    // const mailId = useSelector((state) => state.crmMail.data.selectedMailId)
    // const loading = useSelector((state) => state.crmMail.data.mailListLoading)
    const sideBarExpand = useSelector(
        (state) => state.liveCodeSlice.sideBarExpand
    )
    const mobileSidebarExpand = useSelector(
        (state) => state.liveCodeSlice.mobileSidebarExpand
    )
    const selectedCategory = useSelector(
        (state) => state.liveCodeSlice.selectedCategory
    )

    const direction = useSelector((state) => state.theme.direction)

    const navigate = useNavigate()
    const location = useLocation()

    const [dataList, setDataList] = useState([]);

    const [targetArray, setTargetArray] = useState([]);
    let characters = [];




    const pushCharacters = (targetArray, characters) => {
        if (Array.isArray(characters)) {
            setTargetArray(prevArray => [...prevArray, ...characters]);
        }
    };

    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    const fetchData = (data) => {
        dispatch(getMails(data))
    }

    const joinContentSentences = (jsonArray) => {
        let sentence = "";
        for (let i = 0; i < jsonArray.length; i++) {
            const obj = jsonArray[i];
            if (obj.hasOwnProperty("content")) {
                const content = obj.content;
                sentence += content + " ";
            }
        }
        // Remove trailing space
        sentence = sentence.trim();
        return sentence;
    }




    useEffect(() => {
        initializeWebSocket(); // Establish WebSocket connection on component mount

        return () => {
            closeWebSocket(); // Close WebSocket connection on component unmount
        };
    }, []);



    const markdownContent = projectTutorStringStream[0] ? (
        <ReactMarkdown escapeHtml={true} className="blog-content">
            {/* {history.replace(pattern, ' [$1]("") :')} */}
            {projectTutorStringStream[0].replace(pattern, ' [$1](""):')}
            {/* {parseDataToArray({history})} */}
        </ReactMarkdown>
    ) : null;

    return (

        <div
        className={classNames(
            'min-w-[450px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
            sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
         //   mailId ? 'hidden xl:flex' : 'xs:flex'
        )}
    >

<div className="min-h-[500px] overflow-y-auto max-h-96">
        {/* Render chat messages */}
        {messages.map((chatMessage) => (
          <ChatMessage key={chatMessage.length} chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
        ))}
  
        {/* Render markdown content */}
        {markdownContent}
    
        {/* Render input component */}
        
     </div>
     <div className="flex-grow flex flex-col justify-end">
          <InputProjectTutor />
  
      </div>
    
      </div>
     
    
  
  
  
    )
}

export default LiveCodeChatList;
