import React, { useEffect, useState,useRef } from 'react'
import classNames from 'classnames'
import { ScrollBar, Avatar, Button,Card} from 'components/ui'
import { Loading } from 'components/shared'
import {
    HiOutlineFlag,
    HiStar,
    HiPaperClip,
    HiMenu,
    HiMenuAlt2,
} from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { getMails, updateMailId } from '../store/dataSlice'
import {
    toggleSidebar,
    toggleMobileSidebar,
    updateReply,
    showEditorToggle
} from '../store/stateSlice'
import useResponsive from 'utils/hooks/useResponsive'
import { useNavigate, useLocation } from 'react-router-dom'

import { InputGroup, Input, Select, DatePicker } from 'components/ui'
import { HiOutlineMicrophone } from 'react-icons/hi'

import ChatMessage from './ChatMessage'

import { StickyFooter } from 'components/shared'
import InputTutor from './InputTutor'
import { Buffer, constants } from 'buffer'

import { formatScreenTutor, setChatFromStream } from "../../../../store/tutor/tutor"
import StreamChatMessage from './StreamChatMessage'

import ReactMarkdown from 'react-markdown';

import './Blog.css'

import { sendPromptChatGPT ,getChatGPTApiData,sendMessageToChatBox,updateHistory,newCardAdded,formatScreen} from "store/tutor/tutor";





import { initializeWebSocket, closeWebSocket, sendMessage } from '../components/livecodeComponent/WebSocketServiceLiveCode';



import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CodeCopyBtn from './codeCopyBtn';

import useThemeClass from 'utils/hooks/useThemeClass'

import { HiOutlineLockClosed } from 'react-icons/hi'
import StreamCard from './StreamCard';

import FormatTrainingTutor from './trainingComponent/components/FormatTrainingTutor'

   

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




const ToggleEditor = ({ showEditor }) => {
    const dispatch = useDispatch()

   // const { smaller } = useResponsive()
  
   const  showEditorMethod = () => {
    dispatch(showEditorToggle(!showEditor))
    }

    // const onMobileSideBar = () => {
    //     dispatch(toggleMobileSidebar(!mobileSidebarExpand))
    // }

    return (
        <Button
            icon={
                showEditor ? (
                    <HiMenu />
                ) : (
                    <HiMenuAlt2 />
                )
            }
            onClick={showEditorMethod}
            size="sm"
            variant="plain"
            shape="circle"
        />
    )
}




const TutorChatList = ({newCardAddedIndex,history,newHistory,messages}) => {
    const dispatch = useDispatch();
    const scrollBarRef = useRef(null);

    const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages are updated
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);
  //  const [ messages ,setMessages] = useState([]);
   newCardAddedIndex = useSelector((state) => state.tutor.newCardAddedIndex)
   // Add the CodeCopyBtn component to our PRE element
//    const Pre = ({ children }) => <pre className="blog-pre">


//    <CodeCopyBtn>{children}</CodeCopyBtn>
//    {children}
//     </pre>



  //  const [blobURL, setBlobURL] = useState('');

  //const [index, setIndex] = useState(0);

  //console.log("Index value==="+index);

     messages = useSelector((state) => state.tutor.messages)
    const isLoading = useSelector((state) => state.tutor.isLoading)
    const loadingMessageId = useSelector((state) => state.tutor.loadingMessageId)

      history = useSelector((state) => state.tutor.history)
      newHistory = useSelector((state) => state.tutor.newHistory)


    const mails = useSelector((state) => state.crmMail.data.mailList)
    const mailId = useSelector((state) => state.crmMail.data.selectedMailId)
    const loading = useSelector((state) => state.crmMail.data.mailListLoading)
    const sideBarExpand = useSelector(
        (state) => state.crmMail.state.sideBarExpand
    )

    const showEditor = useSelector(
        (state) => state.crmMail.state.showEditor
    )
    const mobileSidebarExpand = useSelector(
        (state) => state.crmMail.state.mobileSidebarExpand
    )
    const selectedCategory = useSelector(
        (state) => state.crmMail.state.selectedCategory
    )

    const direction = useSelector((state) => state.theme.direction)


    const updatedHistory = useSelector((state) => state.tutor.updatedHistory)

    const token = useSelector((state) => state.auth.session.token)
    const navigate = useNavigate()
    const location = useLocation()

    const [dataList, setDataList] = useState([]);

    const [targetArray, setTargetArray] = useState([]);
    let characters = [];

    const { textTheme, borderTheme } = useThemeClass()

    const [cards, setCards] = useState([]);


    


    const pushCharacters = (targetArray, characters) => {
        if (Array.isArray(characters)) {
            setTargetArray(prevArray => [...prevArray, ...characters]);
        }
    };
    
    const generateRandomIdTutor = () => {
        return Math.floor(Math.random() * 1000000);
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


    const getObject = (state) => state.tutor.newHistory[0];

  
    // Selector function to monitor changes in the object
        const isObjectUpdated = (state) => {
        const currentObject = getObject(state);
        const previousObject = state.tutor.previousNewHistory[0]; // Assuming you store the previous object in your state

                 // Check if both objects exist
            if (currentObject && previousObject) {
                // Convert the objects to JSON strings for comparison
                const currentObjectString = JSON.stringify(currentObject);
                const previousObjectString = JSON.stringify(previousObject);
                
                // Compare the JSON strings
                if (currentObjectString == previousObjectString) {
                // The objects are different
                return true;
                }
            }
       
    };

    useEffect(() => {
        initializeWebSocket(); // Establish WebSocket connection on component mount
    
        return () => {
          closeWebSocket(); // Close WebSocket connection on component unmount
        };
      }, []);


      useEffect(() => {

        dispatch(formatScreenTutor());// Establish WebSocket connection on component mount
   
         
       }, [isObjectUpdated]);
   

      
    const handleClick = () => {
     
        console.log("Inside Handle click");
          const newMessage = {
            id: generateRandomId,
            prompt: "create 12 user story for signup and login user",
            last_context:'',
            isMe: true,
          };
        //  setChatMessages([...chatMessages, newMessage]);
         // fetchChatRequest();
     //    console.log("before calling"+message);
       //  sendPromptChatGPT(message);
         dispatch(sendMessageToChatBox("create 12 user story for signup and login user"));
         dispatch(getChatGPTApiData(newMessage));
    
     //    const updatedHistory = [...history, message];
     //   dispatch(updateHistory(updatedHistory));
        // console.log("after calling"+message);
     //     setMessage("");
        
      };

    // const handleClick = (code) => {
    //     navigator.clipboard.writeText(code);
    //     // Perform any other actions after copying the code
    //   };


      const ButtonRenderer = ({ children, ...props }) => {
        return (
          <button {...props}>
         Click Here
          </button>
        );
      };

      const renderCodeBlock = ({ language, value }) => {
        return (
            <div className="code-block-container">
            <SyntaxHighlighter style={a11yDark} language={language}>
              {value}
              <p>Testing the data</p>
            </SyntaxHighlighter>
            {/* <p>Testing the data</p> */}
            {/* <button className="copy-code-button" onClick={() => handleClick(value)}>
              Copy Code
            </button> */}
          </div>
        );
      };
      
  


const markdownContent = newHistory[0] ? (
    <ReactMarkdown escapeHtml={true} renderer={renderCodeBlock} className="blog-content">
      {/* {history.replace(pattern, ' [$1]("") :')} */}
      {newHistory[0].replace(pattern, ' [$1](""):')}
      {/* {parseDataToArray({history})} */}
    </ReactMarkdown>
  ) : null;

    return (
        <div
            className={classNames(
                'min-w-[750px]  ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
                sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
             //   mailId ? 'hidden xl:flex' : 'xs:flex'
            )}
        >
            <div className="relative flex flex-0 items-center justify-between min-h-[35px]">
                <div className="flex items-center gap-1">
                    <ToggleButton
                        sideBarExpand={sideBarExpand}
                        mobileSidebarExpand={mobileSidebarExpand}
                    />
                    <h6>Options</h6>
                    <div className="flex items-center gap-1">
                    <ToggleEditor
                        showEditor={showEditor}
                      //  mobileSidebarExpand={mobileSidebarExpand}
                    />
                    <h6>Editor</h6>
                </div>
                </div>
               
            </div>
            <ScrollBar>
                <Loading
                    type={messages.length > 0 ? 'cover' : 'default'}
                    spinnerClass={messages.length > 0 ? 'hidden' : ''}
                    loading={loading}
                >
   
   <div
      className={classNames(
        'chat-container',
        'overflow-y-auto',
        'max-h-99', // Adjust the max-h value as needed
      )}
      ref={chatContainerRef}
    >
      {  messages.map((chatMessage) => (
        <ChatMessage key={messages.length} chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
))

      }


          <FormatTrainingTutor/>
     {/* {
        markdownContent ? (

            markdownContent

            // <div dangerouslySetInnerHTML={{ __html: updatedHistory }}></div>
     
           
    ):("")} */}
     </div>
     {/* {history} */}

     {/* {parseDataToArray(history)} */}

      {/* <ReactMarkdown escapeHtml={true} className="blog-content">
      {history.replace(pattern, ' [$1]("") :')}
    </ReactMarkdown> */}


    

                    {/* 
            {messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}

           */}

                    {/* {messages} */}

                    {/* {messages.length?(



     <ChatMessage key={messages.length} chatMessage={messages} isLoading={isLoading} loadingMessageId={loadingMessageId} />



):(

    messagesLocal.map((chatMessage) => (
        <ChatMessage key={chatMessage.length} chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
))





    
)} */}










                    {/* {messages.map((chatMessage) => (

                            chatMessage.isMe?(
                                <ChatMessage chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
                            ):(
                               
                                <ChatMessage chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
                            )
                        
            ))}; */}
                </Loading>
            </ScrollBar>

            <div className="flex-grow flex flex-col justify-end">
                <InputTutor sendMessage={sendMessage}/>
                {/* <div>
      {dataList.map((data, index) => (
        <div key={index}>{data}</div>
      ))}
    </div> */}
                {/* <InputGroup className="mb-4">
                <Input
                    prefix={
                        <HiOutlineMicrophone className="text-xl text-indigo-600 cursor-pointer" />
                    }
                />
                <Button>Send</Button>
            </InputGroup> */}
            </div>
            {/* </StickyFooter> */}

        </div>
    )
}

export default TutorChatList;
