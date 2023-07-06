import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import './EditUserProfileForm.css';
import { UserContext } from "../../../hooks/Contexts/UserContext";
import TextInput from "../TextInput/TextInput";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../hooks/Contexts/NotificationContext";

const EditUserProfileForm = () => {
    const { authState, checkValidMedia } = useContext(AuthContext);
    const { editUserFunction } = useContext(UserContext);
    const [ editUser, setEditUser ] = useState(authState.user);
    const navigate = useNavigate();
    const { showNotif } = useContext(NotificationContext);

    
    if(authState.user._id === "23722911-080f-4a3a-82bb-185caad7fb75"){
        navigate(`/user/${authState.user._id}`);
        showNotif("Error", "Cannot edit guest user. Create a new account.");
        
    }

    const formSubmitHandler = (event) =>{
        event.preventDefault();
        if((editUser.email.trim().length > 0 && authState.user.email.trim().length > 0) 
        || 
        (editUser.phNo.trim().length > 0 && editUser.dateOfBirth.trim().length > 0)){
            editUserFunction(editUser);
            
        }
    }

    useEffect(()=>{
        setEditUser(authState.user);// eslint-disable-next-line
    }, [authState.user._id]);

    const profileImgChangeHandler = (event) => {
        const newFile = event.target.files[0];
        if(checkValidMedia(newFile)){
            setEditUser(prevState => ({...prevState, profileImg: newFile}))
        }else{
            return;
        }
    }

    const bannerImgChangeHandler = (event) => {
        const newFile = event.target.files[0];
        if(checkValidMedia(newFile)){
            setEditUser(prevState => ({...prevState, bannerImg: newFile}))
        }else{
            return;
        }
    }

    // const backImgLinkChangeHandler = (event) => {
    //     const newFile = event.target.files[0];
    //     if(checkValidMedia(newFile)){
    //         setEditUser(prevState => ({...prevState, backImgLink: newFile}))
    //     }else{
    //         return;
    //     }
    // }

    return <>
        <h2>Edit Details</h2>
        <form className="edit-details-form" onSubmit={formSubmitHandler}>
            
            <span className="formedit-span-dn">
                <TextInput type="text" placeholder="Display Name" id="formedit-displayName" maxLength="50" required value={editUser.displayName} onChange={(event)=>setEditUser(prevState => ({...prevState, displayName: event.target.value}))} />
            </span>
            
            <span className="formedit-span-un">
                <TextInput type="text" placeholder="User Name" id="formedit-username"  maxLength="50" value={editUser.username} required  onChange={(event)=>setEditUser(prevState => ({...prevState, username: event.target.value}))} />
            </span>

            <span className="formedit-span-em">
                <TextInput type="email" placeholder="User Email" id="formedit-email"  value={editUser.email} onChange={(event)=>setEditUser(prevState => ({...prevState, email: event.target.value}))} />
            </span>
            
            <span className="formedit-span-ph">
                <TextInput type="tel" placeholder="Phone Number*" id="formedit-phno"  pattern="[0-9]{10}"  value={editUser.phNo} onChange={(event)=>setEditUser(prevState => ({...prevState, phNo: event.target.value}))} />
            </span>
            
            <span className="formedit-span-db">
                <TextInput type="date" id="formedit-dateOfBirth"  value={editUser.dateOfBirth.substring(0,10)}   onChange={(event)=>setEditUser(prevState => ({...prevState, dateOfBirth: event.target.value}))} />
            </span>
            
            <span className="formedit-span-im">
                <TextInput type="text" placeholder="Profile Image" id="formedit-imgLink" maxLength="150" value={editUser.profileImg.name} readOnly={true}/>
                <input type="file" className="formedit-file-input" onChange={profileImgChangeHandler} />
            </span>
            
            <span className="formedit-span-bm">
                <TextInput type="text" placeholder="Banner Image" maxLength="150" id="formedit-banimglink"  value={editUser.bannerImg.name} readOnly={true}/>
                <input type="file" className="formedit-file-input" onChange={bannerImgChangeHandler} />
            </span>

            <span className="formedit-span-bk">
                <TextInput type="text" placeholder="Portfolio URL" maxLength="150" id="formedit-pfUrl" value={editUser.pfUrl} onChange={(event)=>setEditUser(prevState => ({...prevState, pfUrl: event.target.value}))}  />
            </span>
            
            <span className="formedit-span-bi">
                <label htmlFor="formedit-bio">Bio</label>
                <textarea placeholder="Tell us more about yourself (optional)" maxLength="250" id="formedit-bio"  value={editUser.bio} onChange={(event)=>setEditUser(prevState => ({...prevState, bio: event.target.value}))}/>
            </span>
            
            <button type="sumbit" className="formedit-span-btn">Update</button>
        </form>
    </>
}

export default EditUserProfileForm;