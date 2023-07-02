import { useContext, useEffect } from "react";
import TweetForm from "../../Util/TweetForm/TweetForm";
import './CreatePost.css';
import { PostContext } from "../../../hooks/Contexts/PostContext";
import CommentCard from "../../Cards/CommentCard/CommentCard";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";

const CreatePost = (props) => {
    const { postTweet }  = useContext(PostContext);
    const { setBackDropCardVisible, setBackdropCardContent } = useContext(NotificationContext);
    
    useEffect(()=>{
        setBackDropCardVisible(true);
        setBackdropCardContent(<>
            {postTweet.parent !== null && postTweet.parent._id !== null && <CommentCard post={postTweet.parent} onClick={()=>{return}}/>}
                <TweetForm className="createpost-form" />
            </>)// eslint-disable-next-line
    }, []) 

    return <>
    </>
    
}

export default CreatePost;