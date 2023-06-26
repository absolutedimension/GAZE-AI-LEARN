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





import { initializeWebSocket, closeWebSocket, sendMessage } from '../Websocketservice';


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



const UserStoryCode = () => {
    const dispatch = useDispatch();
  //  const [ messages ,setMessages] = useState([]);


  //  const [blobURL, setBlobURL] = useState('');

   const  messages = useSelector((state) => state.userStorySlice.messages)
    const isLoading = useSelector((state) => state.userStorySlice.isLoading)
    const loadingMessageId = useSelector((state) => state.userStorySlice.loadingMessageId)

    const  history = useSelector((state) => state.userStorySlice.history)

    const  implementCodeStringStream = useSelector((state) => state.tutor.implementCodeStringStream)


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

    // useEffect(() => {
    //     // Create a WebSocket connection
    //     const socket = new WebSocket('ws://34.171.99.103:8082');
    //     //       console.log('WebSocket object:', socket);
    //     //console.log('WebSocket ready state:', socket.readyState);

    //     // Handle incoming messages from the WebSocket server
    //     // socket.onmessage = (event) => {

    //     //     const reader = new FileReader();
    //     //     reader.onload = () => {
    //     //       const newData = JSON.parse(reader.result);
    //     //       setDataList((prevDataList) => [...prevDataList, newData]);
    //     //     };
    //     //     reader.readAsText(event.data);
    //     //     console.log('Received data:', event.data);
    //     //   };


    //     socket.onmessage = (event) => {
    //         //    const byteArray = new Uint8Array(event.data);
    //         //   const decoder = new TextDecoder('utf-8');
    //         //  const decodedMessage = decoder.decode(byteArray);
    //         //   console.log('Received data:', decodedMessage);

    //         //   const text1 = (JSON.stringify(event.data).data).map(num => String.fromCharCode(num)).join('');
    //         //console.log(text1);





    //         const bufferData = Buffer.from(JSON.parse(event.data).data); // Example buffer data
    //         //   var sentence = [];
    //         const readableData = bufferData.toString();
    //         console.log(JSON.parse(readableData).content);
    //         //  sentence.push(JSON.parse(readableData).content)// Output: "H
    //         //   characters=JSON.parse(readableData).content;

    //         // dispatch(setChatFromStream({
    //         //     id: generateRandomId(),
    //         //     message: (JSON.parse(readableData).content) ? (JSON.parse(readableData).content) : (""),
    //         //     isMe: false
    //         // })


    //            setMessages(prevMessages => [...prevMessages,JSON.parse(readableData).content])

    //         //    const newMessage=[{
    //         //        id:1,
    //         //        message:JSON.parse(readableData).content,
    //         //        isMe:false
    //         //    }];




    //         //   setMessages(messages => [...prevMessages, JSON.parse(readableData).content]);
          


    //         }
    //     //   pushCharacters(targetArray,characters);
    //     //  pushCharacters(targetArray,characters);
    //     //    console.log('Received data111111111456765763257573575735573575734551s:'+targetArray );
    //     // const jsonData = JSON.parse(event.data);
    //     //  text = String.fromCharCode(...jsonData.data);
    //     // console.log(JSON.stringify(text));  // Output: "{  "content": " today"}
    //     //             let jsonData =[];
    //     //              jsonData = JSON.parse(event.data);

    //     //              console.log("jsonData type:", typeof jsonData);
    //     // console.log("jsonData:", jsonData);

    //     // const sentences = [];

    //     // jsonData.forEach(item => {
    //     //   if (item.content) {
    //     //     sentences.push(item.content);
    //     //   }
    //     // });

    //     // const fullSentence = sentences.join(" ");
    //     // console.log("Full sentence:", fullSentence);


    //     //             const jsonData = JSON.parse(event.data);
    //     // const contentArray = jsonData.data.map(item => item.content);
    //     // const fullContent = contentArray.join("");
    //     // console.log("Full content:", fullContent);

    //     // const fullSentence = joinContentSentences(text);
    //     // console.log("Full sentence:", fullSentence);





    //     //             const jsonObject = JSON.parse(text);
    //     // const content = jsonObject.content;
    //     // console.log(content);
    //     //  const uint8Array = new Uint8Array(event.data);
    //     //  const decoder = new TextDecoder('utf-8');
    //     //  const text = decoder.decode(uint8Array);
    //     //     console.log('Received data1111111111s:', JSON.stringify(text));
    //     //  console.log('Decoded message:', decodedMessage);

    //     //   const newMessage = decodedMessage;
    //     //    setMessages((prevMessages) => [...prevMessages, newMessage]);

    //     // socket.onmessage = (event) => {
    //     //     const blob = new Blob([event.data], { type: 'application/octet-stream' });
    //     //     const reader = new FileReader();
    //     //     reader.onload = () => {
    //     //       const dataURL = reader.result;
    //     //       setBlobURL(dataURL);
    //     //     };
    //     //     reader.readAsDataURL(blob);
    //     //   };

    //     // Clean up the WebSocket connection when the component unmounts
    //     return () => {
    //         socket.close();
    //     };
    // }, []);



    // useEffect(() => {
    //     const path = location.pathname.substring(
    //         location.pathname.lastIndexOf('/') + 1
    //     )
    //     const category = { category: path }

    //     // if (path === 'mail') {
    //     //     category.category = 'inbox'
    //     // }

    //    // fetchData(category)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname])

    const parseHtml = (content) => {
        if (!content) {
            return ''
        }
        const text = content.replace(htmlReg, '')
        return text.length > 60 ? text.substring(0, 57) + '...' : text
    }

    const onMailClick = (e, id) => {
        e.stopPropagation()
        dispatch(updateMailId(id))
        dispatch(updateReply(false))
        navigate(`${location.pathname}?mail=${id}`, { replace: true })
    }

    //  console.log('Messages:', blobURL);

    // return (
    //     <div
    //         className={classNames(
    //             'min-w-[430px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600',
    //             sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
    //             mailId ? 'hidden xl:flex' : 'xs:flex'
    //         )}
    //     >
    //    {messages}
    //         <div className="flex-grow flex flex-col justify-end">
    //             <InputTutor />
    //             {/* <div>
    //   {dataList.map((data, index) => (
    //     <div key={index}>{data}</div>
    //   ))}
    // </div> */}
    //             {/* <InputGroup className="mb-4">
    //             <Input
    //                 prefix={
    //                     <HiOutlineMicrophone className="text-xl text-indigo-600 cursor-pointer" />
    //                 }
    //             />
    //             <Button>Send</Button>
    //         </InputGroup> */}
    //         </div>
    //     </div>
    // );

    function parseDataToArray(data) {
        // Regular expression pattern to match array elements and their children
        var regex = /(\w+)\s*\((.*?)\)/g;
      
        var result = [];
        var match;
      
        // Loop through all matches found in the data string
        while ((match = regex.exec(data)) !== null) {
          var element = {
            name: match[1],
            children: parseDataToArray(match[2]) // Recursive call to parse children
          };
      
          result.push(element);
        }
      
        return result;
      }
      
      // Example usage
    //   var data = "array1(child1, child2), array2(child3), array3";
    //   var parsedArray = parseDataToArray(data);
    //   console.log(parsedArray);
      

    const markdownContent = implementCodeStringStream[0] ? (
        <ReactMarkdown escapeHtml={true} className="blog-content">
          {/* {history.replace(pattern, ' [$1]("") :')} */}
          {implementCodeStringStream[0].replace(pattern, ' [$1](""):')}
          {/* {parseDataToArray({history})} */}
        </ReactMarkdown>
      ) : null;

    return (
        <div
            className={classNames(
                'min-w-[430px] max-w-[610px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600',
                sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
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
            {/* <ScrollBar autoHide direction={direction}>
                <Loading
                    type={messages.length > 0 ? 'cover' : 'default'}
                    spinnerClass={messages.length > 0 ? 'hidden' : ''}
                    loading={loading}
                >
    */}
   <div className="min-h-[550px]  overflow-y-auto max-h-96">
      {  messages.map((chatMessage) => (
        <ChatMessage key={chatMessage.length} chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
))

      }

     {markdownContent}
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
                {/* </Loading>
            </ScrollBar> */}

            {/* <div className="flex-grow flex flex-col justify-end">
                <InputTutor sendMessage={sendMessage}/>
                </div> */}
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
          
            {/* </StickyFooter> */}

        </div>
    )
}

export default UserStoryCode;
