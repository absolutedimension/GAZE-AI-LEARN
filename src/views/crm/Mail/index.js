import React from 'react'
import { AdaptableCard } from 'components/shared'
import TrainingTopics from './components/TrainingTopics'

import { injectReducer } from 'store/index'
import reducer from './store'

import OnlineEditorFrame from './components/OnlineEditorFrame'
import TrainingMain from './components/TrainingMain'

injectReducer('crmMail', reducer)

const Mail = () => {
    return (
        <AdaptableCard
            className="h-full overflow-hidden"
            bodyClass="p-0 h-full absolute inset-0 flex min-w-0 overflow-hidden"
        >
             {/*<MailSidebar />  */}
              <OnlineEditorFrame />

              {/* <TrainingMain/> */}
             {/* <TrainingTopics/> */}
           
            {/* <QuestionList/> */}
            {/* <LiveCodeContainer/> */}
           
          
        </AdaptableCard>
    )
}

export default Mail
