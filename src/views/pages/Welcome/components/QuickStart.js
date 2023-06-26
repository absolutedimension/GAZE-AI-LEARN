import React, { useState } from 'react'
import { Card, Button } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import { APP_NAME } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLockClosed } from 'react-icons/hi'
import classNames from 'classnames'

import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components/shared'

import { sendPromptChatGPT ,getChatGPTApiData,sendMessageToChatBox,getDetailUserStory,setCurrentTabUserStory} from "../../../../store/tutor/userStorySlice";

import {setMessageAddress,deleteHistoryUserStory} from "../../../../store/tutor/tutor";



// const quickStartList = [
//     {
//         label: 'Complete your Account Information',
//         desc: 'Fill in your information to complete your account',
//         btnText: 'Fill now',
//         id: '0',
//         disabled: false,
//         navigate: '/app/account/kyc-form',
//     },
//     {
//         label: 'Create your first workspace',
//         desc: 'We recommend one project per workspace',
//         btnText: 'Create Workspace',
//         id: '1',
//         disabled: true,
//         callBack: () => {},
//     },
//     {
//         label: 'Invite team members',
//         desc: 'Show the team what you have completed so far.',
//         btnText: 'Invite',
//         id: '2',
//         disabled: true,
//     },
// ]

const QuickStartItem = (props) => {


    const dispatch = useDispatch();

  
   
    const generateRandomId = () => {
      return Math.floor(Math.random() * 1000000);
  };

    const {
        title,
        desc,
        btnText,
        index,
        available,
        textTheme = '',
        borderTheme = '',
        path = '',
        callBack,
    } = props

    const navigate = useNavigate()

    const handleClick = (values) => {
        if (available) {

            console.log("values to print===="+desc);
          
                const newMessage = {
                  id: generateRandomId,
                  prompt: desc+ "create this user story step by step so that its easy for developer to understand in implementing.",
                  last_context:'',
                  isMe: true,
                };
              //  setChatMessages([...chatMessages, newMessage]);
               // fetchChatRequest();
             //  console.log("before calling"+message);
             //  sendPromptChatGPT(message);
         //      dispatch(sendMessageToChatBox(message));
                dispatch(deleteHistoryUserStory());
                dispatch(setMessageAddress("userStory"));
                dispatch(setCurrentTabUserStory("tab2"));
               dispatch(getDetailUserStory(newMessage));
             //  navigate(path);
           //    const updatedHistory = [...history, message];
        //      dispatch(updateHistory(updatedHistory));
              // console.log("after calling"+message);
            //    setMessage("");
              

            // callBack?.(dis)
            // if (path) {
            //     navigate(path)
            // }
        }
    }

    return (
        <Card className="mb-4">
            <div className="md:flex items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    {!available ? (
                        <span className="text-3xl">
                            <HiOutlineLockClosed />
                        </span>
                    ) : (
                        <span
                            className={`font-semibold text-xl rounded-full border-2 min-w-[30px] h-[30px] flex items-center justify-center ${borderTheme} ${textTheme}`}
                        >
                            {index}
                        </span>
                    )}
                    <div>
                        <h5>{title}</h5>
                        <p>{desc}</p>
                    </div>
                </div>
                <Button
                    disabled={!true}
                    variant="solid"
                    className="mt-4 md:mt-0"
                    size="sm"
                    onClick={handleClick}
                >
                    {btnText}
                </Button>
            </div>
        </Card>
    )
}

const QuickStart = ({userStories,loading,setCurrentTab}) => {
    const { textTheme, borderTheme } = useThemeClass();


    const [completion] = useState([
        { value: '0', completed: false, current: true },
        { value: '1', completed: false, current: false },
        { value: '2', completed: false, current: false },
    ])

    return (
        <div
        className={classNames(
            'min-w-[450px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
         //   sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
         //   mailId ? 'hidden xl:flex' : 'xs:flex'
        )}
        >
            
            <div className="min-h-[500px] overflow-y-auto max-h-96">
                
      
                {userStories.map((ObjectStory) => (
                    <QuickStartItem
                        index={ObjectStory.serialNumber}
                        textTheme={textTheme}
                        borderTheme={borderTheme}
                        key={ObjectStory.serialNumber}
                     //   title={item.label}
                        btnText={"Start"}
                        desc={ObjectStory.textPart}
                       available={true}
                        // available={completion.some(
                        //     (c) =>
                        //         c.value === ObjectStory.story &&
                        //         (c.completed || c.current)
                        // )}
                    //   path={item.navigate}
                    //   callBack={item.callBack}
                    />
                ))}
            </div>
            {/* </Loading> */}
        </div>
        
    )
}

export default QuickStart
