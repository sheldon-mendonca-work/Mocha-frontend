import { useNavigate } from "react-router-dom";
import PostActionBar from "../PostActionBar/PostActionBar";
import './PostCard.css';
import dayjs from "dayjs";
import ExpandMoreCard from "../ExpandMoreCard/ExpandMoreCard";
var relativeTime = require('dayjs/plugin/relativeTime');


const PostCard = (props) => {
    const { post, typePost } = props;
    const navigate = useNavigate();
    dayjs.extend(relativeTime);
    
    const userClickHandler = (event) => {
        event.stopPropagation();
        navigate(`/user/${post.user_id._id}`);
    }

    const postTypeClickHandler = (event, type) => {
        event.stopPropagation();
        navigate(`/post/${post._id}/${type}`);
    }

    const date = new Date(post.editedAt);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };

    return <div className="postcard">
        <div className="postcard-imgdiv" style={{cursor:"pointer"}} onClick={(event)=>userClickHandler(event)}>
            <img src={post.user_id.profileImg.name} alt={post.user_id.displayName}className="postcard-img" />
        </div>  
        <div className="postcard-userdetails">
            <div style={{cursor:"pointer"}} onClick={(event)=>userClickHandler(event)} className="postcard-user">
                
                <span className="postcard-displayName">{post.user_id.displayName}</span>
                <span className="postcard-username">@{post.user_id.username}</span>
            </div>
            <ExpandMoreCard className="postcard-expand" content={"post"} value={{postID: post._id, userID: post.user_id._id, username: post.user_id.username}}/>
        </div>
        <div className="postcard-userpost">
            {post.postDec.length > 0 && <div className="postcard-postDec">{post.postDec.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>}
            {
                post.postImgLink.length > 0 && 
                    <div className="postcard-imgArrDiv">{post.postImgLink.map((imgLink) => {
                        switch (imgLink.type) {
                            case 'image': case 'gif':
                                return <img key={imgLink._id} src={imgLink.name} alt={post._id} />
                                
                            case 'video':
                                return  <video width="320" height="240" controls>
                                <source src={imgLink.name} type="video/mp4" />
                                <source src={imgLink.name} type="video/ogg" />
                                Your browser does not support the video tag.
                              </video> 

                            default:
                                return <img key={imgLink._id} src={imgLink.name} alt={"Cannot display file"} />
                        }
                    })}
                </div>
            }
            <div className="postcard-time" ><time dateTime={post.editedAt}>{date.toLocaleDateString('en-US', dateOptions)}</time></div>
        </div>
        <div className="postcard-list">
            <span>
                <span className="postcard-list-length">{post.commentsArray.length}</span>
                {post.commentsArray.length===1 ?"Comment":"Comments"}
            </span>
            <span onClick={(event)=>postTypeClickHandler(event, `likes`)}>
                <span className="postcard-list-length">{post.likedBy.length}</span>
                {post.likedBy.length===1 ?"Like":"Likes"}
            </span>
            <span onClick={(event)=>postTypeClickHandler(event, `bookmarks`)}>
                <span className="postcard-list-length">{post.bookmarkBy.length}</span>
                {post.bookmarkBy.length===1 ?"Bookmark":"Bookmarks"}
            </span>
        </div>
        <PostActionBar post={post} typePost={typePost} className="postcard-postaction"/>
    </div>
}

export default PostCard;