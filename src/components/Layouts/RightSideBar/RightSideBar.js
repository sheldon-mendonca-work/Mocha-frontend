import { useContext } from 'react';
import './RightSideBar.css'
import { AuthContext } from '../../../hooks/Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import Footer from '../Footer/Footer';
import UserDetailSmall from '../../Util/UserDetailSmall/UserDetailSmall';

const RightSideBar = (props) => {
    const { className } = props;
    const { authState, notFollowList } = useContext(AuthContext); 
    const navigate = useNavigate();

    const SignUpDiv = () => {

            return <div className='rightsidebar-box'>
                <h2 className='rightsidebar-heading2'>New to Mocha?</h2>
                <p className='rightsidebar-subtext'>Sign up now to get your own personalized timeline!</p>
                <div className='rightsidebar-btn-div'>
                    <button onClick={()=>navigate('/signup')} className='rightsidebar-btn' >Sign up with email</button>
                    <button onClick={()=>navigate('/signup')} className='rightsidebar-btn' >Sign up with phone</button>
                </div>
            </div>
    } 

    const UserNotFollowDiv = () => {
        return <div className='rightsidebar-box'>
                <h2 className='rightsidebar-heading2'>Who to follow</h2>
                <div>
                    {
                        notFollowList.length === 0 && <div className='rightsidebar-nofollow'>Looks like there is no one to follow...</div>
                    }
                    {
                        notFollowList.length > 0 && notFollowList.map(user => (
                            <UserDetailSmall key={user._id} item={user}/>
                        ))
                    }
                </div>
            </div>
    }

    return <div className={className}>
        <div className="rightsidebar-content">
            
            {
                authState.isLoggedIn ? <UserNotFollowDiv />: <SignUpDiv /> 
            }
            
        </div>
        {/* <Footer /> */}
    </div>
}

export default RightSideBar;