import React, { useState } from 'react'
import { Steps, Button } from 'components/ui'
import LiveCodeContainer from 'views/project/ProjectList/components/LiveCodeContainer'

const Controlled = () => {
    const [step, setStep] = useState(0)

    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    const stepsComponents = [
        LiveCodeContainer,
        LiveCodeContainer,
        LiveCodeContainer,
        LiveCodeContainer,
      ];
    
      const CurrentStepComponent = stepsComponents[step];
    

    return (
        <div>
            <Steps current={step}>
                <Steps.Item title="Login" />
                <Steps.Item title="Order Placed" />
                <Steps.Item title="In Review" />
                <Steps.Item title="Approved" />
            </Steps>
            <CurrentStepComponent/>
            
            <div className="mt-4 text-right">
                <Button
                    className="mx-2"
                    onClick={onPrevious}
                    disabled={step === 0}
                >
                    Previous
                </Button>
                <Button onClick={onNext} disabled={step === 3} variant="solid">
                    {step === 3 ? 'Completed' : 'Next'}
                </Button>
            </div>
        </div>
    )
}

export default Controlled
