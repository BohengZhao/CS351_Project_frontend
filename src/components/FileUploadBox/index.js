import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './FileUploadBox.css';

const ACCEPTABLE_FORMAT = {
  'audio/mp3': ['.mp3', '.MP3'],
};

export default function FileUploadBox(props) {
  const {handleDrop} = props;

  return (
    <div className="upload-mp3-container">
      <h1 className="upload-mp3-title">Upload an MP3 File</h1>
      <Dropzone onDrop={handleDrop} accept={ACCEPTABLE_FORMAT} multiple={false}>
        {({getRootProps, getInputProps, isDragActive}) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? 'Drop that file!' : 'Click me or drag a file to upload!'}
          </div>
        )}
      </Dropzone>
      <ToastContainer />
    </div>
  );
}
