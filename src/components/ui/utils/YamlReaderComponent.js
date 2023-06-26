import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
//import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { SyntaxHighlighter } from 'components/shared'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import yamlData from 'assets/livecodedata/websocketcode.yaml';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const YamlReaderComponent = () => {
  const [parsedYamlData, setParsedYamlData] = useState('');

  useEffect(() => {
    const parseYamlData = async () => {
      try {
        const parsedYaml = yaml.load(yamlData);
       const response = await fetch(parsedYaml);
        const yamlContent = await response.text();
       
        
        console.log("Content==="+yaml.load(yamlContent).code);
      //  console.log(parsedYaml);
       setParsedYamlData(yaml.load(yamlContent).code)
        console.log(parsedYamlData);
      } catch (error) {
        console.error('Error loading YAML file:', error);
      }
    };

    parseYamlData();
  }, []);

  return (
  
      <SyntaxHighlighter language="jsx">
        {parsedYamlData}
      </SyntaxHighlighter>

  );
};

export default YamlReaderComponent;
