import CheckIcon from '@mui/icons-material/Check';
import {Box, Fab, LinearProgress, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import DownloadRow from '../../components/DownloadRow';
import FileUploadBox from '../../components/FileUploadBox';
import Header from '../../components/Header';

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function FrontPage() {
  const [fileURLs, setFileURLs] = useState();
  const [waiting, setWaiting] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    try {
      setFileURLs(undefined);
      let response;

      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      response = await axios.postForm('http://104.196.23.184/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (response.status !== 200 || !response.data.success) {
        toast.error('Failed to upload file');
        return;
      }
      toast.success('File uploaded successfully!');
      const taskId = response.data.taskId;

      response = null;
      do {
        response = await axios.get('http://104.196.23.184/api/task/' + taskId);
        console.log(response);
        setWaiting(true);
        await delay(5000);
      } while (!response || response.data.status != 'COMPLETED');

      setWaiting(false);
      const [bass, drums, other, vocals] = response.data.downloadLinks;
      const fileURLs = {bass, drums, other, vocals};
      setFileURLs(fileURLs);
    } catch (error) {
      // toast.error('Failed to upload file (catch)');
      // return;
      throw error;
    }
  };

  return (
    <div>
      <Header />
      <FileUploadBox handleDrop={handleDrop} />
      {waiting && (
        <Stack sx={{backgroundColor: 'white', padding: '5rem'}} spacing={2}>
          <LinearProgress color="success" />
          <Typography sx={{color: 'black'}}>Separation in progress. Please wait...</Typography>
          <Typography sx={{color: 'gray'}}>
            The wait time can range from half of a minute to a couple of minutes, depending on the size of the uploaded audio file. A typical MP3 file of 30 seconds takes around 3 minutes for the neural network to complete the separation.
          </Typography>
        </Stack>
      )}
      {fileURLs && (
        <>
          <Stack color="primary" alignItems="center" justifyContent="center" spacing={2}>
            <Stack spacing={2} direction="row" flex={1} alignItems="center" justifyContent="center">
              <Stack sx={{backgroundColor: 'green', padding: '0.5rem', borderRadius: '2rem'}} color="white">
                <CheckIcon />
              </Stack>
              <Typography sx={{color: 'black'}}>Your files are ready!</Typography>
            </Stack>
            <Typography sx={{color: 'gray'}}>Click one of the buttons below for the corresponding separated part.</Typography>
          </Stack>
          <DownloadRow fileURLs={fileURLs} />
        </>
      )}
    </div>
  );
}
