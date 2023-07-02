import { useNavigate } from "react-router-dom";
import PostActionBar from "../PostActionBar/PostActionBar";
import './CommentCard.css';
import dayjs from "dayjs";
import ExpandMoreCard from "../ExpandMoreCard/ExpandMoreCard";
import { useContext } from "react";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";

var relativeTime = require('dayjs/plugin/relativeTime');

const CommentCard = (props) => {
    const { post, onClick, typePost } = props;
    const { backDropCardVisible } = useContext(NotificationContext);

    const navigate = useNavigate();
    dayjs.extend(relativeTime);
    
    const userClickHandler = (event) => {
        event.stopPropagation();
        navigate(`/user/${post.user_id._id}`);
    }

    return <div className="commentcard" onClick={onClick}>
        <div className="commentcard-imgdiv" style={{cursor:"pointer"}} >
            <img src={post.user_id.profileImg.name} alt={post.user_id.displayName} className="commentcard-img" onClick={(event)=>userClickHandler(event)}/>
        </div>
        <div className="commentcard-userdetails">
            <div className="commentcard-user">
                
                <span className="commentcard-name" style={{cursor:"pointer"}} onClick={(event)=>userClickHandler(event)} >
                    <span className="commentcard-displayName">{post.user_id.displayName}</span>
                    <span className="commentcard-username">@{post.user_id.username}</span>
                </span>
                <span className="commentcard-time">{dayjs(post.editedAt).fromNow()}</span>
            </div>
            {!backDropCardVisible && <ExpandMoreCard className="commentcard-expand" content={"comment"} value={{postID: post._id, userID: post.user_id._id, username: post.user_id.username}}/>}
            
        </div>
        <div className="commentcard-userpost">
            {post.postDec.length > 0 && <div className="commentcard-postDec">{post.postDec.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>}
            {
                post.postImgLink.length > 0 && 
                    <div className="commentcard-imgArrDiv">{post.postImgLink.map((imgLink) => {
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

        </div>
        <PostActionBar post={post} typePost={typePost} className="commentcard-postaction"/>
        
    </div>
}

export default CommentCard;