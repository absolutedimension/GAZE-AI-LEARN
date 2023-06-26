import React from 'react'
import { Button, FormItem, FormContainer, Select, Input } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiArrowSmLeft } from 'react-icons/hi'
import * as Yup from 'yup'
import { sendPromptChatGPT, getChatGPTApiData, getUserStories, showUserStory } from "../../../../store/tutor/userStorySlice";
import { useDispatch } from 'react-redux';
import UserStoriesListCard from 'views/crm/Mail/components/livecodeComponent/UserStoriesListCard'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'components/shared'
import { useState } from 'react'


const validationSchema = Yup.object().shape({
    // organizationName: Yup.string().required('Please write what you want to develop'),
    // organizationSize: Yup.string().required(
    //     'Please select from pre defined application'
    // ),
})

const sizes = [
    { label: 'Live Video calling web app', value: 'Create User stories of developing Live Video calling web app with Reactjs Redux and Webrtc' },
    { label: 'Chat application', value: 'Create User stories of developing Chat application with Reactjs and Firebase' },
    { label: 'Modern Website for my company', value: 'Create User stories of developing Modern Website for my company with Reactjs' },
    { label: 'My portfolio', value: 'Create User stories of developing My portfolio with Reactjs' },
    { label: 'Landing page', value: 'Create User stories of developing Company Landing page with Reactjs' },
]

const BuildUserStory = () => {





      
    const dispatch = useDispatch();
    const generateRandomId = () => {
        return Math.floor(Math.random() * 1000000);
      };

const navigate = useNavigate();

      const[loading,setLoading]=useState(false);


  const  handleClick = (values) => {
        //   e.preventDefault();
       
        setLoading(true)
      //  setIsStoryCreated(true);
        console.log("before calling1111111111" + JSON.stringify(values));
     //   isStoryCreated= true;

        if (values !== "" && values.organizationName !== "") {
            // const newMessage = {
            //     text:'Create User stories of developing' + values.organizationName+ 'with ReactJS'
            // };
            const newMessage = {
                question: 'Create 19 User stories of developing' + values.organizationName+ 'with ReactJS',
                last_context:""
            };

            // const newMessage = {
            //     id: generateRandomId(),
            //     prompt: 'Create at least 19 User stories of developing' + values.organizationName+ 'with ReactJS',
            //     last_context:'',
            //     isMe: true,
            //   }

           console.log("before calling" + JSON.stringify(values));
        //    dispatch(getCourseDetailsApiData(newMessage));
             dispatch(showUserStory);
          //  dispatch(getChatGPTApiData(newMessage));
            dispatch(getUserStories(newMessage));
            loading=true;
            
         //   navigate(<UserStoriesListCard/>);
         //  navigate(`/app/crm/mail/${category.topic}`, { replace: true })
        } else {
            if (values !== "" && values.organizationSize !== "") {
                const newMessage = {
                    question: values.organizationSize,
                    last_context:""
                };
               
                    // const newMessage = {
                    //   id: generateRandomId(),
                    //   prompt: values.organizationSize,
                    //   last_context:'',
                    //   isMe: true,
                    // }

                    console.log("before dispatchghhhhhh" + JSON.stringify(values));
                    dispatch(showUserStory);
                    dispatch(getUserStories(newMessage));
              //      navigate(<UserStoriesListCard/>);
             //   dispatch(getChatGPTApiData(newMessage));
               
            //    navigate(`/app/crm/mail/${category.topic}`, { replace: true })
            }
        }
    
    };


    return (
        <div className="text-center">
            <h5 className="mb-1">Tell us about what you want to build</h5>
            <div className="mt-8 max-w-[300px] lg:min-w-[200px] mx-auto">
            <Loading
                    loading={loading}
                >
                <Formik
                    initialValues={{
                        organizationName: '',
                        organizationSize: '',
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleClick(values)
                    }}
                >
                    {({ values, touched, errors }) => {
                        return (
                            <Form>
                                <FormContainer>
                                <FormItem
                                        label="Pre defined application/feature"
                                        invalid={
                                            errors.organizationSize &&
                                            touched.organizationSize
                                        }
                                        errorMessage={errors.organizationSize}
                                    >
                                        <Field name="organizationSize">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Feature list..."
                                                    field={field}
                                                    form={form}
                                                    options={sizes}
                                                    value={sizes.filter(
                                                        (size) =>
                                                            size.value ===
                                                            values.organizationSize
                                                    )}
                                                    onChange={(size) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            size.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <h5 className="mb-2">OR</h5>
                                    <FormItem
                                        label="Main Feature in brief"
                                        invalid={
                                            errors.organizationName &&
                                            touched.organizationName
                                        }
                                        errorMessage={errors.organizationName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="organizationName"
                                            placeholder="Eg:Chat application"
                                            component={Input}
                                        />
                                    </FormItem>
                                    
                            
                                    <FormItem>
                                        <Button
                                            block
                                            variant="solid"
                                            type="submit"

                                        >
                                            Start Development
                                        </Button>
                                        {/* <Button
                                            className="mt-4"
                                            variant="plain"
                                            onClick={onBack}
                                            type="button"
                                            icon={<HiArrowSmLeft />}
                                            block
                                        >
                                            Back
                                        </Button> */}
                                    </FormItem>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </Loading>    
            </div>
        </div>
    )
}

export default BuildUserStory
