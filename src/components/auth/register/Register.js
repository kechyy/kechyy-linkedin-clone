import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../../../firebase';
import { login } from '../../../features/userSlice';
import './Register.css';

function Register() {


 const [email, setEmail] = useState('');
 const [name, setName] = useState('');
 const [password, setPassword] = useState('');
 const [profilePic, setProfilePic] = useState('');
 const dispatch = useDispatch();
 const history = useHistory();



 const register = () => {
   if(!name) {
     return alert("Please enter a full name!")
   }

   auth.createUserWithEmailAndPassword(email, password)
   .then((userAuth) => 
     userAuth.user.updateProfile({
       displayName: name,
       photoURL: profilePic,
     })
     .then(() => {
      const user = {
         email: userAuth.user.email,
         uid: userAuth?.user.uid,
         displayName: name,
         photoUrl: profilePic   
       }
       localStorage.setItem('user', user)
       dispatch(login(user));
       history.push('/feed');
       
     })
   ).catch(error => alert(error));
 }

 const handleGoogleLogin = () => {
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
 return (
   <div className="register">
     <div className="register__container">
       <img src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks" alt=""/>
       <h1> Make the most of your professional life </h1>
       <div className="register__form">
         <form>

           <div className="register__formGroup">
             <label htmlFor="name">Fullname</label>
             <input 
               type="text" 
               id="name" 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
            />
           </div>

           <div className="register__formGroup">
             <label htmlFor="email">Email</label>
             <input 
             type="text" 
             id="email"
             value={email} 
             onChange={(e) => setEmail(e.target.value)}
             />
           </div>

           <div className="register__formGroup">
             <label htmlFor="email">Password (6 or more characters)</label>
             <input
               type="password"
               id="password"
               value={password} 
               onChange={(e) => setPassword(e.target.value)}  
             />
           </div>
         </form> 
         <p>
            By clicking Agree & Join, you agree to the LinkedIn <span>User<br/> 
            Agreement, Privacy Policy, and Cookie Policy.</span>
         </p>
         
          <button type="submit"  onClick={register} className="register__join">
           Agree & Join
         </button>

         <div className="register__option">
           <span></span>
           <span>or</span>
           <span></span>
         </div>

          <button type="submit" onClick={handleGoogleLogin}
            className=" register__join register__joinWithGoogle"
          >
           <div>
             <img  src="https://symbols.getvecta.com/stencil_82/45_google-icon.d8d982f8a1.svg" alt="" />
             <p>Join with Google</p>
           </div>
         </button>

         <p className="register__member">
           Already on LinkedIn? <Link to="/login" className="register__login">Sign in</Link>
          </p>
       </div>
     </div>
   </div>
   )
 }

export default Register
