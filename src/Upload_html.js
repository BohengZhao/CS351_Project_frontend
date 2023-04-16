import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import './UploadMP3.css';


const UploadMP3_html = () => {
  return (
    <div>
      <h1>Upload an MP3 File</h1>
    <form action="http://104.196.23.184/api/upload" method="post" enctype="multipart/form-data">
        <label for="file">Choose an MP3 file:</label>
        <input type="file" id="file" name="file" accept=".mp3" />
        <br></br>
        <input type="submit" value="Upload" />
    </form>
    </div>
  );
};

export default UploadMP3_html;
