import { useContext } from "react";
import { UserContext } from "../../../hooks/Contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollUser from "../../Util/ScrollUser/ScrollUser";

const FollowerListCard = () => {
    const {  followerList, followingList } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
    const list = type === "following" ? followingList : followerList;

    const userIDArray = location.pathname.split('/');
    const userID = userIDArray[userIDArray.length-2];
    return <>
        <div className="userprofile-types">
            <span className={`userprofile-type ${type !== "following" ? "homepage-active": "homepage-inactive"}`} onClick={()=>navigate(`/user/${userID}/followers`)}>Followers</span>
            <span className={`userprofile-type ${type === "following" ? "homepage-active": "homepage-inactive"}`} onClick={()=>navigate(`/user/${userID}/following`)}>Following</span>
        </div>
        <ScrollUser userList={list} />
    </>
}

export default FollowerListCard;