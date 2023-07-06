import { useContext, useEffect } from 'react';
import ButtonRounded from '../ButtonRounded/ButtonRounded';
import './TweetForm.css';
import { PostContext } from '../../../hooks/Contexts/PostContext';
import { AuthContext } from '../../../hooks/Contexts/AuthContext';
import { CrossIcon,  ImageIcon } from '../Icons';
import { NotificationContext } from '../../../hooks/Contexts/NotificationContext';
// import { useLocation, useNavigate } from 'react-router-dom';

const TweetForm = (props) => {
    
    const { className } = props;
    const { createPostFunction, postTweet, setPostTweet, editPostFunction } = useContext(PostContext);
    const { authState, checkValidMedia } = useContext(AuthContext);
    const { user } = authState;
    const { showNotif } = useContext(NotificationContext);
    // const location = useLocation();
    // const navigate = useNavigate();

    useEffect(()=> {
        const element = document.querySelector(".tweetform-input-div"), inputElement = document.querySelector(".tweetform-input");
        element.style.height = "1px";
        element.style.height = ( 20+ inputElement.scrollHeight)+"px";
        
    }, [postTweet.post.postDec])
    
    const postIsValid = () =>{
        if((postTweet.post.postDec.length > 0 && postTweet.post.postDec.length < 300)|| postTweet.post.postImgLink.length > 0){
            return true;
        }else{
            return false;
        }
    }

    const tweetSubmitHandler = (event) => {
        event.preventDefault();
        if(!postIsValid()){
            if(postTweet.parent === null){
                showNotif('Error',"Invalid Post");
            }else{
                showNotif('Error',"Invalid Comment");
            }
            return;
        }
        
        if(postTweet.post._id.length > 0){
            editPostFunction(postTweet.post._id);
        }else{
            createPostFunction();
        }
        return;
    }

    const tweetInputChangeHandler = (event) => {
        setPostTweet(prevState => {
            return {
                ...prevState,
                post: {...prevState.post, postDec : event.target.value}
            }
        })
    }

    const mediaRemoveHandler = (event, mediaID) => {
        event.stopPropagation();
        setPostTweet(prevState => {
            return {
                ...prevState,
                post: {...prevState.post, postImgLink : prevState.post.postImgLink.filter(({_id}) => (_id !== mediaID))}
            }
        })
    }

    const addFileInputChangeHandler = (event) => {
        event.stopPropagation();
        const media = event.target.files[0];
        if(postTweet.post.postImgLink.length >= 6){
            showNotif('Error', "Can accept upto 5 files.");
            return;
        }
        const {isValid, message} = checkValidMedia(media);
        if(isValid){

            setPostTweet(prevState => {
                return {
                    ...prevState,
                    post: {...prevState.post, postImgLink : [...prevState.post.postImgLink, media]}
                }
            })

        }else{
            showNotif('Error', message);
            return;
        }
    }

    return <form className={`tweetform ${className}`} onSubmit={(event)=>tweetSubmitHandler(event)}>
        <img src={user.profileImg.name} className='tweetform-userimg' alt={user.displayName}/>
        <div className='tweetform-input-div'>
            <textarea rows={2} maxLength={300} className='tweetform-input' onChange={tweetInputChangeHandler} value={postTweet.post.postDec} placeholder='Thoughts?'/>
        </div>
        <div className='tweetform-media'>
            {
                postTweet.post.postImgLink.length > 0 &&  postTweet.post.postImgLink.map((item, index) => <div  key={item._id ?? index} className='tweetform-media-item'>
                <span>{item.name}</span>
                <CrossIcon className={'tweetform-media-cross'} onClick={(event) => mediaRemoveHandler(event, item._id)}/>
                </div>)
            }
        </div>
        <div className='tweetform-actions'>
            
            <span className='tweetform-actions-left'>
                <span className='tweetform-fileInputspan'><ImageIcon className="form-icon"/>
                <input type='file' className='tweetform-fileInput' onChange={addFileInputChangeHandler}  multiple/></span>
                {/* <span className='tweetform-fileInputspan'><EmojiIcon className="form-icon"/>
                </span> */}
            </span>
            <ButtonRounded className={`tweetform-submit ${postIsValid() ? 'validForm' : "invalidForm"}`} type="submit">Tweet</ButtonRounded>
        </div>
    </form>
}

export default TweetForm;


