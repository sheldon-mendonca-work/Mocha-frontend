import  ReactDOM  from 'react-dom';
import './Backdrop.css';

const Backdrop = (props) => {
    
    const BackdropCard = (props) => {
        return <div className='backdrop' onClick={props.onClick}></div>
    }

    return <>
        {
        ReactDOM.createPortal(<BackdropCard onClick={props.onClick} />,document.getElementById("backdrop"))
      }
      
    </>
}

export default Backdrop; 