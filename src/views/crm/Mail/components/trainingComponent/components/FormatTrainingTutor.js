import React, { useState } from 'react'
import { Card, Button } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import { APP_NAME } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLockClosed } from 'react-icons/hi'
import classNames from 'classnames'
import { Container } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'components/shared'

import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {vs} from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs';

import ReactMarkdown from 'react-markdown';
import {CodeSnippet} from './CodeSnippet.js';

import { SyntaxHighlighter } from 'components/shared'
import ReactHtmlParser from 'html-react-parser'

import { sendPromptChatGPT ,getChatGPTApiData,sendMessageToChatBox,getDetailUserStory,setCurrentTabUserStory} from "../../../../../../store/tutor/userStorySlice.js";

import {setMessageAddress,updateHistory} from "../../../../../../store/tutor/tutor.js";



const quickStartList = [
    {
        label: 'Complete your Account Information',
        desc: 'Fill in your information to complete your account',
        btnText: 'Fill now',
        id: '0',
        disabled: false,
        navigate: '/app/account/kyc-form',
    },
    {
        label: 'Create your first workspace',
        desc: 'We recommend one project per workspace',
        btnText: 'Create Workspace',
        id: '1',
        disabled: true,
        callBack: () => {},
    },
    {
        label: 'Invite team members',
        desc: 'Show the team what you have completed so far.',
        btnText: 'Invite',
        id: '2',
        disabled: true,
    },
]

//const userStoryContext = use


const QuickStartItem = (props) => {


    const dispatch = useDispatch();
    const taggedQuestion = useSelector((state) => state.tutor.taggedQuestion)
    const projectTutorContext = useSelector((state) => state.tutor.projectTutorContext)
    const userStoryInitialContext = useSelector((state) => state.userStorySlice.userStoryInitialContext)
    

  
   
    const generateRandomId = () => {
      return Math.floor(Math.random() * 1000000);
  };

    const {
        title,
        desc,
        btnText,
        index,
        available,
        textTheme = '',
        borderTheme = '',
        path = '',
        callBack,
    } = props

    const navigate = useNavigate()

    

    const handleClick = (values) => {
        if (available) {

            console.log("values to print===="+desc);
            
          
                const newMessage = {
                  id: generateRandomId,
                  prompt: desc,
                  last_context:(projectTutorContext?(projectTutorContext.join(',')):("")),
                  isMe: true,
                };
              //  setChatMessages([...chatMessages, newMessage]);
               // fetchChatRequest();
             //  console.log("before calling"+message);
             //  sendPromptChatGPT(message);
         //      dispatch(sendMessageToChatBox(message));
              //  dispatch(deleteHistoryUserStory());
               // deleteHistoryimplementCodeStringStream
               dispatch(updateHistory());
                dispatch(setMessageAddress("tutor"));
             //   dispatch(setCurrentTabUserStory("tab2"));
               dispatch(getDetailUserStory(newMessage));
             //  navigate(path);
           //    const updatedHistory = [...history, message];
        //      dispatch(updateHistory(updatedHistory));
              // console.log("after calling"+message);
            //    setMessage("");
              

            // callBack?.(dis)
            // if (path) {
            //     navigate(path)
            // }
        }
    }

    return (
        <Card className="mb-1" bordered={false} onClick={handleClick} clickable={true}>
            <div className="md:flex items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    {!available ? (
                        <span className="text-3xl">
                            <HiOutlineLockClosed />
                        </span>
                    ) : (
                      ""
                    )}
                    <div>
                        <h5>{title}</h5>
                        <p>{desc}</p>
                    </div>
                </div>
                {/* <Button
                    disabled={!true}
                    variant="transparent"
                    className="mt-4 md:mt-0"
                    size="sm"
                    onClick={handleClick}
                >
                    {btnText}
                </Button> */}
            </div>
        </Card>
    )
}

const renderCodeBlock = ({ language, value }) => {
    return (
     
       
        <code> {value}</code> 
        // <SyntaxHighlighter language={language} style={vscDarkPlus}>
        
        // </SyntaxHighlighter>
     
    );
  };
  
  const MarkdownWithCodeDetection = ({ markdown }) => {
    return (
      <ReactMarkdown
        escapeHtml={true}
        renderers={{ code: renderCodeBlock }}
        className="blog-content"
        children={markdown}
      />
    );
  };
 
  

  
  
  


const FormatTrainingTutor = ({userStories,loading,setCurrentTab}) => {
    const { textTheme, borderTheme } = useThemeClass();

    const taggedQuestionTutor = useSelector((state) => state.tutor.taggedQuestionTutor)
   // const taggedQuestion = useSelector((state) => state.tutor.taggedQuestion)

   const codePattern = /```([\s\S]*?)```/g;
   let match ;


    const [completion] = useState([
        { value: '0', completed: false, current: true },
        { value: '1', completed: false, current: false },
        { value: '2', completed: false, current: false },
    ])






  

    const renderedItems = taggedQuestionTutor[0]
    ? taggedQuestionTutor[taggedQuestionTutor.length - 1].map((ObjectStory) => {
        if (ObjectStory.serialNumber !== '') {
          return (
            <QuickStartItem
              index={ObjectStory.serialNumber}
              textTheme={textTheme}
              borderTheme={borderTheme}
              title={ObjectStory.label}
              btnText="Start"
              desc={ObjectStory.textPart}
              available={true}
              key={ObjectStory.serialNumber}
            />
          );
        } else {
          return (
            <div className="mb-4" key={ObjectStory.serialNumber}>
              {/* {ObjectStory.textPart} */}
              {/* <CodeSnippet language="javascript" code={ObjectStory.textPart} /> */}
         
                  {
                  
                  
                  
        // while ((match = regex.exec(action.payload))) {
        //     const serialNumber = match[1];
        //     const textPart = match[2];
        //     serialNumbersWithText.push({ serialNumber, textPart });
        //   }
                  
                  
                  ObjectStory.textPart.match(codePattern)?

                  (   <SyntaxHighlighter language={"javascript"} style={vscDarkPlus}>
                  {ObjectStory.textPart}
                  </SyntaxHighlighter>):

                 ( 
                  <article class="prose prose-slate">
                  { ObjectStory.textPart }
                </article>
                 
                 
                 
                //  <div className="prose">
                //   <p>{ReactHtmlParser(ObjectStory.textPart || '')}</p>
                //   {/* static display text to be remove */}

                //   </div>
                  )
                  
                  
                  }
 
    {/* <Container>
        {ObjectStory.textPart}
    </Container> */}
{/*            
                  {<MarkdownWithCodeDetection markdown={markdownContent} />} */}
    
          
                    


                
           
                
               
              
              
              
          
            </div>
          );
        }
      })
    : null;

    return (
        <div
        className={classNames(
            'min-w-[450px] ease-in-out duration-300 relative flex flex-auto flex-col ltr:border-r rtl:border-l',
         //   sideBarExpand && 'ltr:xl:ml-[0px] rtl:xl:mr-[0px]',
         //   mailId ? 'hidden xl:flex' : 'xs:flex'
        )}
        >


      <div className="min-h-[600px] overflow-y-auto max-h-96">
        {renderedItems}
      </div>
  
            {/* <div className="min-h-[600px] overflow-y-auto max-h-96">
        {taggedQuestion[0] ? (
          taggedQuestion[taggedQuestion.length - 1].map((ObjectStory) => (
            <React.Fragment key={ObjectStory.serialNumber}>
              {ObjectStory.id ? (
                <QuickStartItem
                  index={ObjectStory.serialNumber}
                  textTheme={textTheme}
                  borderTheme={borderTheme}
                  key={ObjectStory.serialNumber}
                  btnText={'Start'}
                  desc={ObjectStory.textPart}
                  available={true}
                />
              ) : (
                <div className="mb-4" key={ObjectStory.serialNumber}>
                  {ObjectStory.textPart}
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          ''
        )}
      </div> */}


{/*             
            <div className="min-h-[600px] overflow-y-auto max-h-96">
                
      
                {taggedQuestion[0]?(taggedQuestion[taggedQuestion.length-1].map((ObjectStory) => (
                    <QuickStartItem
                        index={ObjectStory.serialNumber}
                        textTheme={textTheme}
                        borderTheme={borderTheme}
                        key={ObjectStory.serialNumber}
                     //   title={item.label}
                        btnText={"Start"}
                        desc={ObjectStory.textPart}
                       available={true}
                        // available={completion.some(
                        //     (c) =>
                        //         c.value === ObjectStory.story &&
                        //         (c.completed || c.current)
                        // )}
                    //   path={item.navigate}
                    //   callBack={item.callBack}
                    />
                ))
                ):("")}
            </div> */}
            {/* </Loading> */}
        </div>
        
    )
}

export default FormatTrainingTutor
