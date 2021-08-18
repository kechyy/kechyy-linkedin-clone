import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../../../firebase'
import './Login.css';
import { login } from '../../../features/userSlice';

function Login() {

const [email, setEmail] = useState('');
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [profilePic, setProfilePic] = useState('');
const dispatch = useDispatch();
 const history = useHistory();
 const emailRef = useRef();
 const errorRef = useRef();

 const handleGoogleLogin = (e) => {
   e.preventDefault()
   auth.signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      const userAuth = {
         email: user.email,
         uid: user.uid,
         displayName: user.displayName,
         photoUrl: user.photoURL  
       }
      localStorage.setItem('user', userAuth)
      dispatch(login(userAuth))
       history.push('/feed');
      
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
 }

  const loginToApp = (e) => {
  e.preventDefault();
  if(!email) {
    emailRef.current.style.border = '1px solid red';
  }
  auth.signInWithEmailAndPassword(email, password)
  .then(userAuth => {
    const user = {
      email: userAuth.user.email,
      uid: userAuth.user.uid,
      displayName: userAuth.user.displayName,
      profileUrl: userAuth.user.photoURL,
    }
    localStorage.setItem('user', user)
    dispatch(login(user));
    history.push('/feed');
  }).catch(error => alert(error));
 }

 

 return (
  <div className="login">
    <div className="login__container">
          <img src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks" alt=""/>

        <form>
          <h1>Signin</h1>
          <p>Stay updated on your professional world</p>
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} placeholder="Email or Phone" 
            type="email"
            ref={emailRef}
          /><span ref={errorRef}></span>

          <input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}  placeholder="Password" 
            type="password"
          />
          <p className="login__password">Forgot password?</p>

          <button type="submit" onClick={loginToApp}>Sign in</button>
          <div className="login__option">
           <span></span>
           <span>or</span>
           <span></span>
         </div>
          <button type="submit" onClick={handleGoogleLogin}
            className=" login__join login__joinWithGoogle"
          >
              <div>
              <img  src="https://symbols.getvecta.com/stencil_82/45_google-icon.d8d982f8a1.svg" alt="" />
              <p>Login with Google</p>
            </div>
          </button>
        </form>

          <p>New to Linkedin?{" "}
            <Link to="/signup" className="login__register">Join Now</Link>
          </p>
      </div>
    </div>
    
 )
}

export default Login
