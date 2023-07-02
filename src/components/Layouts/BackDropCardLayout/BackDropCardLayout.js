import { CrossIcon } from "../../Util/Icons";
import './BackDropCardLayout.css';
import { useContext } from "react";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";
import { useLocation, useNavigate } from "react-router-dom";

const BackDropCardLayout = () => {
    const { setBackDropCardVisible, backdropCardContent } = useContext(NotificationContext);
    const navigate = useNavigate();
    const location = useLocation();
    let prevLocation = location.pathname.slice(0,location.pathname.lastIndexOf('/'));
    
    prevLocation = prevLocation.length > 0 ? prevLocation : -1; 
    

    return <div className="createpost-backdrop" onClick={()=>{
        setBackDropCardVisible(false);
        navigate(prevLocation);
        }}>

        <div className="createpost-card" onClick={(event) => event.stopPropagation()}>
            {backdropCardContent}
            <CrossIcon className="createpost-cross" 
                onClick={(event)=>{
                    event.stopPropagation();
                    setBackDropCardVisible(false);
                    navigate(prevLocation);
                }}
            />
            
        </div>
    </div>
}

export default BackDropCardLayout;