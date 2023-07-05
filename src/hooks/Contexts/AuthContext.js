// import 'dotenv/config';
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { NotificationContext } from "./NotificationContext";
import axios from 'axios';

const initAuthState = {
    isLoggedIn: false,
    filledSignUpForm: false,
    user: {
    _id: "",
    displayName: "",
    username: "",
    email: "",
    userPassword: "",
    phNo: "",
    dateOfBirth: "",
    bio: "",
    profileImg: {name: ""},
    bannerImg: {name: ""},
    backImgLink: {name: ""},
    createdAt: "",
    loginAt: "",
    bookmarks: [],
    posts: [],
    likes: [],
    followers: [],
    following: [],
    token: ""
  }};


const currUrl = 'https://sheldon-mocha-backend.netlify.app/';
// const currUrl = 'http://localhost:3001';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const { showNotif, setIsLoading } = useContext(NotificationContext);
    const [ notFollowList, setNotFollowList ] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const authReducerFunction = (authState, {type, value}) => {
        switch (type) {
            case 'SET_AUTH_STATE_VALUE':
                return {...authState, ...value};

            case 'SET_SIGNUP_FORM_VALUE':
                return {...authState, filledSignUpForm: true, user: {...authState.user, ...value}};

            case 'SET_SIGNUP_BIOFORM':
                return {isLoggedIn: true, filledSignUpForm: false, user: {...value}};

            case 'SET_AUTH_STATE_LOGGED_IN':
                return {...authState, isLoggedIn: true, filledSignUpForm: false, user: {...authState.user, ...value}};
            
            case 'UPDATE_AUTH_LIKES':
                return {...authState, user: {...authState.user, likes: value}};

            case 'UPDATE_AUTH_BOOKMARKS':
                return {...authState, user: {...authState.user, bookmarks: value}};

            case 'UPDATE_AUTH_USER':
                return {...authState, user: value};

            default:
                return {...authState};
        }
    }

    const [ authState, dispatchAuth ] = useReducer(authReducerFunction, initAuthState);

    const checkUniqueUsername = async (id, username, password, email, phNo) => {
        try {
            const response = await fetch(`${currUrl}/api/auth/check`,{
                method: "POST",
                body: JSON.stringify({
                    id, username, password, email, phNo
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if(response.status === 200){
                return true;
            }else return false;
        } catch (error) {
            
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const checkValidMedia = (media) => {
        const mediaType = media.type.split('/')[0];
        const mediaSize = media.size;
        
        if(!(mediaType === 'video' || mediaType === 'image')){
            return {isValid: false, message: 'Only image or video files are allowed'};
        }
        else if(mediaType === 'video' && mediaSize / 1024000 > 9.5){
            return {isValid: false, message: 'Video size must be less than 10MB...'};
        }else if(mediaType === 'image' && mediaSize / 1024000 > 4){
            return {isValid: false, message: 'Image size must be less than 4MB...'};
        }else{
            return {isValid: true, message: 'valid'};
        }
    }

    const createMediaURL = async (media) => {
        if(media.name === undefined ||media.name.length === 0 || media.type === undefined){
            return '';
        }
        const mediaType = media.type.split('/')[0];
        const formData = new FormData();
        formData.append('file', media);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_DB_PRESET);

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/${mediaType}/upload`, formData);
            
            const {secure_url, public_id, signature} = response.data;
            const source = 'cloudinary';
            return { name: secure_url, public_id, type: mediaType, signature, source };
        } catch (error) {
            console.error(error)
        } finally{
            setIsLoading(false);
        }
    }
    
    const createUserFunction = async (inputValues) => {
        
        try{
            setIsLoading(true);
            const checkUsername = await checkUniqueUsername('0', inputValues.username, inputValues.userPassword, inputValues.email, inputValues.phNo);
            if(!checkUsername){
                setIsLoading(false);
                showNotif('Error', "User Already Present");
                return;
            }

            const [profileImgURL, bannerImgURL, backImgLinkURL] = await Promise.all([createMediaURL(inputValues.profileImg), createMediaURL(inputValues.bannerImg), createMediaURL(inputValues.backImgLink)])

            const response = await fetch(`${currUrl}/api/auth/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    ...inputValues,
                    bannerImg: {
                        name: bannerImgURL.name ?? "",
                        type: bannerImgURL.type ?? "",
                        public_id: bannerImgURL.public_id,
                        signature: bannerImgURL.signature,
                        source: bannerImgURL.source ?? 'cloudinary'
                    },
                    profileImg: {
                        name: profileImgURL.name ?? "",
                        type: profileImgURL.type ?? "",
                        public_id: profileImgURL.public_id ?? "",
                        signature: profileImgURL.signature ?? "",
                        source: profileImgURL.source ?? 'cloudinary'
                    },
                    backImgLink: {
                        name: backImgLinkURL.name ?? "",
                        type: backImgLinkURL.type ?? "",
                        public_id: backImgLinkURL.public_id,
                        signature: backImgLinkURL.signature,
                        source: backImgLinkURL.source ?? 'cloudinary'
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if(response.status === 201){

                dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:{user: responseData.createdUser, isLoggedIn: true, filledSignUpForm: false}});
                localStorage.setItem('MochaToken', responseData.createdUser.token);
                localStorage.setItem('MochaUsername', responseData.createdUser.username);
                getNotFollowedList();
                setIsLoading(false);
                navigate('/home');
                showNotif('Success', "Successfully created user");
                return true; 
            }else{
                dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:initAuthState});
                setIsLoading(false);
                navigate('/signup');
                showNotif('Error', "Creating user Unsuccessful");
                return false;
            }
        } catch (error) {
            dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:initAuthState});
            setIsLoading(false);
            navigate('/signup');
            showNotif('Error', "Create User Error");
            return false;
        } finally{
            setIsLoading(false);
        }
    }

    const emailUserLoginFunction = async ({email, password}) => {
        try{
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/auth/login/email`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if(response.status === 200){

                dispatchAuth({type: 'SET_AUTH_STATE_LOGGED_IN', value: responseData.foundUser})
                
                localStorage.setItem('MochaToken', responseData.foundUser.token);
                localStorage.setItem('MochaUsername', responseData.foundUser.username);
                getNotFollowedList();
                setIsLoading(false);
                navigate('/home');
                showNotif('Success', "Successfully logged In");
                return true; 
            }else{
                dispatchAuth({type: 'UNABLE_LOGIN', value: initAuthState});
                setIsLoading(false);
                navigate('/login');
                showNotif('Error', "Log in Unsuccessful");
                return false;
            }
        } catch (error) {
            dispatchAuth({type: 'ERROR_LOGIN', value: initAuthState});
            setIsLoading(false);
            navigate('/login');
            showNotif('Error', "Log in Error");
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const phoneUserLoginFunction = async ({phNo, dateOfBirth}) => {
        try{
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/auth/login/phone`, {
                method: 'POST',
                body: JSON.stringify({
                    phNo: phNo,
                    dateOfBirth: dateOfBirth
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if(response.status === 200){

                dispatchAuth({type: 'SET_AUTH_STATE_LOGGED_IN', value: responseData.foundUser})

                localStorage.setItem('MochaToken', responseData.foundUser.token);
                localStorage.setItem('MochaUsername', responseData.foundUser.username);
                getNotFollowedList();
                setIsLoading(false);
                navigate('/home');
                showNotif('Success', "Successfully logged In");
                return true; 
            }else{
                dispatchAuth({type: 'UNABLE_LOGIN', value: initAuthState});
                setIsLoading(false);
                navigate('/login');
                showNotif('Error', "Log in Unsuccessful");
                return false;
            }
        } catch (error) {
            dispatchAuth({type: 'ERROR_LOGIN', value: initAuthState});
            setIsLoading(false);
            navigate('/login');
            showNotif('Error', "Log in Unsuccessful");
            return false;
        }
    }

    const autoLoginHandler = async (dispatchAuth, username, token) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/auth/autologin`, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    token: token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            if(response.status === 200){
                dispatchAuth({type: 'SET_AUTH_STATE_LOGGED_IN', value: responseData.foundUser})
                getNotFollowedList();
                setIsLoading(false);
                if(location.pathname === '/login' || location.pathname === '/bioform' || location.pathname === '/signup'){
                    navigate('/home')
                }
                
                showNotif('Success', "AutoLogin successful");
            }else{
                dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:initAuthState});
                localStorage.removeItem('MochaToken');
                localStorage.removeItem('MochaUsername');
                setIsLoading(false);
            }
        } catch (error) {
            dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:initAuthState});
            localStorage.removeItem('MochaToken');
            localStorage.removeItem('MochaUsername');
            setIsLoading(false);
            navigate('/login')
            showNotif('Error', "AutoLogin Error");
        }finally{
            setIsLoading(false);
        }
    }

    const testUserLogin = () => {
        emailUserLoginFunction({email: "sheldonmendonca@yahoo.com", password: "Jv0U6RWpvXFmPow"});
    }

    const deleteUserFunction = async () => {
        try {
            if(authState.user._id ===  "23722911-080f-4a3a-82bb-185caad7fb75"){
                logoutUserFunction();
                return;
            }
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/auth/delete`, {
                method: 'DELETE',
                headers: {"authorization": localStorage.getItem("MochaToken")}
            });
            
            if(response.status === 200){
                localStorage.removeItem('MochaToken');
                localStorage.removeItem('MochaUsername');
                dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:initAuthState});
                setIsLoading(false);
                showNotif('Success', "Deleted User successful"); 
            }
        } catch (error) {
            setIsLoading(false);
            navigate('/explore')
            showNotif('Error', "Error in deleting User.");
        }
    }

    const logoutUserFunction = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${currUrl}/api/auth/logout`, {
                method: 'POST',
                headers: {"authorization": localStorage.getItem("MochaToken")}
            });
            
            
            if(response.status === 200){
                localStorage.removeItem('MochaToken');
                localStorage.removeItem('MochaUsername');
                dispatchAuth({type: 'SET_AUTH_STATE_VALUE', value:initAuthState});
                setNotFollowList([])
                setIsLoading(false);
                navigate('/explore')
                showNotif('Success', "Logout User successful"); 
            }
        } catch (error) {
            setIsLoading(true);
            navigate('/explore');
            showNotif('Error', "Error in logging out User");
        }
    }

    const getNotFollowedList = async () => {
        
        try {
            const response = await fetch(`${currUrl}/api/users/notfollow`,{
                method: "GET",
                headers: {"authorization": localStorage.getItem("MochaToken")}
            })
            if(response.status === 201){
                const { userNotFollowList } = await response.json();
                
                setNotFollowList(userNotFollowList)
            }
        } catch (error) {
            showNotif('Error', 'Failure in fetched other user list');
        }
    } 

    // Auto Login only when app is loaded and only once.
    useEffect(()=>{
        const autoLoginToken = localStorage.getItem('MochaToken'), autoLoginUsername = localStorage.getItem('MochaUsername');
        
        if( autoLoginToken && autoLoginUsername && !authState.isLoggedIn){
            autoLoginHandler(dispatchAuth, autoLoginUsername, autoLoginToken);
        }else{
            localStorage.removeItem('MochaToken');
            localStorage.removeItem('MochaUsername');
        }
        
        // eslint-disable-next-line
    },[]);

    return <AuthContext.Provider value={{ initAuthState, authState, dispatchAuth, emailUserLoginFunction, phoneUserLoginFunction, testUserLogin, createUserFunction, deleteUserFunction, logoutUserFunction, notFollowList, getNotFollowedList, checkUniqueUsername, checkValidMedia, createMediaURL, currUrl }}>
        {children}
    </AuthContext.Provider>
}
