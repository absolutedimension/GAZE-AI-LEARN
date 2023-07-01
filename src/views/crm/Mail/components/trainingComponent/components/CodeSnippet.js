import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy } from 'react-icons/fi';

export const CodeSnippet = ({ language, code }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '4px',
          background: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {language}
      </div>
      <button
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '4px',
          background: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={copyCode}
      >
        <FiCopy />
      </button>
      <SyntaxHighlighter language={language} style={materialDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};


