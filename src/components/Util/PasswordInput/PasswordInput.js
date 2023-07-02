import { useState } from 'react';
import { NotViewPasswordIcon, ViewPasswordIcon } from '../Icons';
import './PasswordInput.css';

const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const showPasswordHandler = (passwordID) => {
        document.getElementById(passwordID).type = showPassword ? "password" : "text";
        setShowPassword(prevState => (!prevState))
    }

   
    return <div className="formGroup">

        <input {...props} type='password'/>
        <span onClick={()=> showPasswordHandler(props.id)}>
            {
            showPassword ?
                <NotViewPasswordIcon className={"viewPasswordIcon"} />
            :
                <ViewPasswordIcon className={"viewPasswordIcon"} />
            }
        </span>
        <label className="formGroupLabel" htmlFor={props.id}>{props.placeholder}</label>
        
    </div>
}

export default PasswordInput;