import { useContext, useEffect, useState } from "react";
import { DeletePostIcon, EditPostIcon, ExpandMoreIcon, FollowIcon, UnFollowIcon } from "../../Util/Icons"
import './ExpandMoreCard.css';
import { createPopper } from '@popperjs/core';
import { AuthContext } from "../../../hooks/Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../../hooks/Contexts/PostContext";

const ExpandMoreCard = (props) => {
    const { className, value } = props;
    const id = value.postID;
    const [ showExpMore, setShowExpMore ] = useState(false);
    const { authState } = useContext(AuthContext);
    const { deletePostFunction, userPosts, setPostTweet } = useContext(PostContext);
    const navigate = useNavigate();

    const expandClickHandler = (event) => {
        event.stopPropagation();
        setShowExpMore(prevState => !prevState);
    }
    
    const editPostFunction = (event) => {
        event.stopPropagation();

        setShowExpMore(prevState => !prevState);

        const currPost = userPosts.find(({_id})=> _id === value.postID);
        let parentPostObj = undefined;
        
        if(currPost.parentPost !== null){
            parentPostObj = userPosts.find(({_id})=> _id === currPost.parentPost);
        }
        
        if(parentPostObj === undefined) parentPostObj = {_id: null};
        setPostTweet({post: currPost, parent: parentPostObj});
        navigate('/compose')
    }

    const deletePostHandler = (event) => {
        event.stopPropagation();
        deletePostFunction(value.postID);
    }

    const loginHandler = (event) => {
        event.stopPropagation();
        navigate('/login')
    }

    useEffect(()=>{
        const popcorn = document.querySelector(`.expandmoreicon-${id}`);
        const tooltip = document.querySelector(`.expand-${id}`);
    
        createPopper(popcorn, tooltip, {
            placement: 'bottom-end',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
            ],
        }); // eslint-disable-next-line
    }, [showExpMore])

    const ExpandMoreContent = ({className}) => {
        if(authState.isLoggedIn){
            if(authState.user._id === value.userID){
                return <div className={`expandmorecontent ${className} expand-${id}`}>
                    <p className={`expand-content`} onClick={editPostFunction}><EditPostIcon className={'expand-content-svg'}/>Edit Post</p>
                    <p className={`expand-content`} onClick={deletePostHandler}><DeletePostIcon className={'expand-content-svg'}/>Delete Post</p>
                </div>
            }else{
                if(authState.user.following.indexOf(id) !== -1){
                    return <div className={`expandmorecontent ${className} expand-${id}`}>
                        <p className={`expand-content`}><FollowIcon className={'expand-content-svg'}/>Follow @{value.username}</p>
                    </div>
                }else{
                    return <div className={`expandmorecontent ${className} expand-${id}`}>
                        <p className={`expand-content`}><UnFollowIcon className={'expand-content-svg'}/>Unfollow @{value.username}</p>
                    </div>
                }
                
            }
        }else{
            return <div className={`expandmorecontent ${className} expand-${id}`}>
            <p onClick={loginHandler} className={`expand-content`}>Login</p>
        </div>
        }
        
    }

    const ExpandMoreBackdrop = (props) => {
        return <div {...props} className={`${props.className} expandbackdrop`}></div>
    }

    return <>
        <div className='expandmorecard'>
            <ExpandMoreIcon className={`expandmoreicon-${id} exi ${className}`} onClick={expandClickHandler} />
        </div>
        { showExpMore && <ExpandMoreContent  />}
        { showExpMore && <ExpandMoreBackdrop onClick={expandClickHandler}/>}
    </>
}

export default ExpandMoreCard;