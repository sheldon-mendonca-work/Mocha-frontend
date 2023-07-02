import { useNavigate } from "react-router-dom";
import { ExpandMoreIcon, LogoutIcon, UserProfileIcon } from "../../Util/Icons";
import './HeaderUserCard.css';
import { useContext, useState } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";

const HeaderUserCard = (props) => {
    const { displayName, username, profileImg } = props.user;
    const { authState, logoutUserFunction } = useContext(AuthContext);
    const [ showExpMore, setShowExpMore ] = useState(false);
    const navigate = useNavigate();

    const expandClickHandler = (event) => {
        event.stopPropagation();
        setShowExpMore(prevState => !prevState);
    }

    const goToLinkHandler = (event, link) => {
        event.stopPropagation();
        navigate(link);
    }

    const logouthandler = (event) => {
        event.stopPropagation();
        logoutUserFunction();
    }

    const ExpandUserContent = () => {
        return <div className={`expandusercontent `}>
            <p className={`expand-content`} onClick={(event) => goToLinkHandler(event, `/user/${authState.user._id}`)}>
                <UserProfileIcon className={'expand-user-svg'}/>Go to profile
                </p>
            <p className={`expand-content exp-logout`} onClick={logouthandler}>
            <LogoutIcon className={'expand-user-svg exp-logout'}/>Logout
                </p>
        </div>
        
    }

    const ExpandBackdrop = (props) => {
        return <div {...props} className={`${props.className} expandbackdrop`}></div>
    }

    return  <div className="header-user-card" onClick={expandClickHandler} >
            <span className="header-user-card-content">
                <div className="header-user-card-img">
                    <img src={profileImg.name} alt={username}/>
                </div>
                <div className="header-user-card-name">
                    <span className="header-user-card-displayName">{displayName}</span>
                    <span className="header-user-card-userName">@{username}</span>
                </div>
                <ExpandMoreIcon className="header-user-card-svg"/>
            </span>
            { showExpMore && <ExpandUserContent />}
            { showExpMore && <ExpandBackdrop onClick={expandClickHandler}/>}
        </div>
    
}

export default HeaderUserCard;