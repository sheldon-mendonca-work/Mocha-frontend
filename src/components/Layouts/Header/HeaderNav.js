import { useNavigate } from "react-router-dom";
import './HeaderNav.css'
import { BinIcon, BookmarkIcon, ExpandMoreIcon, ExploreIcon, HeartIcon, HomeIcon, LogoutIcon, PostsIcon, UserProfileIcon } from "../../Util/Icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";


const HeaderNav = (props) => {
    const [ moreVisible, setMoreVisible ] = useState(false);

    const {authState, deleteUserFunction, logoutUserFunction} = useContext(AuthContext);
    const navigate = useNavigate();

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

    return <nav className="header-nav-list">
        <span onClick={(event)=>navLinkClickHandler(event, `/home`)}>
            <span className="header-nav-list-span">
                <span className="header-nav-list-item"><HomeIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Home</span>
            </span>
        </span>
        <span onClick={(event)=>navLinkClickHandler(event, `/home`)}>
            <span className="header-nav-list-span">
                <span className="header-nav-list-item"><ExploreIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Explore</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}`)}>
            <span className="header-nav-list-span">
                <span className="header-nav-list-item"><UserProfileIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Profile</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}`)}>
            <span className="header-nav-list-span">
                <span className="header-nav-list-item"><PostsIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Posts</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}/bookmarks`)}>
            <span className="header-nav-list-span">
                <span className="header-nav-list-item"><BookmarkIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Bookmarks</span>
            </span>
        </span>

        <span onClick={(event)=>navAuthLinkClickHandler(event, `/user/${authState.user._id}/likes`)}>
            <span className="header-nav-list-span">
                <span className="header-nav-list-item"><HeartIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">Likes</span>
            </span>
        </span>

        <span  className="header-nav-more">
            <span className="header-nav-list-span" onClick={navMoreClickHandler}>
                <span className="header-nav-list-item"><ExpandMoreIcon className="header-nav-svg"/></span>
                <span className="header-nav-text">More</span>
            </span>
            { moreVisible && <ExpandNavMoreContent />}
            { moreVisible && <ExpandBackdrop onClick={navMoreClickHandler}/>}
        </span>
    </nav>
}

export default HeaderNav;