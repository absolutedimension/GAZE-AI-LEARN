
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiAskCourseDetails, apiAskUniverse } from 'services/AiBotService'
import ReactMarkdown from 'react-markdown';
//import {json} from 'json';

export const initialState = {
  id: 1,
  messages: [],
  history: [],
  newHistory: [],
  tutorContext:[],
  isMe: false,
  takeTest: false,
  newCardAddedIndex: 0,
  extractedData: [],
  updatedHistory: "",
  userStories:[],

  userStoryCharStream:[],
  userStoryStringStream:[],
  userStoryContext:[],

  implementCodeStringStream:[],
  implementCodeCharStream:[],
  implementedCodeContext:[],

  projectTutorStringStream:[],
  projectTutorCharStream:[],
  projectTutorContext:[],

  taggedQuestion:[],
  taggedQuestionTutor:[],
  previousProjectTutorStringStream:[],
  onlyText:[],

  previousNewHistory:[],
  isStepCreated:false

}


const pattern = /(\d+\.\s[\w\s]+):/g;

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};




// export const writeFile = (data) => {
//   const jsonString = JSON.stringify(data);
  
//   return json.writeFile('data.json', jsonString)
//     .then(() => {
//       console.log('JSON file has been saved.');
//     })
//     .catch((error) => {
//       console.error('Error writing JSON file:', error);
//     });
// };

export const writeFileSteps = createAsyncThunk('tutor/writeFileSteps', async (data) => {
  console.log("Inside api call" + data);


 const jsonString = JSON.stringify(data);
  
  // const response= json.writeFile('data1.json', jsonString)
  //   .then(() => {
  //     console.log('JSON file has been saved.');
  //      response = true;
  //   })
  //   .catch((error) => {
  //     console.error('Error writing JSON file:', error);
  //     response = false;
  //   });


  //return response
})


export const getChatGPTApiData = createAsyncThunk('tutor/getChatGPTApiData', async (data) => {
  console.log("Inside api call" + data);

  const response = await apiAskUniverse(data)


  return response.data
})

export const getCourseDetailsApiData = createAsyncThunk('tutor/getCourseDetailsApiData', async (data) => {
  // console.log("Inside api call"+data);

  const response = await apiAskCourseDetails(data)


  return response.data
})

export const tutor = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    sendMessageToChatBox: (state, action) => {
      const responseMessage = {
        id: generateRandomId(),
        message: action.payload,
        isMe: true
      };
     
      state.messages = [...state.messages, responseMessage];
      state.isLoading = true;
      state.loadingMessageId = responseMessage.id;
    },
    updateRemovedRow:(state, action) => {

      var row = action.payload;
      console.log("in side remode reducers===="+JSON.stringify(row.original.id))
    //  state.messages = [];
    const updatedData = state.messages.filter((item) => item.id !== row.original.id);
    state.messages = [];
      state.messages = [...state.messages, ...updatedData];
    
    },
    updateHistoryLiveCode: (state, action) => {


      const regex = /(\d+)\.\s*(.*)/g;
      const serialNumbersWithText = [];
      let match;

      while ((match = regex.exec(state.projectTutorStringStream[0]))) {
        const serialNumber = match[1];
        const textPart = match[2];
        serialNumbersWithText.push({ serialNumber, textPart });
      }


      // const responseMessage = {
      //   id: generateRandomId(),
      //   message: action.payload,
      //   isMe: false
      // };
      // state.messages = [...state.messages, responseMessage];
      state.isLoading = false;
      state.isStoryCreated = true;
      state.taggedQuestion = [...state.taggedQuestion,serialNumbersWithText]



      state.projectTutorContext = [...state.projectTutorContext ,...state.projectTutorStringStream]
      state.projectTutorCharStream =[];
      state.projectTutorStringStream = [];

      

  },
    takeTest: (state, action) => {
      state.takeTest = action.payload;
    },
    formatScreen:(state,action)=>{


      // const regex = /(\d+)\.\s*(.*)/g;
      // const serialNumbersWithText = [];
      // let match;

      // while ((match = regex.exec(state.projectTutorStringStream[0]))) {
      //   const serialNumber = match[1];
      //   const textPart = match[2];
      //   serialNumbersWithText.push({ serialNumber, textPart });
      // }

             const regex = /(\d+)\.\s*(.*)/g;
              const serialNumbersWithText = [];
              const onlyText = [];
              const blankText = "";
              let match;
              let lastIndex = 0;
              const projectTutorString = state.projectTutorStringStream[0] || '';

              while ((match = regex.exec(projectTutorString))) {
                const serialNumber = match[1];
                const textPart = match[2];
  
  // Store the non-matching text before the current match
            if (match.index > lastIndex) {
              const nonMatchingText =projectTutorString.substring(lastIndex, match.index);
            //  serialNumbersWithText.push({ nonMatchingText });
         //   const id = generateRandomId();
            const serialNumber = "";
            const textPart = nonMatchingText;
           // serialNumbersWithText.push({ nonMatchingText });
            serialNumbersWithText.push({ serialNumber, textPart });
         //     serialNumbersWithText.push({ generateRandomId, nonMatchingText });
            }

            // Store the current match
          //  const id = generateRandomId();
            serialNumbersWithText.push({  serialNumber, textPart });

            // Update the lastIndex to the end of the current match
            lastIndex = regex.lastIndex;
          }

          // Store the remaining non-matching text after the last match
          if (lastIndex < projectTutorString.length) {
            const nonMatchingText = projectTutorString.substring(lastIndex);
          //  const id = generateRandomId();
            const serialNumber = "";
            const textPart = nonMatchingText;
           // serialNumbersWithText.push({ nonMatchingText });
            serialNumbersWithText.push({ serialNumber, textPart });
          }








      // const responseMessage = {
      //   id: generateRandomId(),
      //   message: action.payload,
      //   isMe: false
      // };
      // state.messages = [...state.messages, responseMessage];
      state.isLoading = false;
      state.isStoryCreated = true;
      state.taggedQuestion = [...state.taggedQuestion,serialNumbersWithText]
    //  state.onlyText = [...state.taggedQuestion,onlyText]


    },
    formatScreenTutor:(state,action)=>{


      // const regex = /(\d+)\.\s*(.*)/g;
      // const serialNumbersWithText = [];
      // let match;

      // while ((match = regex.exec(state.projectTutorStringStream[0]))) {
      //   const serialNumber = match[1];
      //   const textPart = match[2];
      //   serialNumbersWithText.push({ serialNumber, textPart });
      // }

             const regex = /(\d+)\.\s*(.*)/g;
              const serialNumbersWithText = [];
              const onlyText = [];
              const blankText = "";
              let match;
              let lastIndex = 0;
              const newHistoryString = state.newHistory[0] || '';

              while ((match = regex.exec(newHistoryString))) {
                const serialNumber = match[1];
                const textPart = match[2];
  
  // Store the non-matching text before the current match
            if (match.index > lastIndex) {
              const nonMatchingText =newHistoryString.substring(lastIndex, match.index);
            //  serialNumbersWithText.push({ nonMatchingText });
         //   const id = generateRandomId();
            const serialNumber = "";
            const textPart = nonMatchingText;
           // serialNumbersWithText.push({ nonMatchingText });
         //   serialNumbersWithText.push({ serialNumber, '<li>'+ {textPart} +'</li>' });
            serialNumbersWithText.push({ serialNumber, textPart});

          //    serialNumbersWithText.push({ generateRandomId, nonMatchingText });
            }

            // Store the current match
          //  const id = generateRandomId();
            serialNumbersWithText.push({  serialNumber, textPart });
         //   serialNumbersWithText.push({ serialNumber, textPart: `<p>${textPart}</p>` });


            // Update the lastIndex to the end of the current match
            lastIndex = regex.lastIndex;
          }

          // Store the remaining non-matching text after the last match
          if (lastIndex < newHistoryString.length) {
            const nonMatchingText = newHistoryString.substring(lastIndex);
          //  const id = generateRandomId();
            const serialNumber = "";
            const textPart = nonMatchingText;
           // serialNumbersWithText.push({ nonMatchingText });
            serialNumbersWithText.push({ serialNumber, textPart });
          //  serialNumbersWithText.push({ serialNumber, textPart: `<p>${textPart}</p>` });

          }








      // const responseMessage = {
      //   id: generateRandomId(),
      //   message: action.payload,
      //   isMe: false
      // };
      // state.messages = [...state.messages, responseMessage];
      state.isLoading = false;
      state.isStoryCreated = true;
      state.taggedQuestionTutor = [...state.taggedQuestion,serialNumbersWithText]
    //  state.onlyText = [...state.taggedQuestion,onlyText]


    },
    deleteHistoryUserStory: (state, action) => {
      state.userStoryContext = [...state.userStoryContext ,...state.userStoryStringStream]
      state.userStoryStringStream = [];
      state.userStoryCharStream = [];
    },
    deleteHistoryimplementCodeStringStream: (state, action) => {

      state.projectTutorContext = [...state.projectTutorContext ,state.implementCodeStringStream];
   //   state.projectTutorStringStream = [...state.projectTutorStringStream ,...state.implementCodeStringStream]
      state.projectTutorStringStream = [];
      state.projectTutorCharStream = [];
      state.previousProjectTutorStringStream = [];
   //   state.implementCodeCharStream = [];
    },
    setMessageAddress: (state, action) => {
      state.messageAddress = action.payload;
    },
    setNewStory: (state, action) => {
      state.isStoryCreated = false;
    },
    showUserStory: (state, action) => {
      state.isStoryCreated = true;
    },
    newCardAdded: (state, action) => {
      state.newCardAddedIndex = action.payload;
    },
    extractedData: (state, action) => {

      const patternNumber = /(\d+\.\s[\w\s]+):/g;
      const matchedCount = (state.newHistory[0].match(patternNumber) || []).length;

      if (matchedCount > 0) {
        // Insert the button into the character stream
        const button = `
                <button
                  onClick={handleClick()}
                >
                  ${"Start"}
                </button>
              `;

        // Find the index where the pattern is detected
        const patternIndex = state.newHistory[0].search(patternNumber);

        // Insert the button at the pattern index
        state.updatedHistory = state.newHistory[0].slice(0, patternIndex) + button + state.newHistory[0].slice(patternIndex);


        // Use the extractedData as needed



      }
    },

    setChatFromStream: (state, action) => {

      //    let message =[responseMessage.message, action.payload];
      // let testArray=[];   
      //  console.log("I
      const responseMessage = {
        id: generateRandomId(),
        message: (action.payload).reduce((accumulator, currentValue) => accumulator + currentValue, ''),
        isMe: false
      };




      //  state.messages = [...prevMessages, responseMessage];

      state.messages = [...state.messages, responseMessage]
      //  state.isLoading = false;
      //   state.isStoryCreated = true;
    },
    messageRecieved: (state, action) => {

      console.log("The message is goin to==+"+state.messageAddress);



      if(state.messageAddress != null && state.messageAddress == "userStory"){

        state.userStoryStringStream = []
        state.userStoryCharStream = [...state.userStoryCharStream, action.payload]
        state.userStoryStringStream = [...state.userStoryStringStream, state.userStoryCharStream.join('')]
        

      }
      else if(state.messageAddress != null && state.messageAddress == "code"){

        state.implementCodeStringStream = []
        state.implementCodeCharStream = [...state.implementCodeCharStream, action.payload]
        state.implementCodeStringStream = [...state.implementCodeStringStream, state.implementCodeCharStream.join('')]

      }else if(state.messageAddress != null && state.messageAddress == "tutor"){

      

        state.previousNewHistory[0] =state.newHistory[0]
        state.newHistory = []

       // state.newHistory = []
        state.history = [...state.history, action.payload]
        state.newHistory = [...state.newHistory, state.history.join('')]


        // const markdownContent = state.newHistory[0] ? (
        //   <ReactMarkdown escapeHtml={true}  className="blog-content">
        //     {/* {history.replace(pattern, ' [$1]("") :')} */}
        //     {state.newHistory[0].replace(pattern, ' [$1](#):')}
        //     {/* {parseDataToArray({history})} */}
        //   </ReactMarkdown>
        // ) : null;

        state.messages.forEach((obj) => {
          if (obj.id === state.loadingMessageId) {
            obj.subRows = [{id:obj.id,message:state.newHistory[0].replace(pattern, ' [$1](#):'),isMe:false}];
          }
        });

      }
      else if(state.messageAddress != null && state.messageAddress == "projectTutor"){

        state.previousProjectTutorStringStream[0] =state.projectTutorStringStream[0]
        state.projectTutorStringStream = []
      
        state.projectTutorCharStream = [...state.projectTutorCharStream, action.payload]
        state.projectTutorStringStream = [...state.projectTutorStringStream, state.projectTutorCharStream.join('')]

      }


     
      
    },
    // messageRecieved: (state, action) => {
    //   console.log("Data from backend==" + action.payload);

    //   if (Array.isArray(action.payload)) {
    //     const pattern = /^\d+\.\s(.*?)(?=\d+\.\s|$)/gs;
    //     const extractedData = action.payload.reduce((accumulator, current) => {
    //       const match = pattern.exec(current.message);

    //       if (match) {
    //         accumulator.push(match[1].trim());
    //       }

    //       return accumulator;
    //     }, []);

    //     state.newHistory = [];
    //     state.history = [...state.history, ...action.payload];
    //     state.newHistory = [...state.newHistory, extractedData];
    //   }
    // },
    messageSent: (state, action) => {
      state.history = [...state.history, action.payload]
    },

    webSocketConnected: (state, action) => {
      if (action.payload) {
        state.isConnected = true
      }
    },
    webSocketDisconneted: (state, action) => {
      state.isConnected = false
    },
    webSocketError: (state, action) => {
      state.error = action.payload
    },
    updateHistory(state, action) {
      // state.history =[...state.history,...state.messages]
      state.tutorContext = [...state.tutorContext ,...state.newHistory]
      state.history = [];
      state.newHistory = [];
      state.previousNewHistory = [];
    },


  },
  // sendPromptChatGPT: (state, action) => {
  //         state.messages = action.payload
  //         state.isLoading = action.isLoading

  // //     },
  extraReducers: (builder) => {
    //  console.log("Inside sendPromptChatGPT"+builder);
    builder
      .addCase(getChatGPTApiData.pending, (state) => {
        console.log("Inside pending statusssssssssssssssssss" + builder);
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatGPTApiData.fulfilled, (state, action) => {
        // console.log("Inside payload"+JSON.stringify(action));
        // const responseMessage = { 
        //     id: generateRandomId(), 
        //     message: action.payload, 
        //     isMe: false
        //   };
        // state.messages = [...state.messages, responseMessage];
        state.isLoading = false;
        state.isStoryCreated = true;
        // state.newHistory=[];
        // state.history=[];
      })


      // .addCase(getCourseDetailsApiData.pending, (state, action) => {

      //     const responseMessage = { 
      //         id: generateRandomId(), 
      //         message: action.payload, 
      //         isMe: true
      //       };
      //     state.isLoading = true;
      //     state.error = action.error.message;
      //     state.loadingMessageId = responseMessage.id;
      //    })
      .addCase(getCourseDetailsApiData.fulfilled, (state, action) => {
        // const answer = extractData(action.payload,"Ans :")
        console.log("Inside payload" + JSON.stringify(action.payload));

        const regex = /(\d+)\.\s*(.*)/g;
        const serialNumbersWithText = [];
        let match;

        while ((match = regex.exec(action.payload))) {
          const serialNumber = match[1];
          const textPart = match[2];
          serialNumbersWithText.push({ serialNumber, textPart });
        }


        // const responseMessage = {
        //   id: generateRandomId(),
        //   message: action.payload,
        //   isMe: false
        // };
        // state.messages = [...state.messages, responseMessage];
        state.isLoading = false;
        state.isStoryCreated = true;
        state.userStories = [...state.userStories,serialNumbersWithText]
      })
      .addCase(writeFileSteps.fulfilled, (state, action) => {
     
        state.isStepCreated = action.payload;
    //    state.isStoryCreated = true;
     //   state.userStories = [...state.userStories,serialNumbersWithText]
      })
  },
})

export const { sendPromptChatGPT,formatScreen,updateRemovedRow,formatScreenTutor,deleteHistoryimplementCodeStringStream,deleteHistoryUserStory, updateHistoryLiveCode,setMessageAddress,updateHistory, newCardAdded, extractedData, showUserStory, sendMessageToChatBox, takeTest, setNewStory, setChatFromStream, webSocketConnected, webSocketError, webSocketDisconneted, messageRecieved, messageSent } = tutor.actions

export default tutor.reducer

