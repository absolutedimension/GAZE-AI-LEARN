import React, { useState } from 'react'
import { Steps } from 'components/ui'
import LiveCodeContainer from 'views/project/ProjectList/components/LiveCodeContainer'

const Clickable = () => {
    const [step, setStep] = useState(1)

    const onStepChange = (index) => {
        setStep(index)
    }

    const jsonData = [
        { title: 'Step 1', component: <div>Step 1 Content</div> },
        { title: 'Step 2', component: <div>Step 2 Content</div> },
        { title: 'Step 3', component: <div>Step 3 Content</div> },
        { title: 'Step 4', component: <div>Step 4 Content</div> },
      ];

    return (
        <div>
        <Steps current={step} onChange={onStepChange}>
          {jsonData.map((stepData, index) => (
            <Steps.Item key={index} title={stepData.title} />
          ))}
        </Steps>
        <div >
          <LiveCodeContainer /> {/* Render the LiveCodeContainer component */}
        </div>
        <div className="mt-4">{jsonData[step].component}</div>
      </div>
        
    )
}

export default Clickable
