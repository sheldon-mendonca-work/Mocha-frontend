import './Header.css';
import { useContext } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import { BlogIcon, MochaIcon } from "../../Util/Icons";
import HeaderNav from "./HeaderNav";
import ButtonRounded from "../../Util/ButtonRounded/ButtonRounded";
import HeaderUserCard from "./HeaderUserCard";
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../../hooks/Contexts/PostContext';

const Header = (props) => {
    const { className } = props;
    const { authState } = useContext(AuthContext)
    const { initPostState, setPostTweet }  = useContext(PostContext);
    
    const navigate = useNavigate();

    // const logoutHandler = () => {
    //     localStorage.removeItem("MochaToken");
    //     localStorage.removeItem("MochaUsername");
        
    //     navigate("/");
    // }

    const createNewPostHandler = (event) => {
        event.stopPropagation();
        setPostTweet(initPostState);
        navigate('/compose');
    }

    return <header className={className}>
        <div className="header-content">
            <div>
                <h1 className="mocha-heading-1" onClick={()=>navigate('/home')}>
                    <MochaIcon className={"mocha-icon"} />
                </h1>
                <HeaderNav />
                {authState.isLoggedIn &&  <ButtonRounded className="header-tweet-button" onClick={createNewPostHandler}>Tweet</ButtonRounded>}
                {authState.isLoggedIn &&  <BlogIcon className="header-tweet-icon" onClick={createNewPostHandler}/>}
            </div>
            {authState.isLoggedIn && <HeaderUserCard user={authState.user} />}
            </div>
    </header>
}

export default Header;