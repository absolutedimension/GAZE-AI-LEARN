import React, { useState, useCallback, Suspense, lazy ,useRef} from 'react'
import { Container } from 'components/shared'
//import LiveCodeChatList from 'views/crm/Mail/components/livecodeComponent/LiveCodeChatList'


const Step1 = lazy(() => import('../components/Step1'))
const Step2 = lazy(() => import('../../CoursesLauncher'))
const Step3 = lazy(() => import('../components/Step4'))
const Step4 = lazy(() => import('../components/Step4'))
//const QuickStart = lazy(() => import('./trainingComponent/QuickStart'))
const CoursesLauncher = lazy(() => import('../../CoursesLauncher'))

const StepsController = () => {
    const [surveyStep, setSurveyStep] = useState(0)
    const [showTutor, setShowTutor] = useState(false)

    const chatWindowRef = useRef(null);

    const handleNext = useCallback(() => {
        setSurveyStep(surveyStep + 1)
    }, [surveyStep])

    const handleBack = useCallback(() => {
        setSurveyStep(surveyStep - 1)
    }, [surveyStep])

    const handleSkip = () => {
        setSurveyStep(4)
    }

    return (
        <Container className="h-full">
            <div className="h-full flex flex-col ">
                <Suspense fallback={<></>}>
                    {surveyStep === 0 && (
                        <Step1 onNext={handleNext} onSkip={handleSkip} />
                    )}
                    {surveyStep === 1 && (
                        <Step2 onNext={handleNext} onBack={handleBack} />
                    )}
                    {surveyStep === 2 && (
                        <Step3 onNext={handleNext} onBack={handleBack} />
                    )}
                    {surveyStep === 3 && (
                        <Step4 onNext={handleNext} onBack={handleBack} />
                    )}
                    {surveyStep === 4 && <CoursesLauncher chatWindowRef={chatWindowRef}/>}
                    {/* {surveyStep === 4 && setShowTutor(true)} */}
                    {/* {showTutor?(<LiveCodeChatList/>):(null)} */}
                </Suspense>
            </div>
        </Container>
    )
}

export default StepsController
