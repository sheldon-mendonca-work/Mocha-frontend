import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import {  useNavigate } from "react-router";
import './Login.css';
import PasswordInput from "../../Util/PasswordInput/PasswordInput";
import TextInput from "../../Util/TextInput/TextInput";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";

const initLoginState = {
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: ""
};

const Login = () => {

    const { authState,  emailUserLoginFunction, phoneUserLoginFunction, testUserLogin } = useContext(AuthContext);
    const [ showEmail, setShowEmail ] = useState(true);
    const [ loginInput, setLoginInput ] = useState(initLoginState);
    const { showNotif } = useContext(NotificationContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(authState.isLoggedIn){
            navigate('/');
        }// eslint-disable-next-line
    }, [])

    const emailChangeHandler = (event) => {
        setLoginInput(prevState => ({...prevState, email: event.target.value}));
    }

    const passwordChangeHandler = (event) => {
        setLoginInput(prevState => ({...prevState, password: event.target.value}));
    }

    const phoneNumberChangeHandler = (event) => {
        setLoginInput(prevState => ({...prevState, phoneNumber: event.target.value}));
    }

    const dateOfBirthChangeHandler = (event) => {
        setLoginInput(prevState => ({...prevState, dateOfBirth: event.target.value}));
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        
        const emailInputValue = loginInput.email.trim();
        const passwordInputValue = loginInput.password.trim();
        const phoneInputValue = loginInput.phoneNumber.trim();
        const dobInputValue = loginInput.dateOfBirth.trim();

        if(emailInputValue.length > 0 && passwordInputValue.length > 0){
            const res = await emailUserLoginFunction({email: emailInputValue, password: passwordInputValue})
            if(!res){
                showNotif('Error', "Login Failed");
                return;
            }else{
                showNotif('Success', "Login Successful");
                setLoginInput(initLoginState);
            }
        }else if(phoneInputValue.length > 0 && dobInputValue.length > 0){
            const res = await phoneUserLoginFunction({phNo: phoneInputValue, dateOfBirth: dobInputValue})
            if(res){
                setLoginInput(initLoginState);
            }
        }else{
            showNotif('Error', "Login Details are incomplete");
        }
        return;
    }


    return <div className="loginPage">
        <div className="login-main">
            <h2>Login</h2>
            <div className="login-heading">
                <div className={`login-button ${showEmail ? "login-active": ""}`} onClick={()=> setShowEmail(true)}>Email</div>
                <div className={`login-button ${showEmail ? "": "login-active"}` } onClick={()=> setShowEmail(false)}>Phone</div>
            </div>
            <form className="login-form" onSubmit={formSubmitHandler}>
                <span className="login-form-span">
                    <div className={`login-input-div  ${showEmail ? "login-input-left": "login-input-right"}`}>
                        <TextInput type="email" id="login-email" placeholder="User Email" value={loginInput.email} onChange={emailChangeHandler} className="login-input"/>
                        <PasswordInput id="login-password" placeholder="User Password" value={loginInput.password} onChange={passwordChangeHandler}  className="login-input formGroupInput" />
                    </div>
                    <div className={`login-input-div  ${showEmail ? "login-input-left": "login-input-right"}`}>
                        <TextInput type="tel" placeholder="Phone Number*" pattern="[0-9]{10}" value={loginInput.phoneNumber} onChange={phoneNumberChangeHandler} className="login-input"/>
                        <TextInput type="date" value={loginInput.dateOfBirth} onChange={dateOfBirthChangeHandler} className="login-input"/>
                    </div>
                </span>
                <button type="submit" className="login-submit login-btn">Log In</button>
            </form>
            
            <button onClick={()=>{testUserLogin()}} className="login-submit">Guest Login</button>
            <button onClick={()=>{navigate('/signup')}} className="login-signup">Don't have an account? Sign Up!</button>
        </div>
    </div>
};

export default Login;