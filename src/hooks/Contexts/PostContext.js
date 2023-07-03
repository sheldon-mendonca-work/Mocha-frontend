/*
    two types of posts:
    1. userPosts
    2. singlePost
*/

import { createContext, useContext,  useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";
import findCommonObjects from "../../components/Util/Helpers/findCommonObjects";

const initPostState = {
    post:{
        _id: "",
        postDec: ``,
        postImgLink: [],
        likedBy: [],
        bookmarkBy: [],
        commentsArray: [],
        parentPost: null,
        user_id: "",
        createdAt: "",
        editedAt: "",
    },
    parent: {
        _id: null
    }
  };

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [ sortPosts, setSortPosts ] = useState(false); //true: likes false:date
    const [ userPosts, setUserPosts ] = useState([]);
    const [ visitedState, setVisitedState ] = useState({type: "home", value: ""});
    const [ postTweet, setPostTweet ] = useState(initPostState);
    const [ likedList, setLikedList ] = useState([]);
    const [ bookmarkedList, setBookmarkedList ] = useState([]);
    const { showNotif, setIsLoading, backDropCardVisible } = useContext(NotificationContext);
    const { dispatchAuth, createMediaURL, currUrl } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    
    const getExploreFeedFunction = async() => {
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/posts`, {method: 'GET'});
            
            if(response.status === 200){
                const responseJSON = await response.json();
                setIsLoading(false);
                setUserPosts(responseJSON.posts);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            showNotif('Error', 'Failure in fetching Feed')
        }
    }

    const getUserPosts = async (userID, typeID = "default") =>{
        try {
            setIsLoading(true);
            const postResponse = await fetch(`${currUrl}/api/posts/user/${userID}/${typeID}`, {
                method: 'GET'
            })
            const responseJSON = await postResponse.json();
            if(postResponse.status === 200){
                const { posts } = responseJSON;
                setUserPosts(posts);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            showNotif('Error', 'Failure in fetching user posts');
        }finally{
            setIsLoading(false);
        }
    }

    const getSinglePost = async (postId) => {
        try{
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/posts/${postId}`, {
                method: 'GET'
            });
            const responseData = await response.json();
            if(response.status === 200){
                setUserPosts(responseData.posts);
                setIsLoading(false);
                return;
            }else{
                setUserPosts([]);
                setIsLoading(false);
                navigate('/home');
                showNotif('Error', "Receiving Post unsuccessful.");
            }
        } catch (error) {
            setUserPosts([]);
            setIsLoading(false);
            navigate('/error');
            showNotif('Error', 'Post not found');
        }finally{
            setIsLoading(false);
        }
    }

    const likePostFunction = async (postID) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/posts/like/${postID}`, {
                method: 'POST',
                headers: {"authorization": localStorage.getItem("MochaToken"),
                'Content-Type': 'application/json'}
            })
            const responseData = await response.json();
            if(response.status === 201){
                const { post, likes, liked } = responseData;
                setUserPosts(userPosts.map(userPost => userPost._id === post._id ? post : userPost));
                dispatchAuth({type: 'UPDATE_AUTH_LIKES', value: likes});
                setIsLoading(false);
                showNotif('Success', `${liked? "Liking": "Disliking"} post successful`);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            showNotif('Error', 'Failure in liking/disiking post');
        }finally{
            setIsLoading(false);
        }
    } 

    const bookmarkPostFunction = async (postID) => {
   
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/posts/bookmark/${postID}`, {
                method: 'POST',
                headers: {"authorization": localStorage.getItem("MochaToken"),
            'Content-Type': 'application/json'}
            })
            const responseData = await response.json();
            if(response.status === 201){
                const {post, bookmarks, bookmarked} = responseData;
                setUserPosts(userPosts.map(userPost => userPost._id === post._id ? post : userPost));
                dispatchAuth({type: 'UPDATE_AUTH_BOOKMARKS', value: bookmarks});
                setIsLoading(false);
                showNotif('Success', `${bookmarked?  "Bookmarking" : "Unbookmarking"} post successful`);
                return;
            }
        } catch (error) {
            setIsLoading(false);
            showNotif('Error', 'Failure in bookmarking post');
        }finally{
            setIsLoading(false);
        }
    }
    
    const createPostFunction  = async () => {
        try {
            setIsLoading(true);
            const addedFileArrayURL = await Promise.all(postTweet.post.postImgLink.map((item) => createMediaURL(item) ));

            const response = await fetch(`${currUrl}/api/posts/`,{
                method: 'POST',
                body: JSON.stringify({postData: {
                    postDec: postTweet.post.postDec,
                    postImgLink: addedFileArrayURL,
                    parentPost: postTweet.parent._id
                }}),
                headers: {"authorization": localStorage.getItem("MochaToken"),
            'Content-Type': 'application/json'}
            })
            if(response.status === 201){
                setIsLoading(false);
                switch (visitedState.type) {
                    case "post":
                        getSinglePost(visitedState.value);
                        break;
                    
                    case "user":
                        getUserPosts(visitedState.value);
                        break;

                    default:
                        getExploreFeedFunction();
                        break;
                }
                setPostTweet(initPostState);
                setIsLoading(false);
                if(backDropCardVisible){
                    navigate(-1);
                }else{
                    window.location.reload();
                }
                showNotif('Success', 'Creating post successful');
                return true;
            }
            setPostTweet(initPostState);
        } catch (error) {
            setPostTweet(initPostState);
            setIsLoading(false);
            showNotif('Error', 'Failure in editing post');
            return false;
        }finally{
            setIsLoading(false);
        }
    }

    const editPostFunction = async (postID) => {

        try {
            setIsLoading(true);

            let newPostArray = postTweet.post.postImgLink;
            let oldPostArray = userPosts.find(({_id}) => _id === postID).postImgLink;
            
            const [ commonArray, addedArray, deletedArray ] = findCommonObjects(oldPostArray, newPostArray);
            
            const addedFileArrayURL = await Promise.all(addedArray.map(item=> createMediaURL(item) ));
            
            const response = await fetch(`${currUrl}/api/posts/edit/${postID}`,{
                method: 'POST',
                body: JSON.stringify({postData: {
                    postDec: postTweet.post.postDec,
                    commonPosts: commonArray,
                    addedPosts: addedFileArrayURL,
                    parentPost: postTweet.parent._id,
                    deletedPosts: deletedArray
                }}),
                headers: {"authorization": localStorage.getItem("MochaToken"),
            'Content-Type': 'application/json'}
            })
            if(response.status === 201){
                switch (visitedState.type) {
                    case "post":
                        getSinglePost(visitedState.value);
                        break;
                    
                    case "user":
                        getUserPosts(visitedState.value);
                        break;

                    default:
                        getExploreFeedFunction();
                        break;
                }
                setPostTweet(initPostState)
                setIsLoading(false);
                navigate(-1);
                showNotif('Success', 'Editing post successful');
            }
            setPostTweet(initPostState)
        } catch (error) {
            setPostTweet(initPostState);
            setIsLoading(false);
            navigate(`/post/${postID}`)
            showNotif('Error', 'Failure in Editing post');
            return false;
        }
    }

    const deletePostFunction = async (postID) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/posts/${postID}`, {
                method: 'DELETE',
                headers: {"authorization": localStorage.getItem("MochaToken"),
            'Content-Type': 'application/json'}
            })
            if(response.status === 201){
                getExploreFeedFunction();
                setIsLoading(false);
                if(location.pathname === `post/${postID}`){
                    navigate(`home`);
                }else{
                    window.location.reload();
                }
                showNotif('Success', 'deleting post successful');
                return;
            }
        } catch (error) {
            navigate(`home`)
            showNotif('Error', 'Failure in deleting post');
        }
    }

    const getPostUsersByType = async (postID) => {
        try{
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/posts/${postID}/type`, {
                method: 'GET'
            });
            const responseData = await response.json();
            if(response.status === 200){
                const { likedList, bookmarkedList } = responseData;
                setLikedList(likedList);
                setBookmarkedList(bookmarkedList);
                setIsLoading(false);
                return;
            }else{
                setIsLoading(false);
                navigate(`/post/${postID}`);
                showNotif('Error', "Receiving Post unsuccessful.");
            }
        } catch (error) {
            setUserPosts([]);
            setIsLoading(false);
            navigate('/home');
            showNotif('Error', 'Failure in fetching post');
        }finally{
            setIsLoading(false);
        }
    }


    return <PostContext.Provider value={{ initPostState, userPosts, setUserPosts, getExploreFeedFunction, getSinglePost, likePostFunction, createPostFunction, setVisitedState, bookmarkPostFunction, postTweet, setPostTweet, getUserPosts, deletePostFunction, editPostFunction, sortPosts, setSortPosts, likedList, bookmarkedList, getPostUsersByType }}>
        {children}
    </PostContext.Provider>
}