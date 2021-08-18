import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../../../features/userSlice';
import './SingleComment.css';

const SingleComment = ({postComment: {id, data: 
  { postid, comment, name, photoUrl, description}}}) => {
 const user = useSelector(selectUser);
 // console.log('comment', data)
 return (
  <div className="comment">
    <Avatar src={photoUrl && photoUrl} >{name && name}</Avatar>
    <div className="comment__info">
      <h2>
        {name && name}<br/>
        <small>{description && description}</small>
      </h2>
      <p>{comment && comment}</p>
    </div>
  </div>
 )
}

export default SingleComment
