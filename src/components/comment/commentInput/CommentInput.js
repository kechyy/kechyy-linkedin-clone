import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import './CommentInput.css';
import CreateIcon from '@material-ui/icons/Create';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../../../features/userSlice';
import { db } from '../../../firebase';

function CommentInput({id}) {

 const [input, setInput] = useState('');
 const user = useSelector(selectUser);

 const handleComment = (e) => {
   e.preventDefault();

   if(!input) {
     return;
   }
   db.collection("comments").add({
      postid: id,
      comment: input,
      description: user?.email,
      name: user?.displayName,
      photoUrl: user?.photoUrl || '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(data => {
        setInput('');
      })
      .catch(err => {
        console.error('error adding comment: ', err)
    })

 }

 return (
  <div className="commentInput">
     <Avatar src={user?.photoUrl} className="commentInput__avatar" />
     <div className="commentInput__input">
       <CreateIcon />
       <form>
         <input value={input} 
         onChange={(e) => setInput(e.target.value)} 
         type="text"
         placeholder="Add a comment"
       />
         <button type="submit" onClick={handleComment}>Send</button>
       </form>
     </div>
  </div>
 )
}

export default CommentInput
