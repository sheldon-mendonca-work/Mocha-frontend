import { LoadingIcon } from '../../Util/Icons';
import './LoaderPage.css';

export default function LoaderPage(){

    return <div className="loaderPage">
        <div className='loader'>
            <LoadingIcon className="loader-svg"/>
        </div>
    </div>
}