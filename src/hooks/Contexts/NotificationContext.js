import { createContext, useState } from "react";
import { ErrorIcon, SuccessIcon, UserLogInIcon, UserLogOutIcon, WarningIcon } from "../../components/Util/Icons";
import EditUserProfileForm from "../../components/Util/EditUserProfileForm/EditUserProfileForm";
import FollowerListCard from "../../components/Cards/FollowerListCard/FollowerListCard";
import PostListCard from "../../components/Cards/FollowerListCard/PostListCard";

export const NotificationContext = createContext();

let initState = {
    errorType : "Default",
    errorMsg : "Some error Occured",
    fillColor : "#00529B",
    backColor : "#DFF2BF",
    svgType : <WarningIcon className="done" fill="#00529B"/>,
};

export const NotficationProvider = ({children}) => {
    const [ notif, setNotif ] = useState(initState);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ backDropVisible, setBackDropVisible ] = useState(false);
    const [ backDropCardVisible, setBackDropCardVisible ] = useState(false);
    const [ backdropCardContent, setBackdropCardContent ] = useState("");


    const showNotif = (notifType, notifMsg) => {
        let errorType = "", errorMsg = "", fillColor = "", backColor = "", svgType = "";
        const notification = document.querySelector(".notification");
        const progress = document.querySelector(".progress");
        const close = document.querySelector(".close");
        
        notification.classList.remove("active");
        progress.classList.remove("active");
        
        errorType = notifType;
        errorMsg = notifMsg;
        switch(notifType){
            case "Success":
                fillColor = "#270";
                backColor = "#DFF2BF";
                svgType = <SuccessIcon className="done" fill={fillColor}/>
                break;
            
            case "Error" : 
                fillColor = "#D8000C";
                backColor = "#FFBABA";
                svgType = <ErrorIcon className="done" fill={fillColor} />
                break;

            case "UserLogin" : 
                fillColor = "#059";
                backColor = "#BEF";
                svgType = <UserLogInIcon className="done" fill={fillColor} />
                break;

            case "UserLogout" : 
                fillColor = "#9F6000";
                backColor = "#FEEFB3";
                svgType = <UserLogOutIcon className="done" fill={fillColor} />
                break;

            
            default: 
                fillColor = "#00529B";
                backColor = "#BDE5F8";
                svgType = <WarningIcon className="done" fill={fillColor} />;
                break;
        }

        setNotif({
            "errorType" : errorType,
            "errorMsg" : errorMsg,
            "fillColor" : fillColor,
            "backColor" : backColor,
            "svgType" : svgType
        })

        notification.classList.add("active");
        progress.classList.add("active");

        setTimeout(()=>{
            notification.classList.remove("active");
            progress.classList.remove("active");
            setTimeout(()=>setNotif(initState), 210);
        }, 2000);

        close.addEventListener("click", ()=>{
            
            setTimeout(()=>{
                notification.classList.remove("active");
                progress.classList.remove("active");
                setNotif(initState)
            }, 0);
        })
    }

    const showBackDropCard = (type) => {
        setBackDropCardVisible(true);
        switch (type) {
            case "form":
                setBackdropCardContent(<EditUserProfileForm />);
                break;
            
            case "followers":
                setBackdropCardContent(<FollowerListCard content={'followers'}/>);
                break;

            case "posts":
                setBackdropCardContent(<PostListCard content={'posts'}/>);
                break;

            default:
                setBackdropCardContent("");
                break;
        }
    }

    return <NotificationContext.Provider value={{ notif, setNotif, isLoading, setIsLoading, showNotif, backDropCardVisible, setBackDropCardVisible, showBackDropCard, backdropCardContent, setBackdropCardContent, backDropVisible, setBackDropVisible }}>
        {children}
    </NotificationContext.Provider>
}