import { useLocation, useNavigate } from "react-router-dom";
import './HeaderNav.css'
import { BinIcon, BookmarkIcon, ExpandMoreIcon, ExploreIcon, HeartIcon, HomeIcon, LogoutIcon, UserProfileIcon } from "../../Util/Icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import HeaderUserCard from "./HeaderUserCard";


const HeaderNav = (props) => {
    const [ moreVisible, setMoreVisible ] = useState(false);

    const {authState, deleteUserFunction, logoutUserFunction} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinkClickHandler = (event, link) => {
        event.stopPropagation();
        navigate(link);
    }

    const navAuthLinkClickHandler = (event, link) => {
        event.stopPropagation();
        authState.isLoggedIn ? navigate(link) : navigate('/login');
    }

    const navMoreClickHandler = (event) => {
        event.stopPropagation();
        setMoreVisible(prevState => !prevState);
    }

    const deleteUserHandler = (event) => {
        event.stopPropagation();
        setMoreVisible(false)
        deleteUserFunction();
    }

    const logoutHandler = (event) => {
        event.stopPropagation();
        setMoreVisible(false)
        logoutUserFunction();
    }

    const loginHandler = (event) => {
        event.stopPropagation();
        navigate('/login')
    }

    const ExpandNavMoreContent = () => {
        if(authState.isLoggedIn){
            return <div className={`expandnavmorecontent `}>
                <p className={`expand-content exp-delete`} onClick={deleteUserHandler}><BinIcon className={'expand-user-svg exp-delete'}/>Delete User</p>
                <p className={`expand-content exp-logout`} onClick={logoutHandler}><LogoutIcon className={'expand-user-svg exp-logout'}/>Logout</p>
            </div>
        }else{
            return <div className={`expandnavmorecontent `}>
            <p className={`expand-content`} onClick={loginHandler}>Log In</p>
            </div>
        }
    }

    const ExpandBackdrop = (props) => {
        return <div {...props} className={`${props.className} expandbackdrop`}></div>
    }

    let locationName = location.pathname.split('/')[1];
    let locationType = location.pathname.split('/')[3];
    
    locationName = locationName === undefined ? "" : locationName;
    locationType = locationType === undefined ? "" : locationType;

    return <nav className="header-nav-list">
        <span onClick={(event)=>navLinkClickHandler(event, `/home`)}>
            <span className={`header-nav-list-span ${locationName === "home"? "active-page": ""}`}>
                <span className="header-nav-list-item"><HomeIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Home</span>
            </span>
        </span>
        <span onClick={(event)=>navLinkClickHandler(event, `/explore`)}>
            <span className={`header-nav-list-span ${locationName === "explore"? "active-page": ""}`}>
                <span className="header-nav-list-item"><ExploreIcon className="header-nav-svg"/></span> 
                <span className="header-nav-text">Explore</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}`)}>
            <span className={`header-nav-list-span ${(locationName === "user" && locationType === "") ? "active-page": ""}`}>
                <span className="header-nav-list-item"><UserProfileIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Profile</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}/bookmarks`)} className="header-nav-bk">
            <span className={`header-nav-list-span ${(locationName === "user" && locationType === "bookmarks") ? "active-page": ""}`}>
                <span className="header-nav-list-item"><BookmarkIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Bookmarks</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}/likes`)} className="header-nav-lk">
            <span className={`header-nav-list-span ${(locationName === "user" && locationType === "likes") ? "active-page": ""}`}>
                <span className="header-nav-list-item"><HeartIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Likes</span>
            </span>
        </span>

        <span  className="header-nav-more">
            <span className={`header-nav-list-span`} onClick={navMoreClickHandler}>
                <span className="header-nav-list-item"><ExpandMoreIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">More</span>
            </span>
            { moreVisible && <ExpandNavMoreContent />}
            { moreVisible && <ExpandBackdrop onClick={navMoreClickHandler}/>}
        </span>
        {authState.isLoggedIn && <HeaderUserCard user={authState.user} />}
    </nav>
}

export default HeaderNav;