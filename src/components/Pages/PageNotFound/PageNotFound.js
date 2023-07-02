import { Link } from 'react-router-dom';
import './PageNotFound.css'
import Footer from '../../Layouts/Footer/Footer';

const PageNotFound = () => {
    return <>
        <div className="notFoundContainer">
            <div className="containerLeft">
                <img src={"images/2456052.jpg"} alt={"Page Not Found"} className="containerLeftImg" />
            </div>
            <div className="containerRight">
                <h2>Error 404 : Page Not Found</h2>
                <p>Looks like the page/item you are looking for was not found. Go to <Link to="/" className="notFoundLink">Home Page instead?</Link></p>
            </div>
        </div>
        <Footer />
    </>
}

export default PageNotFound;