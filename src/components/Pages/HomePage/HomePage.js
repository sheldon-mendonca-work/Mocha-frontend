import { useContext, useEffect } from "react";
import { PostContext } from "../../../hooks/Contexts/PostContext";
import BoilerPlate from "../../Layouts/DefaultBoilerPlate/BoilerPlate";
import TweetForm from "../../Util/TweetForm/TweetForm";
import './HomePage.css'
import HomePageHeading from "./HomePageHeading/HomePageHeading";
import ScrollFeed from "../../Util/ScrollFeed/ScrollFeed";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const { userPosts, initPostState, getHomeFeedFunction, setPostTweet, setVisitedState, sortPosts } = useContext(PostContext);
    const { authState } = useContext(AuthContext);
    const { setBackDropCardVisible } = useContext(NotificationContext);
    const navigate = useNavigate();


    useEffect(()=>{    
        setBackDropCardVisible(false);
        if(!authState.isLoggedIn)navigate('/explore ')
        getHomeFeedFunction();
        setVisitedState({type:"home", value: ""});
        setPostTweet(initPostState);
        // eslint-disable-next-line
    },[])

    const getUserPosts = () => {
        let tempPosts = userPosts;
        tempPosts = sortPosts ? tempPosts.sort((a,b) => (b.likedBy.length - a.likedBy.length)) : tempPosts.sort((a,b) => (new Date(b.editedAt)) - new Date(a.editedAt))
        return tempPosts;
    }

    return <BoilerPlate className="homepage-boilerplate">
        <div className="homepage-feed">
            <HomePageHeading headingName={"HomePage"}/>
            {authState.isLoggedIn && <TweetForm className="homepage-tweetform" />}
            {userPosts.length === 0 &&  <div className="no-posts-found">No posts found. Follow a user to start!</div>}
            <ScrollFeed userPosts={ getUserPosts() } />
        </div>
    </BoilerPlate>
};

export default HomePage;