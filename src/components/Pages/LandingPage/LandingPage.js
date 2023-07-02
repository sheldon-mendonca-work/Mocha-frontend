import { useNavigate } from "react-router-dom";
import Footer from "../../Layouts/Footer/Footer";
import './LandingPage.css'
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import { MochaIcon } from "../../Util/Icons";

const LandingPage = () => {
    
    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);

    useEffect(()=>{
        if(authState.isLoggedIn){
            navigate('/home');
        }// eslint-disable-next-line 
    }, [])

    return <div className="landingPage">
        <main className="landingPageMain">
            <div className="landing-welcome-img">
                <MochaIcon className="landing-mocha"/>
            </div>
            <div className="landingPage-right">
                <span className="landingPage-right-content">
                    <h1>Mocha</h1>
                    <h2>The communication Express</h2>
                
                <p><span className="landing-user-count">30,000+</span> users and counting.....</p>
                <span className="landingPage-right-btndiv">
                    <button className="landingPage-right-signup" onClick={()=>navigate('/signup', {state: '/'})}>Join Now</button>
                    <button className="landingPage-right-login" onClick={()=>navigate('/login', {state: '/'})}>Login</button>
                </span>
                </span>
            </div>
        </main>
        <Footer />
    </div>
};

export default LandingPage;