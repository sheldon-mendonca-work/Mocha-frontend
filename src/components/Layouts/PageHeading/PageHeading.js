import { useLocation, useNavigate } from 'react-router-dom';
import './PageHeading.css';
import { useContext } from 'react';
import { UserContext } from '../../../hooks/Contexts/UserContext';
import { LeftArrowIcon } from '../../Util/Icons';

const PageHeading = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const title = location.pathname.split('/')[1];
    const { userProfile } = useContext(UserContext)
    
    const getTitle = () => {
        switch (title) {
            case 'home':
                return 'Home';
        
            case 'post':
                return 'Tweet';

            case 'user':
                return userProfile.displayName;

            default:
                return 'Home';
        }
    }
    
    
    return <div className="boilerPlateHeading">
        {title !== 'home' && <LeftArrowIcon className="heading-svg" onClick={()=>navigate(-1)}/>}
        <h2 className="heading2">{getTitle(title)}</h2>
    </div>
}

export default PageHeading;