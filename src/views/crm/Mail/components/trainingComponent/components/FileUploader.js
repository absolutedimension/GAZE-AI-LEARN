import React from 'react';

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileContent: '',
    };
  }

  handleFileNameChange(event) {
    this.setState({ fileName: event.target.value });
  }

  handleFileContentChange(event) {
    this.setState({ fileContent: event.target.value });
  }

  handleCreateFile() {
    const { fileName, fileContent } = this.state;
    if (fileName && fileContent) {
      const file = {
        name: fileName,
        content: fileContent,
      };
      this.props.onFileCreate(file); // Pass the created file to the parent component
      this.setState({ fileName: '', fileContent: '' });
    }
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="File name" value={this.state.fileName} onChange={(e) => this.handleFileNameChange(e)} />
        </div>
        <div>
          <textarea placeholder="File content" value={this.state.fileContent} onChange={(e) => this.handleFileContentChange(e)} />
        </div>
        <div>
          <button onClick={() => this.handleCreateFile()}>Create File</button>
        </div>
      </div>
    );
  }
}

export default FileUploader;
