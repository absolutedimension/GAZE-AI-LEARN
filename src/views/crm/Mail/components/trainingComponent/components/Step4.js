import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

import {useState} from 'react';

import { FormItem, FormContainer, Segment, Button } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { SegmentItemOption } from 'components/shared'
import {
    HiOutlineBookOpen,
    HiOutlineClock,
    HiOutlineAdjustments,
    HiOutlineSparkles,
    HiArrowSmLeft,
} from 'react-icons/hi'

import { getCodeUserStory } from 'store/tutor/implementedCodeSlice'

import { setMessageAddress,projectTutorContext } from 'store/tutor/tutor'

import { setCurrentTabUserStory } from 'store/tutor/userStorySlice';

import { sendPromptChatGPT ,getChatGPTApiData,sendMessageToChatBox,updateHistory} from "store/tutor/tutor";


const roles = [
    {
        value: 'I am begineer in React and i know basics of Javascript,i want to learn making application in front End',
      //  label: 'Start project from scratch',
        label: 'I am begineer in React and i know basics of Javascript,i want to learn making application in front End.r',
       
     //   icon: <HiOutlineBookOpen />,
    },
    {
        value: 'I have made simple compoenets in react and done few pratice exercises,i want to learn how complex react application works and what are the concepts i would be knowing.',
        label: 'I have made simple compoenets in react and done few pratice exercises,i want to learn how complex react application works and what are the concepts i would be knowing.',
      //  icon: <HiOutlineClock />,
    },
    {
        value: 'I am beginner in coding,have done html css programming a bit,i want to learn Reactjs,how do i start with,help me in learning Reactjs.',
        label: 'I am beginner in coding,have done html css programming a bit,i want to learn Reactjs,how do i start with,help me in learning Reactjs',
     //   icon: <HiOutlineAdjustments />,
    },
    { value: '3', label: 'Others', icon: <HiOutlineSparkles /> },
]

const Step4 = ({ onNext, onBack }) => {

    const dispatch = useDispatch();

    const  tutorContext = useSelector((state) => state.tutor.tutorContext);
    const  token = useSelector((state) => state.auth.session.token);

    const [message, setMessage] = useState("");


  const  history = useSelector((state) => state.tutor.history);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};

    
   

    const projectTutorContext = useSelector(
        (state) => state.tutor.projectTutorContext
    )

    const onSetFieldValue = (form, field, val) => {


    //     const newMessage = {
    //         id: 1,
    //         prompt: val[0],
    //       //  last_context:"",
    //         last_context:val[0]+(projectTutorContext[0]?(projectTutorContext[0].join(',')):("")),
    //         isMe: true,
    //     };
    //   //  dispatch(deleteHistoryimplementCodeStringStream());
    //     dispatch(setMessageAddress("tutor"));
    //   //  dispatch(setCurrentTabUserStory("tab3"));
    //     dispatch(getCodeUserStory(newMessage));

        if (val[0] !== "") {
            const newMessage = {
              id: generateRandomId,
              prompt: val[0],
              client_id:token,
              last_context:(tutorContext?(tutorContext.join(',')):("")),
              isMe: true,
            };
          //  setChatMessages([...chatMessages, newMessage]);
           // fetchChatRequest();
           console.log("before calling"+message);
         //  sendPromptChatGPT(message);
            dispatch(setMessageAddress("tutor"));
        //   dispatch(sendMessageToChatBox(message));
           dispatch(getChatGPTApiData(newMessage));
      
       //    const updatedHistory = [...history, message];
       //   dispatch(updateHistory());
          // console.log("after calling"+message);
         //   setMessage("");
          }

        form.setFieldValue(field.name, val[0])
        onNext?.()
    }

    return (
        <div className="text-center">
            <h3 className="mb-2">Tell me about your skills and what you want?</h3>
            <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
                <Formik
                    initialValues={{
                        role: '',
                    }}
                >
                    {({ touched, errors }) => {
                        return (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                        invalid={errors.role && touched.role}
                                        errorMessage={errors.role}
                                    >
                                        <Field name="role">
                                            {({ field, form }) => (
                                                <Segment
                                                    value={[field.value]}
                                                    onChange={(val) =>
                                                        onSetFieldValue(
                                                            form,
                                                            field,
                                                            val
                                                        )
                                                    }
                                                >
                                                    <div className="w-full">
                                                        {roles.map((item) => (
                                                            <Segment.Item
                                                                value={
                                                                    item.value
                                                                }
                                                                key={item.value}
                                                                disabled={
                                                                    item.disabled
                                                                }
                                                            >
                                                                {({
                                                                    ref,
                                                                    active,
                                                                    onSegmentItemClick,
                                                                    disabled,
                                                                }) => {
                                                                    return (
                                                                        <SegmentItemOption
                                                                            hoverable
                                                                            ref={
                                                                                ref
                                                                            }
                                                                            active={
                                                                                active
                                                                            }
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            onSegmentItemClick={
                                                                                onSegmentItemClick
                                                                            }
                                                                            className="mb-4 bg-white dark:bg-gray-800"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <span className="text-2xl">
                                                                                    {
                                                                                        item.icon
                                                                                    }
                                                                                </span>
                                                                                <h6>
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </h6>
                                                                            </div>
                                                                        </SegmentItemOption>
                                                                    )
                                                                }}
                                                            </Segment.Item>
                                                        ))}
                                                    </div>
                                                </Segment>
                                            )}
                                        </Field>
                                    </FormItem>
                                    <Button
                                        variant="plain"
                                        onClick={onBack}
                                        type="button"
                                        icon={<HiArrowSmLeft />}
                                        block
                                    >
                                        Back
                                    </Button>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Step4
