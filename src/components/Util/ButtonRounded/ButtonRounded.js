import './ButtonRounded.css'

const ButtonRounded = (props) => {
    
    const { children, className, onClick } = props;
    
    return <button className={`buttonRounded ${className}`} onClick={onClick}>
        {children}
    </button>
}   

export default ButtonRounded;