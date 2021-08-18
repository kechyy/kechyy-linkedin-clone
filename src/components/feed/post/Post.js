import React , { forwardRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import InputOption from '../inputOption';
import SingleComment from '../../comment/singleComment';
import CommentInput from '../../comment/commentInput';
import { selectComment } from '../../../features/commentSlice';
import { db } from '../../../firebase';
import './Post.css';


const Post = forwardRef(({ id, name, description, message, photoUrl, postPhotoUrl, fileType},ref) =>  {

  const commentInput = useSelector(selectComment);
  const [comments, setComments] = useState('');

  useEffect(() => {
    db.collection("comments")
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) =>
      setComments(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
 }, []);
  
  return (
  <div ref={ref}  className="post">
    <div className="post__header">
     <Avatar src={photoUrl} >{name && name[0]}</Avatar>
      <div className="post__info">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
     </div> 
      <div className="post__body">
         <p>{message}</p>
        { postPhotoUrl.type[0] === 'image' && <img src={postPhotoUrl?.url} alt=""/> }
        { postPhotoUrl.type[0] === 'video' && <video type={fileType} src={postPhotoUrl?.url} alt="" controls="controls" /> }
    </div>
      <div className="post__buttons">
        <InputOption
          Icon={ThumbUpAltOutlinedIcon} 
          title="Like"
          color="gray"
        />
        <InputOption
          id={id}
          Icon={ChatOutlinedIcon} 
          title="Comment"
          color="gray"
        />
        <InputOption
          Icon={ShareOutlinedIcon} 
          title="Share"
          color="gray"
        />
        <InputOption
          Icon={SendOutlinedIcon} 
          title="Send"
          color="gray"
        />
      </div>
    { (commentInput?.open && commentInput?.id == id) 
      && <CommentInput id={id} /> 
    }
    { comments && comments.map(comment => 
      comment.data.postid == id 
      && <SingleComment postComment={comment} />)
    }
  </div>
 )
})

export default Post
