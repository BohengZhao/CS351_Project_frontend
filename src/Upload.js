import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './UploadMP3.css';


const UploadMP3 = () => {
  const handleDrop = async (acceptedFiles) => {
    try {
      console.log(acceptedFiles[0]);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('type', 'file');
      formData.append('id', 'file');
      formData.append('name', 'file');
      console.log(formData);

      /*const response = await axios.postForm('http://104.196.23.184/api/upload', formData, {
        headers: formData.getHeaders()}
      );*/

      const response = await axios.post('http://104.196.23.184/api/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      if (response.status === 200) {
        toast.success('File uploaded successfully!');
      } else {
        toast.error('Failed to upload file');
      }
    } catch (error) {
      toast.error('Failed to upload file (catch)');
    }
  };

  return (
    <div className="upload-mp3-container">
      <h1 className="upload-mp3-title">Upload an MP3 File</h1>
      <Dropzone onDrop={handleDrop} accept=".mp3" multiple={false}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? "Drop that file!" : "Click me or drag a file to upload!"}
          </div>
        )}
      </Dropzone>
      <ToastContainer />
    </div>
  );
};

export default UploadMP3;
