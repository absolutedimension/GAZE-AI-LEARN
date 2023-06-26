import React from 'react'
import { Checkbox } from 'components/ui'

const Default = () => {
    const onCheck = (value, e) => {
        console.log(value, e)
    }

    return (
        <div>
            <Checkbox defaultChecked onChange={onCheck}>
                Checkbox
            </Checkbox>
        </div>
    )
}

export default Default
