import { useContext, useEffect } from "react";
import { PostContext } from "../../../hooks/Contexts/PostContext";
import BoilerPlate from "../../Layouts/DefaultBoilerPlate/BoilerPlate";
import './UserProfile.css'
import ScrollFeed from "../../Util/ScrollFeed/ScrollFeed";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../hooks/Contexts/UserContext";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";

/*
    type id can be:
    1. undefined (posts)
    2. likes
    3. bookmarks
    4. followers
    5. following
*/

const UserProfile = () => {
    const { userID, typeID } = useParams();
    const { userPosts, setVisitedState, getUserPosts } = useContext(PostContext);
    const {  getFollowerList, userProfile, getUserProfile } = useContext(UserContext);
    const { showBackDropCard, setBackDropCardVisible } = useContext(NotificationContext);
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    useEffect(()=>{
        setBackDropCardVisible(false);
        setVisitedState({type:"user", value: userID});
        getUserProfile(userID);
        switch (typeID) {
            case undefined:
                break;
                
            case "likes": 
            case "bookmarks":
            case "posts":  
                getUserPosts(userID, typeID);
                break;
            
            case "followers":
            case "following":  
                getFollowerList(userID);
                showBackDropCard("followers")
                break;

            case 'editProfile':
                showBackDropCard("form");
                break;

            default:
                navigate(`/user/${userID}`)
                break;
        }
        
        // eslint-disable-next-line
    },[userID, typeID])


    return <BoilerPlate className="userprofile-boilerplate">
        <div className="userprofile-main">
            <UserProfileCard userProfile={userProfile} />
            <div className="userprofile-types">
                <span className="userprofile-type" onClick={()=>navigate(`/user/${userID}`)}>Posts</span>
                <span className="userprofile-type" onClick={()=>navigate(`/user/${userID}/likes`)}>Likes</span>
                <span className="userprofile-type" onClick={()=>navigate(`/user/${userID}/bookmarks`)}>Bookmarks</span>
            </div>
            {userPosts.length === 0 && authState.user._id !== userID && <div className="no-posts-found">No posts found...</div>}
            {userPosts.length === 0 && authState.user._id === userID && <div className="no-posts-found">Start posting <span onClick={()=>navigate('/compose')}>here...</span></div>}
            {userPosts.length > 0 && <ScrollFeed userPosts={userPosts} />}
        </div>
    </BoilerPlate>
};

export default UserProfile;