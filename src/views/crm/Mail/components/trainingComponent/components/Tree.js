import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

const Tree = () => {
  const [treeData, setTreeData] = useState([{ title: 'src/', children: [{ title: 'index.js' }] }]);

  const handleTreeDataChange = (newTreeData) => {
    setTreeData(newTreeData);
  };

  return (
    <div style={{ height: 400 }}>
      <SortableTree
        treeData={treeData}
        onChange={handleTreeDataChange}
        theme={FileExplorerTheme}
      />
    </div>
  );
};

export default Tree;
