import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import HeaderOption from './headerOption'; 
import { auth } from '../../firebase';
import { selectUser, logout } from '../../features/userSlice';
import { useHistory } from 'react-router-dom';

function Header() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory()

  const logoutOfApp = () => {
    localStorage.removeItem('user');
    dispatch(logout())
    auth.signOut();
    history.push('/login')
  }
  return (
    <header className="header">
      <div className="header__body">
        <div className="header__left">
          <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="Linkedin Icon"/>

          <div className="header__search">
            <SearchIcon className="header__searchIcon" />
            <input type="text" placeholder="Search"/>
          </div>
        </div>
        <div className="header__right">
          <div className="header__OptionLeft">
             <HeaderOption 
                Icon={HomeIcon} 
                title="Home" 
              />

              <HeaderOption 
                Icon={SupervisorAccountIcon} 
                title="My Network" 
              />

              <HeaderOption 
                Icon={BusinessCenterIcon} 
                title="Jobs" 
              />
              <HeaderOption 
                Icon={ChatIcon } 
                title="Messaging" 
              />
          </div>
          <div className="header__OptionRight">
              <HeaderOption 
                Icon={NotificationsIcon} 
                title="Notifications" 
              />

              <HeaderOption
                avatar ="true"
                title="Me"
                OptionalIcon={ArrowDropDownIcon}
                onClick={logoutOfApp}
              />

              <HeaderOption
                Icon={AppsIcon}
                title="Work"
                OptionalIcon={ArrowDropDownIcon}
                onClick={logoutOfApp}
              />
              <p className="header__premium">
                Try Premium for <br/>free
              </p>
            </div>
        </div>

      </div>

          </header>
  )
}

export default Header
