import React, { useEffect } from 'react'
import classNames from 'classnames'
import { Menu, Badge, ScrollBar, Drawer } from 'components/ui'
import {
    HiOutlineInbox,
    HiOutlinePaperAirplane,
    HiOutlinePencil,
    HiOutlineStar,
    HiOutlineTrash,
} from 'react-icons/hi'
//import MainCompose from './MainCompose'
import useResponsive from 'utils/hooks/useResponsive'
import { updateMailId } from '../store/dataSlice'
import {
    updateSelectedCategory,
    toggleMobileSidebar,
} from '../../../crm/Mail/store/stateSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { getChatGPTApiData, sendMessageToChatBox, takeTest,setNewStory } from 'store/tutor/tutor';

import questionData from './questions';

const { MenuItem, MenuGroup } = Menu

export const groupList = [
    { value: 'inbox', label: 'Inbox', dotClass: 'bg-blue-500' },
    { value: 'sentItems', label: 'Introduction to AI', dotClass: 'bg-blue-500' },
    { value: 'draft', label: 'Machine Learning', dotClass: 'bg-indigo-500' },

    { value: 'starred', label: 'Fundamentals', dotClass: 'bg-red-500' },
    { value: 'deleted', label: 'Deleted', dotClass: 'bg-red-500' },
    { value: 'module_1', label: 'Fundamentals of JavaScript', dotClass: 'bg-red-500' },
]

export const labelList = [
    { value: 'work', label: 'Basic Concept and Syntax', dotClass: 'bg-blue-500' },
    { value: 'private', label: 'Private', dotClass: 'bg-indigo-500' },
    { value: 'important', label: 'Important', dotClass: 'bg-red-500' },
]

const MailSideBarContent = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const selectedCategory = useSelector(
        (state) => state.crmMail.state.selectedCategory
    )

    const direction = useSelector((state) => state.theme.direction)

    const onMenuClick = (category) => {
      //  dispatch(updateMailId(''))
      console.log("outpiuweiouwur=="+JSON.stringify(category));
      if (category !== "") {
        const newMessage = {
          id: category.length + 1,
          text: category,
          last_context:'',
          isMe: true,
        };
     //   dispatch(sendMessageToChatBox(category));

    //    dispatch(getChatGPTApiData(newMessage))
        dispatch(setNewStory());
       // navigate(`/app/crm/mail/${category.topic}`, { replace: true })
    }
}
    

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        //     const selected = getCategory(path)
        //     dispatch(getChatGPTApiData(selected))
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const getCategory = (value) => {
    //     const categories = [...groupList, ...labelList]
    //     let category = value
    //     if (category === 'mail') {
    //         category = 'inbox'
    //     }
    //     return {
    //         value: category,
    //         label: categories.find((cat) => cat.value === category).label,
    //     }
    // }

    return (
        <ScrollBar direction={direction}>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="my-8 mx-6">
                        <h3>Basics AI</h3>
                    </div>
                    {/* <Menu variant="transparent" className="mx-2 mb-10">
                        {groupList.map((menu) => (
                            <MenuItem
                                key={menu.value}
                                eventKey={menu.value}
                                className={`mb-2 ${
                                    selectedCategory.value === menu.value
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : ''
                                }`}
                                onSelect={() => onMenuClick(menu)}
                            >
                                <Badge
                                    className="ltr:mr-2 rtl:ml-2"
                                    innerClass={menu.dotClass}
                                    />
                                <span>{menu.label}</span>
                            </MenuItem>
                        ))}
                    </Menu> */}
                    <Menu variant="dark" className="mx-2 mb-6">
                        {questionData.map((category) => (
                            <MenuGroup key={category.topic} label={""}>
                                <Menu.MenuCollapse eventKey={`group-${category.topic}-item-3`} label={category.topic}>
                                    {category.questions.map((question) => (
                                        <MenuItem
                                            key={question.question}
                                            eventKey={question.question}
                                            className={`mb-2 ${selectedCategory && selectedCategory.topic === category.topic
                                                    ? 'bg-gray-100 dark:bg-gray-700'
                                                    : ''
                                                }`}
                                            onSelect={() => onMenuClick(question.question)}
                                        >
                                            <Badge className="ltr:mr-2 rtl:ml-2" innerClass={question.dotClass} />
                                            <span>{question.question}</span>
                                        </MenuItem>
                                    ))}
                                </Menu.MenuCollapse>
                            </MenuGroup>
                        ))}
                    </Menu>
                    {/* <Menu>
                <Menu.MenuGroup key="group-1" label="Group 1">
                    <Menu.MenuItem eventKey="group-1-item-1">
                        Item 1
                    </Menu.MenuItem>
                    <Menu.MenuItem eventKey="group-1-item-2">
                        Item 2
                    </Menu.MenuItem>
                    <Menu.MenuCollapse eventKey="group-1-item-3" label="Item 3">
                        <Menu.MenuItem eventKey="group-1-item-3-1">
                            Item 3.1
                        </Menu.MenuItem>
                        <Menu.MenuItem eventKey="group-1-item-3-2">
                            Item 3.2
                        </Menu.MenuItem>
                    </Menu.MenuCollapse>
                </Menu.MenuGroup>
                <Menu.MenuGroup key="group-2" label="Group 2">
                    <Menu.MenuItem eventKey="group-2-item-1">
                        Item 1
                    </Menu.MenuItem>
                    <Menu.MenuItem eventKey="group-2-item-2">
                        Item 2
                    </Menu.MenuItem>
                </Menu.MenuGroup>
            </Menu> */}
                </div>
                {/* <div className="mx-4 mb-4">
                    <MainCompose />
                </div> */}
            </div>
        </ScrollBar>
    )
}

 const  UserJourneyMenu = () => {
    const sideBarExpand = useSelector(
        (state) => state.liveCodeSlice.sideBarExpand
    )

    const mobileSideBarExpand = useSelector(
        (state) => state.liveCodeSlice.mobileSideBarExpand
    )

    const dispatch = useDispatch()

    const { smaller } = useResponsive()

    const onMobileSideBarClose = () => {
        dispatch(toggleMobileSidebar(false))
    }

    return smaller.xl ? (
        <Drawer
            bodyClass="p-0"
            title="Mail"
            isOpen={mobileSideBarExpand}
            onClose={onMobileSideBarClose}
            onRequestClose={onMobileSideBarClose}
            placement="left"
            width={280}
        >
            <MailSideBarContent />
        </Drawer>
    ) : (
        <div
            className={classNames(
                'w-[280px] absolute top-0 bottom-0 ease-in-out duration-300 bg-white dark:bg-gray-800 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-600 z-10',
                sideBarExpand
                    ? 'ltr:left-0 rtl:right-0'
                    : 'ltr:left-[-280px] rtl:right-[-280px]'
            )}
        >
            <MailSideBarContent />
        </div>
    )
}

export default  UserJourneyMenu 
