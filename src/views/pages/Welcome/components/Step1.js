import React from 'react'
import { DoubleSidedImage } from 'components/shared'
import { Button } from 'components/ui'

const Step1 = ({ onNext, onSkip }) => {
    return (
        <div className="text-center">
            <DoubleSidedImage
                className="mx-auto mb-8"
                src="/img/others/welcome.png"
                darkModeSrc="/img/others/welcome-dark.png"
                alt="Welcome"
            />
            <h3 className="mb-2">
                Welcome on Board, lets get started with Live Coding Experience
            </h3>
            <p className="text-base">
                What apllication/features you want to develop,in Brief.
            </p>
            <div className="mt-8 max-w-[350px] mx-auto">
                <Button className="mb-2" variant="solid" onClick={onNext} block>
                    Get started
                </Button>
                {/* <Button variant="plain" onClick={onSkip} block>
                    Skip now
                </Button> */}
            </div>
        </div>
    )
}

export default Step1
