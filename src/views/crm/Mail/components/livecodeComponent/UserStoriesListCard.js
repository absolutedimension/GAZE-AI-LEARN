import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ThreeDotsWave from 'components/ui/ThreeWaveDots';
import ElegantText from '../ElegantText';
import '../Blog.css';
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
} from '../../store/stateSlice'
import ChatMessage from 'views/crm/Mail/components/ChatMessage';
import Step2 from 'views/pages/Welcome/components/Step2';
import BuildUserStory from 'views/pages/Welcome/components/BuildUserStory';
import ListWithAnimation from 'components/ui/utils/ListWithAnimation';
import QuickStart from 'views/pages/Welcome/components/QuickStart';

import { initializeWebSocket, closeWebSocket, sendMessage } from '../Websocketservice';




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

        // if (available) {
        //     callBack?.()
        //     if (path) {
        //         navigate(path)
        //     }
        // }
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

const UserStoriesListCard = ({setCurrentTab}) => {

    const dispatch = useDispatch()
    const { textTheme, borderTheme } = useThemeClass()

    let [isStoryCreated,setIsStoryCreated] = useState(false);


    const messages = useSelector((state) => state.userStorySlice.messages)
    const history = useSelector((state) => state.userStorySlice.history)
    isStoryCreated = useSelector((state) => state.userStorySlice.isStoryCreated)
    const isLoading = useSelector((state) => state.userStorySlice.isLoading)
    const loadingMessageId = useSelector((state) => state.userStorySlice.loadingMessageId)

    const  userStories = useSelector((state) => state.userStorySlice.userStories);
    const  loading = useSelector((state) => state.userStorySlice.loading);

    useEffect(() => {
        initializeWebSocket(); // Establish WebSocket connection on component mount
    
        return () => {
          closeWebSocket(); // Close WebSocket connection on component unmount
        };
      }, []);

    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000);
      };

      const handleStoryCreated = (value) => {
        isStoryCreated = value;
      }; 

   
    const sideBarExpand = useSelector(
        (state) => state.liveCodeSlice.sideBarExpand
    )
    const mobileSidebarExpand = useSelector(
        (state) => state.liveCodeSlice.mobileSidebarExpand
    )

    const direction = useSelector((state) => state.theme.direction)

    const [completion] = useState([
        { value: '0', completed: false, current: true },
        { value: '1', completed: false, current: false },
        { value: '2', completed: false, current: false },
    ])



    return (
        <div
        className={classNames(
            'min-w-[430px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
            sideBarExpand && 'ltr:xl:ml-[20px] rtl:xl:mr-[20px]',
           // userStoryArray ? 'hidden xl:flex' : 'xs:flex'
        )}
    >
{/*       
        <div className="relative flex flex-0 items-center justify-between min-h-[55px] border-gray-200 dark:border-gray-600">
             <div className="flex items-center gap-1">
                 <ToggleButton
                    sideBarExpand={sideBarExpand}
                    mobileSidebarExpand={mobileSidebarExpand}
                />
                <h6>Menu</h6>
            </div>
</div> */}




            {isStoryCreated?(
            
            
           
                 
                  
                  
            <QuickStart userStories={userStories} />
                    
                

            
            ):(<BuildUserStory loading={false} />)}
            

        
         
           
            </div>
            

     
       
        
    )
}



export default UserStoriesListCard;
