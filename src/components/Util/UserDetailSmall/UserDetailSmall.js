import { useContext } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import { UserContext } from "../../../hooks/Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import './UserDetailSmall.css';

const UserDetailSmall = (props) => {
    const { item } = props;
    const { authState } = useContext(AuthContext);
    const { followUserFunction, unfollowUserFunction } = useContext(UserContext)
    const navigate = useNavigate();

    const { _id, displayName, username, bio, profileImg } = item;

    const unfollowHandler = (event) => {
        event.stopPropagation();
        unfollowUserFunction(_id)
    }

    const navigateHandler = (event) => {
        event.stopPropagation();
        navigate(`/user/${_id}`)
    }

    const followHandler = (event) => {
        event.stopPropagation();
        followUserFunction(_id)
    }

    const loginHandler = (event) => {
        event.stopPropagation();
        navigate('/login')
    }

    const goToProfile = (event) => {
        event.stopPropagation();
        navigate(`/user/${authState.user._id}`)
    }

    const getButton = () => {
        if(!authState.isLoggedIn){
            return <button className="userprofile-edit-button" onClick={loginHandler} >Login to Follow</button>;
        }else{
            if(authState.user._id === _id){
                return <button className="userprofile-edit-button" onClick={goToProfile}>View profile</button>
            }else if(authState.user.following.indexOf(_id) !== -1){
                return <button className="userprofile-edit-button" onClick={unfollowHandler}>Unfollow</button>
            }else{
                return <button className="userprofile-edit-button" onClick={followHandler}>Follow</button>
            }
        }
    }

    return <div className="userdetailsmall" onClick={navigateHandler}>
        <span className="userdetailsmall-imgspan">
            <img src={profileImg.name} alt={`@${username}`} className="userdetailsmall-img" />
        </span>
        <div className="userdetailsmall-content">
            <span className="userdetailsmall-info">
                <span className="userdetailsmall-info-names">
                    <span className="userdetailsmall-info-disname">{displayName}</span>
                    <span className="userdetailsmall-info-username">@{username}</span>
                </span>
                <span className="userdetailsmall-button">
                    {getButton()}
                </span>  
            </span>
            {bio && <span className="userdetailsmall-info-bioname">{bio}</span>}
        </div>
        
    </div>
}

export default UserDetailSmall;