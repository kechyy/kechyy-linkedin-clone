import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { db } from '../../firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Dialog, makeStyles, LinearProgress } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { selectUser } from '../../features/userSlice';
import { dialog } from '../../features/dialogSlice';
import { storage } from '../../firebase';
import './FormDialog.css';


const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    top: 10,
    
  },
});

export default function FormDialog({open}) {


  const [image, setImage] = useState('');
  const user = useSelector(selectUser);
  // const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
   const classes = useStyles();

  const handleClose = () => {
    dispatch(dialog(false));
    setImage('')
  };


 const handleFileChange = (e) => {
    if(e.target.files[0]) {
        setImage(e.target.files[0])
    }
  }
  const handleFileUpload = () => {
    if(!(image?.name)) {
      return;
    }
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
              message: '',
              photoUrl: user?.photoUrl || '',
              postPhotoUrl: url,
              fileType: image.type || '',
              fileName: image.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setUrl(url);
            setImage('');
            handleClose();
          })
      }
    )
  }
  console.log("image :", image)
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
        <DialogTitle id="form-dialog-title">Edit your photo/video</DialogTitle>
        <DialogContent>
          { url ? <img src={url} width="100%"/> : (<React.Fragment> 
            { !!progress && <LinearProgress variant="determinate" value={progress} /> }
            <input type="file" onChange={handleFileChange} className="form-dialog__custom-file-input" />
                <DialogContentText>
                  {image.name}
                </DialogContentText> 
            </React.Fragment>) 
          }
        </DialogContent>
        <DialogActions className="dialogActions">
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFileUpload} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}