import {Stack} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import * as React from 'react';

const ImageButton = styled(ButtonBase)(({theme}) => ({
  position: 'relative',
  height: 100,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({theme}) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({theme}) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({theme}) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function DownloadRow(props) {
  const {fileURLs} = props;
  const images = [
    {
      url: 'https://www.rollingstone.com/wp-content/uploads/2020/06/10-Robbie-Shakespeare.jpg?w=800',
      title: 'Bass',
      width: '25%',
      ref: fileURLs.bass, // Substituted with the link given back by the API
    },
    {
      url: 'https://ledgernote.com/wp-content/uploads/2020/04/keith-moon.jpg',
      title: 'Drums',
      width: '25%',
      ref: fileURLs.drums,
    },
    {
      url: 'https://images.unsplash.com/photo-1623517272043-cae1572afc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2luZ2luZ3xlbnwwfHwwfHw%3D&w=1000&q=80',
      title: 'Vocals',
      width: '25%',
      ref: fileURLs.vocals,
    },
    {
      url: 'https://www.popsci.com/uploads/2021/07/27/pawel-czerwinski-eybM9n4yrpE-unsplash-1536x1024.jpg',
      title: 'Other',
      width: '25%',
      ref: fileURLs.other,
    },
  ];

  return (
    <Stack direction="row" spacing={2} p={2}>
      {images.map((image) => (
        <ImageButton focusRipple key={image.title} style={{width: image.width}} href={image.ref} target="_blank">
          <ImageSrc style={{backgroundImage: `url(${image.url})`}} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography component="span" variant="subtitle1" color="inherit" sx={{position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`}}>
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Stack>
  );
}
