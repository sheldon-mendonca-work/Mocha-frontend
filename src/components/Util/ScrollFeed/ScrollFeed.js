import { useNavigate } from "react-router-dom";
import CommentCard from "../../Cards/CommentCard/CommentCard";
import './ScrollFeed.css'

const ScrollFeed = (props) => {
    const { userPosts } = props;
    const navigate = useNavigate();
    return <div className="scroll-feed">
        {
            userPosts !== undefined && userPosts.map(post => (
                <CommentCard onClick={()=>navigate(`/post/${post._id}`, {state: `/post/${post._id}`})} key={post._id} post={post} />
            ))
        }
    </div>
}

export default ScrollFeed;