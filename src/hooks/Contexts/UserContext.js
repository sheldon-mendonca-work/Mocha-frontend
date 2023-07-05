import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { NotificationContext } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const { initAuthState, dispatchAuth, getNotFollowedList, authState, createMediaURL, currUrl } = useContext(AuthContext);
    const { showNotif, setIsLoading } = useContext(NotificationContext);
    const [ userProfile, setUserProfile ] = useState(initAuthState.user);
    const [ followerList, setFollowerList ] = useState([]);
    const [ followingList, setFollowingList ] = useState([]);
    const [ searchList, setSearchList ] = useState([]);
    const navigate = useNavigate();

    const getUserProfile = async (userID) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/users/user/${userID}`,{
                method: "GET"
            })
            const responseJSON = await response.json();
            if(response.status === 200){
                const { user } = responseJSON;
                setUserProfile(user);
                setIsLoading(false);
                // showNotif('Success', 'Successfully fetched user');
            }else{
                setIsLoading(false);
                navigate('/explore');
                showNotif('Error', 'Failure in fetching user'); 
            }
        } catch (error) {
            setIsLoading(false);
            navigate('/error');
            showNotif('Error', 'Failure in fetching user');
        }
    }


    const followUserFunction = async (userID) =>{
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/users/follow/${userID}`,{
                method: "POST",
                headers: {"authorization": localStorage.getItem("MochaToken")}
            })
            const responseJSON = await response.json();
            if(response.status === 200){
                const { user, followUser } = responseJSON;
                dispatchAuth({type: 'UPDATE_AUTH_USER', value: user});
                
                setUserProfile(prevState => prevState._id === user._id ? user : followUser);
                
                getNotFollowedList();
                setIsLoading(false);
                showNotif('Success', 'Successfully followed user');
            }
        } catch (error) {
            setIsLoading(false);
            showNotif('Error', 'Failure in followed user');
        }
    }

    const unfollowUserFunction = async (userID) =>{
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/users/unfollow/${userID}`,{
                method: "POST",
                headers: {"authorization": localStorage.getItem("MochaToken")}
            })
            const responseJSON = await response.json();
            if(response.status === 200){
                const { user, followUser } = responseJSON;
                dispatchAuth({type: 'UPDATE_AUTH_USER', value: user});
                
                setUserProfile(prevState => prevState._id === user._id ? user : followUser);
                
                getNotFollowedList();
                setIsLoading(false);
                showNotif('Success', 'Successfully unfollowed user');
            }
        } catch (error) {
            setIsLoading(false);
            showNotif('Error', 'Failure in unfollowed user');
        }
    }

    const editUserFunction = async (newUser) => {
        try {
            setIsLoading(true);
            if(authState.user.profileImg.name !== newUser.profileImg.name){
                newUser.profileImg = await createMediaURL(newUser.profileImg);
            }
            if(authState.user.bannerImg.name !== newUser.bannerImg.name){
                newUser.bannerImg = await createMediaURL(newUser.bannerImg)
            }
            if(authState.user.backImgLink.name !== newUser.backImgLink.name){
                newUser.backImgLink = await createMediaURL(newUser.backImgLink)
            }
            
            const response = await fetch(`${currUrl}/api/users/edit`,{
                method: "POST",
                body: JSON.stringify({userData: newUser}),
                headers: {"authorization": localStorage.getItem("MochaToken"),
                'Content-Type': 'application/json'},
            })
            const responseJSON = await response.json();
            
            if(response.status === 201){
                const { user } = responseJSON;
                dispatchAuth({type: 'UPDATE_AUTH_USER', value: user});
                
                setUserProfile(prevState => prevState._id === user._id ? user : prevState);
                setIsLoading(false);
                navigate(`/user/${user._id}`);
                showNotif('Success', 'Successfully edited user');
                return true;
            }else{
                setIsLoading(false);
                showNotif('Error', 'Issue in edited user');
                return false;
            }
        } catch (error) {
            setIsLoading(false);
            navigate(`/user/${newUser}`)
            showNotif('Error', 'Failure in edited user');
            return false;
        }
    }

    const getFollowerList = async (userID) => {

        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/users/follower/${userID}`,{
                method: "GET",
            })
            const responseJSON = await response.json();
            if(response.status === 201){
                const { followerList, followingList } = responseJSON;
                setFollowerList(followerList);
                setFollowingList(followingList);
                setIsLoading(false);
                // showNotif('Success', 'Successfully fetched other user list');
            }
        } catch (error) {
            setIsLoading(false);
            showNotif('Error', 'Failure in fetched other user list');
        }
    }

    const getSearchUserList = async (search) =>{
        
        let searchWord = search.trim().toLowerCase();
        if(searchWord.length === 0){
            setSearchList([]);
        }
        
        try {
            
            const response = await fetch(`${currUrl}/api/users/search`,{
                method: "POST",
                body: JSON.stringify({search: searchWord}),
                headers: { 'Content-Type': 'application/json' }
            })
            const responseJSON = await response.json();
            if(response.status === 201){
                const { userSearchList } = responseJSON;
                setSearchList(userSearchList);
                
            }
        } catch (error) {
            // showNotif('Error', 'Failure in fetched other user list');
            console.log(error)
        }
    }

    return <UserContext.Provider value={{ userProfile, getUserProfile, followUserFunction, unfollowUserFunction, editUserFunction, getFollowerList, followerList, followingList, searchList, setSearchList, getSearchUserList }}>
        {children}
    </UserContext.Provider>
}