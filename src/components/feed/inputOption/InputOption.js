import React from 'react';
import { useDispatch } from 'react-redux';
import { dialog } from '../../../features/dialogSlice';
import { comment } from '../../../features/commentSlice';
import './InputOption.css';

function InputOption({id, Icon, title, color }) {

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(dialog({
      formDialog: true,
      postDialog: false
    }));
  };

  const handleCommentStatus = () => {
    dispatch(comment({
      open: true,
      id: id ? id : 0
    }));
  };

 return (
  <div className="inputOption" 
    onClick={(title === 'Photo' || title === 'Video') ? handleClickOpen : 
    title ==='Comment' ? handleCommentStatus: null}>
    <Icon style={{ color: color}} />
    <h4>{title}  </h4>
  </div>
 )
}

export default InputOption
