import React from 'react'
import { Button, FormItem, FormContainer, Select, Input } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiArrowSmLeft } from 'react-icons/hi'
import * as Yup from 'yup'
import { sendPromptChatGPT ,getChatGPTApiData,sendMessageToChatBox} from "store/tutor/tutor";
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
    // organizationName: Yup.string().required('Please write what you want to develop'),
    // organizationSize: Yup.string().required(
    //     'Please select from pre defined application'
    // ),
})

const sizes = [
    { label: 'Live Video calling web app', value: 'Live Video calling web app with Reactjs Redux and Webrtc' },
    { label: 'Chat application', value: 'Chat application with Reactjs and Firebase' },
    { label: 'Modern Website for my company', value: 'Modern Website for my company with Reactjs' },
    { label: 'My portfolio', value: 'My portfolio with Reactjs' },
    { label: 'Landing page', value: 'Landing page with Reactjs' },
]

const Step2 = ({ onNext, onBack }) => {

    
    return (
        <div className="text-center">
            <h3 className="mb-2">Tell us about what you want to build</h3>
            <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
                <Formik
                    initialValues={{
                        organizationName: '',
                        organizationSize: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onNext?.()
                    }}
                >
                    {({ values, touched, errors }) => {
                        return (
                            <Form>
                                <FormContainer>
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
                                    <h3 className="mb-2">OR</h3>
                                    <FormItem
                                        label="Pre defined features you might be interested"
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
            </div>
        </div>
    )
}

export default Step2
