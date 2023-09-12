import "./login.css";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Login() {
     const email=useRef();
     const password=useRef();
     const {user,isFetching,error,dispatch}=useContext(AuthContext);   //fetching fro the authreducer file 

     const handleClick =(e)=>{
      e.preventDefault();
        
        loginCall({email: email.current.value,password : password.current.value},dispatch)       //userCredentials  email,password
     }
    //  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo"> SocialMedia</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on <b className="social">SocialMedia</b>.
          </span>
        </div>
        <form className="loginRight" onSubmit={handleClick} >
          <div className="loginBox">
            <input placeholder="Email" type='email' required  className="loginInput"  ref={email} />
            <input placeholder="Password" type="password" required  minLength="6" className="loginInput" ref={password}  />
            <button className="loginButton" type="sumbit" disabled={isFetching}>{isFetching ?<CircularProgress  color="primary" size="25px" />  :"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching ?<CircularProgress  color="primary" size="25px" />  :"Create a New Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}