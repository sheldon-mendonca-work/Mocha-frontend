import './TextInput.css';

const TextInput = (props) => {   
    return <div className="textInput">

        <input {...props} className={`${props.className} textInputField`}/>
        <label className="textInputLabel" htmlFor={props.id}>{props.placeholder}</label>
        
    </div>
}

export default TextInput;