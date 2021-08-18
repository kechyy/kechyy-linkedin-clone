import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated, login, logout } from '../../features/userSlice';
import './Profile.css';
import Header from '../header';
import Sidebar from '../sidebar';
import Feed from '../feed';
import Widgets from '../widgets';

const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const user1 = useSelector(selectIsAuthenticated);
   console.log('selectIsAuthenticated', user1)

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
    
      if(userAuth) {
        console.log('userAuth???', userAuth?.displayName)
        // user is logged in
        dispatch(login({
          email: userAuth?.email,
          uid: userAuth.uid,
          displayName: userAuth?.displayName,
          photoUrl: userAuth?.photoURL,  
        }));
      }else {
        // user is logged out
        dispatch(logout())
      }
    });
  }, []);

 return (
  <div className="profile">
     {/* Header */}
     <Header />
     <React.Fragment>
        <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '10px'}}>
          <a href="" className="profile__ad">
            <span>Grow your skills</span> - Unlock free access to 16,000+ expert-led courses for one month Ad ... 
          </a> 
        </div>
        <main className="profile__body">
            <Sidebar />
            <Feed />
            {/* Widget */}
            <Widgets />
        </main>
     </React.Fragment>
   </div>
 )
}

export default Profile
