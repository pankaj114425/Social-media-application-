import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {useNavigate} from 'react-router';
export default function Register() {

  const username=useRef();
  const password=useRef();
  const email=useRef();
  const passwordagain=useRef();
 const navigate=useNavigate();

  const handleClick =async(e)=>{
    e.preventDefault();
     if(passwordagain.current.value !== password.current.value){
      passwordagain.current.setCustomValidity("Password don't matched ")
     }else{
        const user={
          username:username.current.value,
          email:email.current.value,
          password:password.current.value
        }
        try {
          await axios.post("/auth/register",user);   //if every thing is correct redirect to login page 
          navigate('/login');
          
        } catch (error) {
            console.log(error)
        }
        
     }
   }
  
  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="registerLogo">Welcome On SocialMedia</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on SocialMedia.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required className="loginInput"  ref={username} />
            <input placeholder="Email" required className="loginInput" ref={email} type="email" />
            <input placeholder="Password" required className="loginInput" ref={password} type="password" min='6'/>
            <input placeholder="Password Again" required className="loginInput" ref={passwordagain} type="password" />
            <button className="loginButton" type="sumbit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}