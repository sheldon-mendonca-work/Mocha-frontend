import './HomePageHeading.css';
import { useContext } from "react";
import { PostContext } from '../../../../hooks/Contexts/PostContext';

const HomePageHeading = (props) => {
    const { sortPosts, setSortPosts } = useContext(PostContext);

    return <div className="homepage-heading">
        <div className="feedsort-heading">
            <div className={`feedsort-button ${sortPosts ? "homepage-active": "homepage-inactive"}`} onClick={()=> setSortPosts(true)}>Trending</div>
            <div className={`feedsort-button ${sortPosts ? "homepage-inactive": "homepage-active"}` } onClick={()=> setSortPosts(false)}>New</div>
        </div>
    </div>
}

export default HomePageHeading;