import './Footer.css';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../../Util/Icons';
import { NotificationContext } from '../../../hooks/Contexts/NotificationContext';
import { useContext } from 'react';

const Footer = () => {
    const {showNotif} = useContext(NotificationContext);

    const copyClipboardClickHandler = async () => {
        try {
            await navigator.clipboard.writeText("sheldonmendoncawork123@gmail.com");
            showNotif('Success', 'Content copied to clipboard');
        } catch (err) {
            showNotif('Error', ''`Failed to copy: ${err}`);
        }
    }

    return <footer className={'footer'}>
        <ul className={'footerLinks'}>
            <div className={'footerContact'}>Contact</div>
        
            <li >
                <a href="https://github.com/sheldon-mendonca-work" 
                target="_blank" rel="noreferrer noopener">
                    <GitHubIcon className={'footerNavIcon'} />
                </a>
            </li>
            <li >
                <div onClick={copyClipboardClickHandler}>
                    <MailIcon className={'footerNavIcon'}/>
                </div>
            </li>
            <li >
                <a href="https://in.linkedin.com/in/sheldon-mendonca" target="_blank" rel="noreferrer noopener">
                    <LinkedInIcon className={'footerNavIcon'}/>
                </a>
            </li>
        </ul>
        <p  className={'footerCopyright'}>Done by Sheldon. For any suggestions, do contact me by the links above.</p>
    </footer>
}

export default Footer;