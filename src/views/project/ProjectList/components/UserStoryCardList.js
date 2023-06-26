import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ThreeDotsWave from 'components/ui/ThreeWaveDots';
import ElegantText from './ElegantText';
import './Blog.css';
import ReactMarkdown from 'react-markdown';
import { FiMousePointer } from 'react-icons/fi';

import { Card, Button } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import { APP_NAME } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLockClosed } from 'react-icons/hi'
import useResponsive from 'utils/hooks/useResponsive'

import { ScrollBar, Avatar } from 'components/ui'
import { Loading } from 'components/shared'

import { Radio } from 'components/ui'
import classNames from 'classnames'
//import DynamicList from './DynamicList';

//import gfm from 'remark-gfm';
// import { injectReducer } from '../../../../store'
// import reducer from '../../../../store/tutor/index'

import {setNewStory} from "../../../../store/tutor/tutor";


import {
    HiOutlineFlag,
    HiStar,
    HiPaperClip,
    HiMenu,
    HiMenuAlt2,
} from 'react-icons/hi'

import {
    toggleSidebar,
    toggleMobileSidebar,
    updateReply,
} from '../../../crm/Mail/store/stateSlice'
import ChatMessage from 'views/crm/Mail/components/ChatMessage';
import Step2 from 'views/pages/Welcome/components/Step2';
import BuildUserStory from 'views/pages/Welcome/components/BuildUserStory';




//injectReducer('tutorReducer', reducer)

const quickStartList = [
    {
        label: 'Complete your Account Information',
        desc: 'Fill in your information to complete your account',
        btnText: 'Fill now',
        id: '0',
        disabled: false,
        navigate: '/app/account/kyc-form',
    },
    {
        label: 'Create your first workspace',
        desc: 'We recommend one project per workspace',
        btnText: 'Create Workspace',
        id: '1',
        disabled: true,
        callBack: () => {},
    },
    {
        label: 'Invite team members',
        desc: 'Show the team what you have completed so far.',
        btnText: 'Invite',
        id: '2',
        disabled: true,
    },
]

const QuickStartItem = (props) => {
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

    const handleClick = () => {
        if (available) {
            callBack?.()
            if (path) {
                navigate(path)
            }
        }
    }

    // const markdownContent = messages.message ? (
    //     <ReactMarkdown
    //      escapeHtml={true} 
    //      className="blog-content"
    //     //  renderers={{
    //     //     link: ({ href, children }) => (
    //     //       <a href={href}>
    //     //         <UserStoryCardList />
    //     //       </a>
    //     //     ),
    //     //   }}
         
    //      >
             
    
    // {messages.replace(
    //       pattern,
    //       (match, group) => `[${group}](https://www.google.com) :`
    //     )}
    //     </ReactMarkdown>
    //   ) : null;

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
                            {index + 1}
                        </span>
                    )}
                    <div>
                        <h5>{title}</h5>
                        <p>{desc}</p>
                    </div>
                </div>
                <Button
                    disabled={!available}
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

const UserStoryCardList = ({setIsStoryCreated}) => {

    const dispatch = useDispatch()
    const { textTheme, borderTheme } = useThemeClass()

    const messages = useSelector((state) => state.tutor.messages)
    const isStoryCreated = useSelector((state) => state.tutor.isStoryCreated)
    const isLoading = useSelector((state) => state.tutor.isLoading)
    const loadingMessageId = useSelector((state) => state.tutor.loadingMessageId)


//     const regex = /^\d+\.\s(.+)/gm;
// const matches = [...messages.matchAll(regex)];

// const userStoryArray = matches.map((match) => {
//   const textAfterAbleTo = match[1].substring(match[1].indexOf("able to") + 8).trim();
//   return textAfterAbleTo;
// });


    // const mails = useSelector((state) => state.crmMail.data.mailList)
    // const mailId = useSelector((state) => state.crmMail.data.selectedMailId)
    // const loading = useSelector((state) => state.crmMail.data.mailListLoading)
    const sideBarExpand = useSelector(
        (state) => state.tutor.liveCodeSlice.sideBarExpand
    )
    const mobileSidebarExpand = useSelector(
        (state) => state.tutor.liveCodeSlice.mobileSidebarExpand
    )

    const direction = useSelector((state) => state.theme.direction)

    const [completion] = useState([
        { value: '0', completed: false, current: true },
        { value: '1', completed: false, current: false },
        { value: '2', completed: false, current: false },
    ])


    [isStoryCreated,setIsStoryCreated] = useState(true);

    // const createNewStory = () => {
    //     console.log("createNewStory");
    //     dispatch(setNewStory(false))
    // }

   // isStoryCreated = useSelector((state) => state.tutor.isStoryCreated);


  

    return (
        <div
        className={classNames(
            'min-w-[430px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
            sideBarExpand && 'ltr:xl:ml-[20px] rtl:xl:mr-[20px]',
           // messages ? 'hidden xl:flex' : 'xs:flex'
        )}
    >
        <div className="relative flex flex-0 items-center justify-between min-h-[55px] border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-1">
                <ToggleButton
                    sideBarExpand={sideBarExpand}
                    mobileSidebarExpand={mobileSidebarExpand}
                />
                <h6>Menu</h6>
            </div>

            <div className="mt-4">
            {/* <Button
                    className="mr-2 mb-2"
                    variant="twoTone"
                    color="green-600"
                    onClick={createNewStory()}
                >
                    New
                </Button> */}
                {/* <Radio.Group
                    color="yellow-500"
                    value={isStoryCreated}
                    name="radioColorGroup"
                >
                    <Radio color="blue-600" value={isStoryCreated} onClick={setIsStoryCreated(true)}>
                        Apple
                    </Radio>
                    <Radio value={false}>Banana</Radio>
                   
                </Radio.Group> */}
            </div>
        </div>
           
            {/* <Step2/> */}

            {isStoryCreated?(
            
            
            
            
            <ScrollBar autoHide direction={direction}>
            <Loading
                type={messages.length > 0 ? 'cover' : 'default'}
                spinnerClass={messages.length > 0 ? 'hidden' : ''}
                loading={true}
            >
                    {messages.map((item, index) => (
                    //    <ChatMessage chatMessage={item} isLoading={true} loadingMessageId={"loadingMessageId"} />
                        <QuickStartItem
                            index={index}
                            textTheme={textTheme}
                            borderTheme={borderTheme}
                            key={item.id}
                            // title={item.message}
                            btnText={"Start"}
                            desc={item.message}
                            // available={completion.some(
                            //     (c) =>
                            //         c.value === item.id &&
                            //         (c.completed || c.current)
                            // )}
                            path={"/app"}
                            callBack={"item.callBack"}
                        />
                    ))}
                       {/* {messages.map((chatMessage) => (
                <ChatMessage chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
    ))} */}
            </Loading>
        </ScrollBar>
            
            ):(<BuildUserStory isStoryCreated={isStoryCreated}/>)}
            

        
         
           
            </div>
            

         
       
        
    )
}



export default UserStoryCardList;
