import React from 'react';
import { useSelector } from 'react-redux';
import './HeaderOption.css';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../../../features/userSlice';

function HeaderOption({avatar, Icon, title, OptionalIcon, onClick }) {
  
  const user = useSelector(selectUser);

  return (
  <div onClick={onClick} className="headerOption">
     { Icon && <Icon className="headerOption__icon" />}
     { avatar && (
       <Avatar className="headerOption__icon" src={user?.photoUrl} />
     )}
     <div className="headerOption__title">
       <h3>{title}</h3>
       { OptionalIcon && <OptionalIcon className="header__optionalIcon" />}
     </div>
  </div>
 )
}

export default HeaderOption
