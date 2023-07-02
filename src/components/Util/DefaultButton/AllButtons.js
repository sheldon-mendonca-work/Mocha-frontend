import './AllButtons.css'

const DefaultButton = (props) => {
    const {onClick, className, children} = props;
    return <button onClick={onClick} className={`dbtn ${className}`}>
        {children}
    </button> 
}

export {DefaultButton};