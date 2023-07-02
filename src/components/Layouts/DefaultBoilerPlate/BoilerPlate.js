import Header from '../Header/Header';
import './BoilerPlate.css';
import RightSideBar from '../RightSideBar/RightSideBar';
import SearchBar from '../../Util/SearchBar/SearchBar';
import PageHeading from '../PageHeading/PageHeading';


const BoilerPlate = ({children, className}) => {

    return <div className={`boilerPlate ${className}`}>
        <Header className={'header'}/>
        <PageHeading />
        <main className={'mainContent'}>
            {children}
        </main>
        <SearchBar placeholder="Search"/>
        <RightSideBar className={'rightsidebar'}/>
    </div>
};

export default BoilerPlate;