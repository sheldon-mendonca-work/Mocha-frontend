/*

Signup is divided into 2 parts:
    1. SignUp form ()
    2. Bio Form (this page)

*/

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../hooks/Contexts/AuthContext";
import '../SignUp.css';
import { NotificationContext } from "../../../../hooks/Contexts/NotificationContext";
import Footer from "../../../Layouts/Footer/Footer";
import TextInput from "../../../Util/TextInput/TextInput";

const BioForm = () => {

    const { authState, createUserFunction, checkValidMedia } = useContext(AuthContext);
    const { showNotif } = useContext(NotificationContext);
    const [ userBioDetails, setUserBioDetails ] = useState({
        profileImg: "",
        bannerImg: "",
        backImgLink: "",
        bio: "",
        pfUrl: ""
    })


    const navigate = useNavigate();

    useEffect(()=>{
        if(authState.isLoggedIn){
            navigate('/home');
        }
        if(!authState.filledSignUpForm){
            navigate('/signup');
        }
        
        // eslint-disable-next-line
    }, [])

    const formSubmitHandler = (event, authState) => {

        event.preventDefault();
        createUserFunction({...(authState.user), 
            bio: userBioDetails.bio, pfUrl: userBioDetails.pfUrl,  profileImg: userBioDetails.profileImg, backImgLink: userBioDetails.backImgLink, bannerImg: userBioDetails.bannerImg
        });
    }
    const changeProfileImgHandler = (event) => {
        const newImg = event.target.files[0];
        const {isValid, message} = checkValidMedia(newImg);
        if(isValid){
            setUserBioDetails(prevState => ({...prevState, profileImg: newImg}))
        }else{
            showNotif('Error', message);
            return;
        }
        
    }

    const changeBannerImgHandler = (event) => {
        const newImg = event.target.files[0];
        const {isValid, message} = checkValidMedia(newImg);
        if(isValid){
            setUserBioDetails(prevState => ({...prevState, bannerImg: newImg}))
        }else{
            showNotif('Error', message);
            return;
        }
    }

    const bioChangeHandler = (event) => {
        setUserBioDetails((prevState) => ({...prevState, bio: event.target.value}))
    }

    const pfUrlChangeHandler = (event) => {
        setUserBioDetails((prevState) => ({...prevState, pfUrl: event.target.value}))
    }

    return <div className="signupPage">
        <div className="signup-main">
            <p>Step 2 of 2</p>
            <h2>BioForm</h2>
            <form className="signup-form" onSubmit={(event)=>formSubmitHandler(event, authState)}>
                <div>
                    <div className="signup-card-bnr-div">
                        <span className="signup-card-bnr-span">
                            <img 
                            src={userBioDetails.bannerImg ? URL.createObjectURL(userBioDetails.bannerImg) : "/images/BannerImg/blank-banner.jpg"} 
                            alt={"Enter banner"} className="signup-card-bannerimg" />
                            <input type="file" onChange={changeBannerImgHandler} className="signup-bnr-input"/>
                        </span>
                        <div className="signup-card-imgdiv">
                            <img 
                            src={userBioDetails.profileImg ? URL.createObjectURL(userBioDetails.profileImg) : '/images/profileImg/default-user-image.png'} 
                            alt={"Enter Profile"} className="signup-card-img" />
                            <input type="file" onChange={changeProfileImgHandler} className="signup-pf-input"/>
                        </div>
                    </div>
                    <div className="signup-pfUrl-div">
                        <TextInput type="text" placeholder="Portfolio URL" maxLength="50" value={userBioDetails.pfUrl} onChange={pfUrlChangeHandler} />
                    </div>
                    <div className="signup-textarea-div">
                        <textarea value={userBioDetails.bio} onChange={bioChangeHandler} placeholder="Tell us something about yourself..." className="signup-textarea"/>
                    </div>
                </div>
                <div className="signup-btn-div">
                    <button type="reset" className="signup-submit" onClick={()=>navigate(-1)}>Go Back</button>
                    <button type="sumbit" className="signup-submit" >Create a user</button>
                    <button type="button" className="signup-login" onClick={()=>navigate('/login')}>Login instead?</button>
                </div>
            </form>
        </div>
        <Footer />
    </div>
};

export default BioForm;