import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import { PostContext } from "../../../hooks/Contexts/PostContext";
import { BookmarkIcon, CommentIcon,  DislikeIcon,  LikeIcon, RemoveBookmarkIcon, ShareIcon } from "../../Util/Icons";
import './PostActionBar.css'
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";

const PostActionBar = (props) => {
    const {post, className} = props;
    
    const { authState } = useContext(AuthContext); 
    const { likePostFunction, bookmarkPostFunction, setPostTweet } = useContext(PostContext);
    const { backDropCardVisible, showNotif } = useContext(NotificationContext);

    const navigate = useNavigate();

    const onCommentClick = (event, post) => {
        event.stopPropagation();
        if(backDropCardVisible) return;
        setPostTweet((prevState) => ({...prevState, parent: post}));
        navigate('/compose');
    }

    const onLikeClick = (event, postID) => {
        event.stopPropagation();
        if(authState.isLoggedIn){
            likePostFunction(postID);
            return;
        }else{
            navigate('/login');
        }
    }

    const onBookmarkClick = (event, postID) => {
        event.stopPropagation();
        if(authState.isLoggedIn){
            bookmarkPostFunction(postID);
            return;
        }else{
            navigate('/login');
        }
    }

    const onShareClick = (event, postID) => {
        event.stopPropagation();
        try {
            navigator.clipboard.writeText(`localhost:/post/${postID}`);
            showNotif('Success', 'File path copied to clipboard.');
        } catch (err) {
            showNotif('Error', `Failed to copy: ${err}`);
        }
    }

    return <div className={className}>
        <span onClick={(event)=>onCommentClick(event, post)} className="postaction-link postaction-comment">
            <CommentIcon className="postaction-svg"/>
            <span className="postaction-desc">{post.commentsArray.length}</span>
        </span>
        
        <span onClick={(event)=>onLikeClick(event,post._id)} className="postaction-link postaction-link-like">
            {
                authState.user.likes.indexOf(post._id) !== -1 ?
                <DislikeIcon className="postaction-svg postaction-dislike"/>
                :
                <LikeIcon className="postaction-svg postaction-like"/>
            }
            <span className="postaction-desc">{post.likedBy.length}</span>
        </span>

        <span onClick={(event)=>onBookmarkClick(event, post._id)} className=" postaction-link postaction-link-bookmark">
            {
                authState.user.bookmarks.indexOf(post._id) !== -1 ?
                <RemoveBookmarkIcon className="postaction-svg postaction-removebookmark"/>
                :
                <BookmarkIcon className="postaction-svg postaction-addbookmark"/>
            }
            <span className="postaction-desc">{post.bookmarkBy.length}</span>
        </span>

        <span onClick={(event)=>onShareClick(event, post._id)} className="postaction-link">
            <ShareIcon  className="postaction-svg"/>
        </span>
    </div>
}

export default PostActionBar;