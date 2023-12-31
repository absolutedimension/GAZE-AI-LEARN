import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

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

const roles = [
    {
        value: 'I am begineer in React and i know basics of Javascript,i want to learn making application in front End using Reactjs as Developer,generate me correct prompt for this',
      //  label: 'Start project from scratch',
        label: 'I am begineer in React and i know basics of Javascript,i want to learn making application in front End using Reactjs as Developer',
       
     //   icon: <HiOutlineBookOpen />,
    },
    {
        value: 'I have simple compoenets in react and made pratice exercises,i want to learn how complex react application works,like redux setup and execution,give me correct promt to learn this',
        label: 'I have simple compoenets in react and made pratice exercises,i want to learn how complex react application works,like redux setup and execution',
      //  icon: <HiOutlineClock />,
    },
    {
        value: 'I am beginner in coding,have done html css programming a bit,i want to learn Reactjs,how do i start with,help me in generating right prompt to what should i follow in oreder to learn making simple recat front end',
        label: 'I am beginner in coding,have done html css programming a bit,i want to learn Reactjs,how do i start with',
     //   icon: <HiOutlineAdjustments />,
    },
    { value: '3', label: 'Others', icon: <HiOutlineSparkles /> },
]

const Step4 = ({ onNext, onBack }) => {

    const dispatch = useDispatch();
   

    const projectTutorContext = useSelector(
        (state) => state.tutor.projectTutorContext
    )

    const onSetFieldValue = (form, field, val) => {


        const newMessage = {
            id: 1,
            prompt: val[0],
          //  last_context:"",
            last_context:val[0]+(projectTutorContext[0]?(projectTutorContext[0].join(',')):("")),
            isMe: true,
        };
      //  dispatch(deleteHistoryimplementCodeStringStream());
        dispatch(setMessageAddress("projectTutor"));
        dispatch(setCurrentTabUserStory("tab3"));
        dispatch(getCodeUserStory(newMessage));

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
