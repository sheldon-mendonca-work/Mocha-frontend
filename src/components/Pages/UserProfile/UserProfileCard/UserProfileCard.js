import { useContext } from 'react';
import './UserProfileCard.css'
import { AuthContext } from '../../../../hooks/Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../hooks/Contexts/UserContext';
import { NotificationContext } from '../../../../hooks/Contexts/NotificationContext';

const UserProfileCard = (props) => {
    const { userProfile } = props;
    const { _id, displayName, username, bio, pfUrl, profileImg, bannerImg, followers, following } = userProfile;
    const { followUserFunction, unfollowUserFunction } = useContext(UserContext)
    const { authState } = useContext(AuthContext);
    const { showNotif } = useContext(NotificationContext);
    const navigate = useNavigate();
    
    const editProfileHandler = () => {
        if(_id === "23722911-080f-4a3a-82bb-185caad7fb75"){
            showNotif("Error", "Cannot edit guest user. Create a new account.");
            return
        }
        navigate(`/user/${_id}/editProfile`)
    }

    const getButton = () => {
        if(!authState.isLoggedIn){
            return <button className="userprofile-edit-button" onClick={()=>navigate('/login')} >Login to Follow</button>;
        }else{
            if(authState.user._id === _id){
                return <button className="userprofile-edit-button" onClick={editProfileHandler}>Edit Profile</button>
            }else{
                if(authState.user.following.indexOf(_id) !== -1){
                    return <button className="userprofile-edit-button" onClick={()=>unfollowUserFunction(_id)}>Unfollow</button>
                }else{
                    return <button className="userprofile-edit-button" onClick={()=>followUserFunction(_id)}>Follow</button>
                }
            }
        }
    }

    return <div className="userprofile-card">
        <div className="userprofile-card-bnr-div">
            <img src={bannerImg.name} alt={username} className="userprofile-card-bannerimg" />
            <div className="userprofile-card-imgdiv">
                <img src={profileImg.name} alt={username} className="userprofile-card-img" />
            </div>
        </div>
        
        <div className="userprofile-card-content">
            <span className="userprofile-name-div">
                <p className="userprofile-displayname">{displayName}</p>
                {getButton()}
            </span>
            <p className="userprofile-username">@{username}</p>
            {bio.length > 0  && <p className="userprofile-bio">{bio}</p>}
            {pfUrl.length > 0  && <a href={pfUrl} target="_blank" rel="noreferrer noopener" className="userprofile-pfUrl">{pfUrl}</a>}
            <div className="userprofile-followcard">
                <span className="userprofile-follower" onClick={()=>navigate(`/user/${_id}/followers`)}>
                    <span className="userprofile-follownum">{followers.length}</span> {followers.length === 1 ? `Follower` : `Followers`}
                </span>
                <span className="userprofile-following" onClick={()=>navigate(`/user/${_id}/following`)}>
                    <span className="userprofile-follownum">{following.length}</span> Following
                </span>
            </div>
        </div>
    </div>
}

export default UserProfileCard;