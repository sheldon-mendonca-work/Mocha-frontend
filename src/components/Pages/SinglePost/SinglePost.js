import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { PostContext } from "../../../hooks/Contexts/PostContext";
import PostCard from "../../Cards/PostCard/PostCard";
import { useNavigate } from "react-router-dom";
import CommentCard from "../../Cards/CommentCard/CommentCard";
import BoilerPlate from "../../Layouts/DefaultBoilerPlate/BoilerPlate";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import TweetForm from "../../Util/TweetForm/TweetForm";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";

const SinglePost = () => {
    const { userPosts,  getSinglePost, setPostTweet, setVisitedState, initPostState, getPostUsersByType } = useContext(PostContext);
    const { showBackDropCard, setBackDropCardVisible } = useContext(NotificationContext);
    const {authState} = useContext(AuthContext)
    const { postID, typeID } = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        setBackDropCardVisible(false);
        
        getSinglePost(postID);
        setVisitedState({type:"post", value: postID});
        setPostTweet({...initPostState, parent: {_id: postID}});
        
        switch(typeID){
            case undefined:
                break;
                
            case 'likes': case 'bookmarks':
                getPostUsersByType(postID);
                showBackDropCard("posts");
                break;
            
            default:
                navigate(`/post/${postID}`);
                break;
        }

    // eslint-disable-next-line
    },[postID, typeID])


    return <BoilerPlate className="homepage-boilerplate">
        <div className="homepage-feed">
        
        {
            userPosts.length > 0 && userPosts.map(post => (
                post._id === postID ? 
                <span key={post._id}>
                <PostCard  onClick={()=>navigate(`/post/${post._id}`)} post={post} />
                {authState.isLoggedIn && <TweetForm className="postcard-tweetform" user={authState.user}/>}
                </span>
                :
                <CommentCard key={post._id} onClick={()=>navigate(`/post/${post._id}`)} post={post} />
            ))
        }
                
        </div>
    </BoilerPlate>
}

export default SinglePost;