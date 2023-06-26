import React, { useEffect } from 'react'
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

import { InputGroup, Input, Select, DatePicker } from 'components/ui'
import { HiOutlineMicrophone } from 'react-icons/hi'

import ChatMessage from '../ChatMessage'

import { StickyFooter } from 'components/shared'
import InputTutor from '../InputTutor'
import QuickStart from 'views/pages/Welcome/components/QuickStart'

const htmlReg = /(<([^>]+)>)/gi

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

const LiveCodeUserStory = () => {
    const dispatch = useDispatch()
    const messages = useSelector((state) => state.tutor.messages)
    const isLoading = useSelector((state) => state.tutor.isLoading)
    const loadingMessageId = useSelector((state) => state.tutor.loadingMessageId)

    // const mails = useSelector((state) => state.crmMail.data.mailList)
    // const mailId = useSelector((state) => state.crmMail.data.selectedMailId)
    // const loading = useSelector((state) => state.crmMail.data.mailListLoading)
    const sideBarExpand = useSelector(
        (state) => state.crmMail.state.sideBarExpand
    )
    const mobileSidebarExpand = useSelector(
        (state) => state.crmMail.state.mobileSidebarExpand
    )
    const selectedCategory = useSelector(
        (state) => state.crmMail.state.selectedCategory
    )

    const direction = useSelector((state) => state.theme.direction)

    const navigate = useNavigate()
    const location = useLocation()

    const fetchData = (data) => {
        dispatch(getMails(data))
    }

    // useEffect(() => {
    //     const path = location.pathname.substring(
    //         location.pathname.lastIndexOf('/') + 1
    //     )
    //     const category = { category: path }

    //     if (path === 'mail') {
    //         category.category = 'inbox'
    //     }

    //     fetchData(category)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname])

    // const parseHtml = (content) => {
    //     if (!content) {
    //         return ''
    //     }
    //     const text = content.replace(htmlReg, '')
    //     return text.length > 60 ? text.substring(0, 57) + '...' : text
    // }

    // const onMailClick = (e, id) => {
    //     e.stopPropagation()
    //     dispatch(updateMailId(id))
    //     dispatch(updateReply(false))
    //     navigate(`${location.pathname}?mail=${id}`, { replace: true })
    // }

    return (
        <div
            className={classNames(
                'min-w-[430px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600',
                sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
                // mailId ? 'hidden xl:flex' : 'xs:flex'
            )}
        >
            <div className="relative flex flex-0 items-center justify-between min-h-[55px] border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-1">
                    <ToggleButton
                        sideBarExpand={sideBarExpand}
                        mobileSidebarExpand={mobileSidebarExpand}
                    />
                    <h6>Learning Modules</h6>
                </div>
            </div>
            <ScrollBar autoHide direction={direction}>
                <Loading
                    type={messages.length > 0 ? 'cover' : 'default'}
                    spinnerClass={messages.length > 0 ? 'hidden' : ''}
                    loading={false}
                >
                    {/* {messages.map((chatMessage) => (
                        <ChatMessage chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
                    ))} */}
                    
                      {/* <QuickStart/> */}
                 


                    {/* {messages.map((chatMessage) => (
                    <ChatMessage chatMessage={chatMessage} isLoading={isLoading} loadingMessageId={loadingMessageId} />
        ))} */}
                </Loading>
            </ScrollBar>

            <div className="flex-grow flex flex-col justify-end">
                <InputTutor />
                </div>
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

export default LiveCodeUserStory;
