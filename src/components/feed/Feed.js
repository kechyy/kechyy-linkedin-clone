import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FlipMove from 'react-flip-move';

import { db } from '../../firebase';

import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import { selectUser } from '../../features/userSlice';
import { selectDialog, dialog } from '../../features/dialogSlice';
import { Avatar } from '@material-ui/core';
import  {FormDialog, PostDialog} from '../dialog';


import Post from './post';
import InputOption from './inputOption';
import './Feed.css';


function Feed() {

 const [posts, setPosts] = useState([]);

 const user = useSelector(selectUser);
 const status = useSelector(selectDialog);
 const dispatch = useDispatch();
 console.log('status', status)

 useEffect(() => {
  db.collection("posts")
  .orderBy('timestamp', 'desc')
  .onSnapshot((snapshot) =>
    setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    )
  );
 }, []);

 const handleDialog = () => {
  dispatch(dialog({
    formDialog: false,
    postDialog: true
  }))
 }

 return (
  <div className="feed">
    <div className="feed__inputContainer">
      <div className="feed__content">
        <Avatar src={user?.photoUrl} className="feed__avatar" />
        <div className="feed__input" onClick={handleDialog}>
          <CreateIcon />
          <strong>Start a post</strong>
        </div>
      </div>
      
      <div className="feed__inputOptions">
        {/* InputOpitons */}
        <InputOption  
          Icon={ImageIcon} 
          title="Photo" 
          color="#70B5F9" 
        />
        <InputOption  
          Icon={SubscriptionsIcon} 
          title="Video" 
          color="#E7A33E" 
        />
        <InputOption  
          Icon={EventNoteIcon} 
          title="Event" 
          color="#C0CBCD" 
        />
        <InputOption  
          Icon={CalendarViewDayIcon} 
          title="Write article" 
          color="#7FC15E" 
        />
      </div>
    </div>
    {/* Posts */}

    <FlipMove>
      { posts.map(({id, data: 
      { name, description, message, photoUrl, postPhotoUrl, fileType }}, i) => 
      {
        console.log('fileType', fileType)
        const type = fileType ? fileType.split('/'): '';

        return <Post
                key={id} 
                id={id}
                name={name} 
                description={description}
                message={message}
                photoUrl={photoUrl}
                postPhotoUrl={{url: postPhotoUrl, type: type, fileType}}
              />
        })}
    </FlipMove>
    <FormDialog open={status?.formDialog} />
    <PostDialog open={status?.postDialog} />
  </div>
 )
}

export default Feed
