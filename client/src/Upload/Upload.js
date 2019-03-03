import React, { Component } from 'react';

class Upload extends Component {
  state = {
    name: '',
    imageUrl: '',
  };
  render() {
    return (
      <div className="upload">
        <h2>Upload</h2>
      </div>
    );
  }
}

export default Upload;
