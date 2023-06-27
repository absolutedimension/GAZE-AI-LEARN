import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { ScrollBar, Avatar, Button } from 'components/ui'
import { Loading } from 'components/shared'
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

import InputTutor from '../InputTutor'


import ReactMarkdown from 'react-markdown';

import { getCodeUserStory } from 'store/tutor/implementedCodeSlice'

import { setMessageAddress,deleteHistoryimplementCodeStringStream } from "../../../../../store/tutor/tutor";

import { setCurrentTabUserStory } from 'store/tutor/userStorySlice';


import { initializeWebSocket, closeWebSocket, sendMessage } from '../Websocketservice';


const htmlReg = /(<([^>]+)>)/gi

const pattern = /(\d+\.\s[\w\s]+):/g;



const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};


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



const UserStoryExplanation = () => {
    const dispatch = useDispatch();
    //  const [ messages ,setMessages] = useState([]);


    //  const [blobURL, setBlobURL] = useState('');


    const messages = useSelector((state) => state.userStorySlice.messages)
    const isLoading = useSelector((state) => state.userStorySlice.isLoading)
    const loadingMessageId = useSelector((state) => state.userStorySlice.loadingMessageId)

    const history = useSelector((state) => state.userStorySlice.history)

    const userStoryStringStream = useSelector((state) => state.tutor.userStoryStringStream)

    const userStoryInitialContext = useSelector((state) => state.userStorySlice.userStoryInitialContext)

    const userStories = useSelector((state) => state.userStorySlice.userStories)


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

    const handleClick = (values) => {


        const newMessage = {
            id: generateRandomId,
            prompt: userStoryStringStream[0]+"provide the relevant code in previos mention tech stack",
            last_context:userStoryInitialContext+(userStories?(userStories.join(',')):("")),
            isMe: true,
        };
        dispatch(deleteHistoryimplementCodeStringStream());
        dispatch(setMessageAddress("projectTutor"));
        dispatch(setCurrentTabUserStory("tab3"));
        dispatch(getCodeUserStory(newMessage));

    }




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
        initializeWebSocket("userStory"); // Establish WebSocket connection on component mount

        return () => {
            closeWebSocket(); // Close WebSocket connection on component unmount
        };
    }, []);



    const parseHtml = (content) => {
        if (!content) {
            return ''
        }
        const text = content.replace(htmlReg, '')
        return text.length > 60 ? text.substring(0, 57) + '...' : text
    }




    const markdownContent = userStoryStringStream[0] ? (
        <ReactMarkdown escapeHtml={true} className="blog-content">
            {/* {history.replace(pattern, ' [$1]("") :')} */}
            {userStoryStringStream[0].replace(pattern, ' [$1](""):')}
            {/* {parseDataToArray({history})} */}
        </ReactMarkdown>
    ) : null;

    return (
        <div
        className={classNames(
            'min-w-[450px] max-w-[750px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
         //   sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
         //   mailId ? 'hidden xl:flex' : 'xs:flex'
        )}
        >
            
           
                
            {/* <div className="relative flex flex-0 items-center justify-between min-h-[55px] border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-1">
                    <ToggleButton
                        sideBarExpand={sideBarExpand}
                        mobileSidebarExpand={mobileSidebarExpand}
                    />
                    <h6>Options</h6>
                </div>
            </div> */}
            <Button
                disabled={!true}
                variant="twoTone"
                className="mt-4 md:mt-0"
                size="sm"
                onClick={handleClick}
            >
                {"See the implemented code"}
            </Button>
            {/* <ScrollBar autoHide direction={direction}>
                <Loading
                    type={messages.length > 0 ? 'cover' : 'default'}
                    spinnerClass={messages.length > 0 ? 'hidden' : ''}
                    loading={loading}
                >
    */}
          <div className="overflow-y-auto max-h-96">
                {messages.map((chatMessage) => (
                    <ChatMessage key={chatMessage.length} chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
                ))

                }

                {markdownContent}
            </div>

        </div>
    )
}

export default UserStoryExplanation;
