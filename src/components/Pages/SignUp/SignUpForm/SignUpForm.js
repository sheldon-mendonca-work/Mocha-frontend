/*

Signup is divided into 2 parts:
    1. SignUp form (this page)
    2. Bio Form ()

*/

import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../../../hooks/Contexts/AuthContext";
import { useNavigate } from "react-router";
import '../SignUp.css';
import TextInput from "../../../Util/TextInput/TextInput";
import { NotificationContext } from "../../../../hooks/Contexts/NotificationContext";
import PasswordInput from "../../../Util/PasswordInput/PasswordInput";
import Footer from "../../../Layouts/Footer/Footer";


const SignUpForm = () => {

    const { authState, dispatchAuth, checkUniqueUsername } = useContext(AuthContext);
    const [ showEmail, setShowEmail ] = useState(true);
    const { showNotif } = useContext(NotificationContext);
    const [ userInputs , setUserInputs ] = useState({
        displayName: "",
        username: "",
        email: "",
        userPassword: "",
        phNo: "",
        dateOfBirth: "",
    })

    const navigate = useNavigate();

    useEffect(()=>{
        if(authState.isLoggedIn){
            navigate('/');
        }// eslint-disable-next-line
    }, []);

    
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        let { displayName, username, email, userPassword, phNo, dateOfBirth } = userInputs;
        displayName = displayName.trim(); username = username.trim(); email = email.trim(); userPassword = userPassword.trim(); phNo = phNo.trim();
        
        const usernameIsUnique = await checkUniqueUsername(username, userPassword, email, phNo);

        if(usernameIsUnique){
            if((email.length > 0 && userPassword.length > 0) 
            || 
            (phNo.length > 0 && dateOfBirth.length > 0))
            {
                dispatchAuth({type: 'SET_SIGNUP_FORM_VALUE', value: {
                    displayName, username, email, userPassword, phNo, dateOfBirth,
                }});
    
                navigate('/bioform');
            }else{
                showNotif('Error', "Looks like one of email/password or phone/date of birth is missing.");
                return;
            }
        }else{
            showNotif('Error', 'Username / Password is not unique');
            return;
        }

    }

    return <div className="signupPage">
        <div className="signup-main">
            <p>Step 1 of 2</p>
            <h2>SignUpForm</h2>
            <div className="signup-heading">
                <div className={`signup-button ${showEmail ? "signup-active": ""}`} onClick={()=> setShowEmail(true)}>Via Email</div>
                <div className={`signup-button ${showEmail ? "": "signup-active"}` } onClick={()=> setShowEmail(false)}>Via Phone</div>
            </div>
            <form className="signup-form" onSubmit={formSubmitHandler}>
                <div>
                    <TextInput type="text" placeholder="Display Name" maxLength="50" value={userInputs.displayName} onChange={(event) => {setUserInputs((prevState) => ({...prevState,displayName: event.target.value}))}} required />
                    <TextInput type="text" placeholder="User Name" maxLength="50" value={userInputs.username} onChange={(event) => {setUserInputs((prevState) => ({...prevState, username: event.target.value}))}} required />
                </div>
                <span className="login-form-span">
                    <div className={`login-input-div  ${showEmail ? "login-input-left": "login-input-right"}`}>
                        <TextInput type="email" placeholder="User Email" value={userInputs.email} onChange={(event) => {setUserInputs((prevState) => ({...prevState,email: event.target.value}))}} />
                        <PasswordInput type="password" className="formGroupInput" id="signupPassword" placeholder="User Password" value={userInputs.userPassword} onChange={(event) => {setUserInputs((prevState) => ({...prevState, userPassword: event.target.value}))}} />
                    </div>
                    <div className={`login-input-div  ${showEmail ? "login-input-left": "login-input-right"}`}>
                        <TextInput type="tel" placeholder="Phone Number*" pattern="[0-9]{10}"  value={userInputs.phNo} onChange={(event) => {setUserInputs((prevState) => ({...prevState, phNo: event.target.value}))}} />
                        <TextInput type="date"  value={userInputs.dateOfBirth} onChange={(event) => {setUserInputs((prevState) => ({...prevState, dateOfBirth: event.target.value}))}} />
                    </div>
                </span>
                <button type="sumbit" className="signup-submit">Next</button>
                <button type="reset" className="signup-submit">Reset</button>
                <button type="button" className="signup-login" onClick={()=>navigate('/login')}>Login instead?</button>
            </form>
        </div>
        <Footer />
    </div>
};

export default SignUpForm;