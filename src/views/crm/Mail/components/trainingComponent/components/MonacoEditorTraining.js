import React, { useState, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import FileUploader from './FileUploader';
import {  Segment ,Button} from 'components/ui';

import { Card, Avatar, Notification, toast } from 'components/ui'



import classNames from 'classnames'
import { Tabs } from 'components/ui'

import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import Tree from './Tree';
 
// import FileExplorer from 'react-file-explorer';
const { TabNav, TabList, TabContent } = Tabs

const Pill = ({consoleOut}) => {

    return (
      <div>
        <Tabs defaultValue="tab1">
          <TabList>
  
           
            <TabNav value="tab1">Console</TabNav>
            <TabNav value="tab2">Terminal</TabNav>
            <TabNav value="tab3">Output</TabNav>
          
          </TabList>
          <div className="p-4">
  
         
            <TabContent value="tab1">
             {consoleOut}
            </TabContent>
            <TabContent value="tab2">
            <div>Step 1: Create the Registration Form Component
  
  Create a new React component called RegistrationForm.
  Inside the component, design and implement a form that includes fields for username, email, and password.
  Use controlled inputs to handle user input and store the values in component state.</div>
            </TabContent>
            <TabContent value="tab3">
            <div>Step 1: Create the Registration Form Component
  
  Create a new React component called RegistrationForm.
  Inside the component, design and implement a form that includes fields for username, email, and password.
  Use controlled inputs to handle user input and store the values in component state.</div>
            </TabContent>
          
  
          </div>
        </Tabs>
      </div>
  
    )
  }
  

const MonacoEditorTraining = () => {
  const [code, setCode] = useState('console.log("Hello, world!");');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const editorRef = useRef(null);

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    console.log('Editor mounted');
  };

  const executeCode = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      setConsoleOutput('');
      setTerminalOutput('');

      try {
        const originalConsoleLog = console.log;
        const consoleOutputLines = [];
        console.log = (...args) => {
          consoleOutputLines.push(...args);
          originalConsoleLog(...args);
        };

        eval(code);
        toast.push(
          <Notification title={'Code is perfect'} type="success">
              Code successfuly executed
          </Notification>,{
                placement: 'top-center',
            }
      )

        setConsoleOutput(consoleOutputLines.join('\n'));
      } catch (error) {
        console.error(error);
        toast.push(
          <Notification title={'Please view the cosole'} type="danger">
              Ask the tutor your errors
          </Notification>,{
                placement: 'top-center',
            }
      )
        setConsoleOutput(error.toString());
      }
    }
  };

  const handleFileCreate = (file) => {
    setCode(file.content);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <div>
      {code ? (
        <div
        className={classNames(
       
          'chat-container',
          'overflow-y-auto',
          'max-h-99', // Adjust the max-h value as needed
        )}>
          
              {/* <button onClick={executeCode}>Execute</button> */}
              <Button onClick={executeCode}  variant="twoTone"  >
                    Execute
                </Button>
         

          <div className="flex">
            {/* <div className="w-1/4">
             <Tree/>
            </div> */}
            <div className="w-full">
              <MonacoEditor
                width="600"
                height="400"
                language="javascript"
                theme="vs-dark"
                value={code}
                options={options}
                editorDidMount={editorDidMount}
              />
            </div>
          </div>

          

         <Pill consoleOut={consoleOutput}/>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MonacoEditorTraining;
