import React from 'react';

const ElegantText = ({ content, keywords, onKeywordClick }) => {
  const highlightKeywords = (text, keywords) => {
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    return text.replace(regex, (match) => `<span class="text-grey-100 font-bold keyword" data-keyword="${match}" onMouseEnter="event.target.style.cursor = 'pointer'" >${match}</span>`);
  };

  const handleKeywordClick = (event) => {
    const keyword = event.target.dataset.keyword;
  //  console.log("keywors==="+keyword);
    onKeywordClick(keyword);
  };

  

  const formattedText = highlightKeywords(content, keywords);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose" onClick={handleKeywordClick}>
        <div dangerouslySetInnerHTML={{ __html: formattedText }}></div>
      </div>
    </div>
  );
};

export default ElegantText;
