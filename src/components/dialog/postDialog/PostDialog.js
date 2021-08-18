import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';

import Button from '@material-ui/core/Button';
import { Dialog, makeStyles, LinearProgress } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import YouTubeIcon from '@material-ui/icons/YouTube';
import NoteIcon from '@material-ui/icons/Note';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import BarChartIcon from '@material-ui/icons/BarChart';
import { selectUser } from '../../../features/userSlice';
import { dialog } from '../../../features/dialogSlice';
import { storage, db } from '../../../firebase';
import './PostDialog.css';


const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    top: 10, 
    borderRadius: '20px'
  },
});

export default function PostDialog({open}) {

  const [image, setImage] = useState('');
  const [input, setInput] = useState('');
  const user = useSelector(selectUser);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
   const classes = useStyles();

  const handleClose = () => {
    dispatch(dialog({
     formDialog: false,
     postDialog: false
    }));
    setImage('')
    setInput('')
  };


 const handleFileChange = (e) => {
    
    if(e.target.files[0]) {
        setImage(e.target.files[0])
    }
  }
  const handlePost = () => {
    if(!input) {
      return
    }

    if(!(image.name)) {
      db.collection("posts").add({
        name: user?.displayName,
        description: user?.email,
        message: input,
        photoUrl: user?.photoUrl || '',
        postPhotoUrl: '',
        fileType: image?.type || '',
        fileName: image?.name || '',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
        setImage('');
        setInput('')
        handleClose();    
    } else {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log('url', url)
              db.collection("posts").add({
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user?.photoUrl || '',
                postPhotoUrl: url,
                fileType: image.type || '',
                fileName: image.name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              });
              setImage('');
              setInput('')
              handleClose();
            })
        }
      )
    }
  }

  return (
    <div>
      <Dialog
        classes={{
          paper: classes.dialog
        }}
        open={open} 
        onClose={handleClose}
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"><strong>Create a post</strong></DialogTitle>
        <DialogContent>
          <div className="post__profile">
             <Avatar src={user?.photoUrl} >{user?.name}</Avatar>
             <div className="post_profileName">
               <h3>{user?.displayName}</h3>
            </div>
          </div>
          <div className="post__profileInput">
            <input type="text" 
              placeholder="What do you want to talk about?"
              onChange={(e) => setInput(e.target.value)} 
            />
          </div>
          {image && image.name}
        </DialogContent>
        <DialogActions>
          <div className="postInputIcons">
            <Button
              variant="contained"
              component="label"
            >
              <ImageIcon />
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <YouTubeIcon />
            <NoteIcon />
            <BusinessCenterIcon />
            <BarChartIcon />
          </div>
          <Button 
            onClick={handlePost} 
            color="primary"    
            className="post__button"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}