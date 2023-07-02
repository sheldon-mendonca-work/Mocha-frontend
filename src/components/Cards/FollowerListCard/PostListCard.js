import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollUser from "../../Util/ScrollUser/ScrollUser";
import { PostContext } from "../../../hooks/Contexts/PostContext";

const PostListCard = () => {
    const {  likedList, bookmarkedList } = useContext(PostContext);
    const location = useLocation();
    const navigate = useNavigate();

    const list = location.pathname.slice(location.pathname.lastIndexOf('/')+1) === "likes" ? likedList : bookmarkedList;

    const postIDArray = location.pathname.split('/');
    const postID = postIDArray[postIDArray.length-2];
    return <>
        <div className="userprofile-types">
            <span className="userprofile-type" onClick={()=>navigate(`/post/${postID}/likes`)}>Liked By</span>
            <span className="userprofile-type" onClick={()=>navigate(`/post/${postID}/bookmarks`)}>Bookmarked By</span>
        </div>
        <ScrollUser userList={list} />
    </>
}

export default PostListCard;