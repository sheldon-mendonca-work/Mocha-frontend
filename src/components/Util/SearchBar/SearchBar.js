import { useNavigate } from "react-router-dom";
import { CrossIcon2, SearchIcon } from "../Icons";
import './SearchBar.css';
import '../UserDetailSmall/UserDetailSmall.css'
import { useContext } from "react";
import { UserContext } from "../../../hooks/Contexts/UserContext";

const SearchBar = (props) => {

    const { searchList, setSearchList, getSearchUserList } = useContext(UserContext);
    const navigate = useNavigate();

    const inputArea = document.querySelector(".searchInput");

    const inputChangeHandler = (event) => {
        getSearchUserList(event.target.value);        
    }

    const clearHandler = () => {
        setSearchList([]);
        document.querySelector(".searchInput").value="";
    }

    const searchListClickHandler = (event, url) => {
        event.stopPropagation();
        clearHandler();
        navigate(url);
    }

    const SearchBackdrop = (props) => {
        return <div {...props} className={`${props.className} searchbackdrop`}></div>
    }

    const {placeholder } = props;
    return <>
        <div className="searchBar">
            <div className="searchInputs">
                
            {searchList.length === 0 && <SearchIcon className={"searchIcon"} />}
            {searchList.length > 0 && <CrossIcon2 onClick={clearHandler} className={"searchIcon"} />}
                <input type="text" className="searchInput" placeholder={placeholder} onChange={inputChangeHandler}/>

                

            </div>
            
            {searchList.length > 0 && inputArea.focus && <div className="dataResult">
                
                {
                    searchList.map((user) => {
                        const { _id, displayName, username, profileImg } = user;
                        return <div onClick={(event)=>searchListClickHandler(event, `/user/${_id}`)} className="searchItem" key={_id}>
                            <span className="userdetailsmall-imgspan">
                                <img src={profileImg.name} alt={`@${username}`} className="userdetailsmall-img" />
                            </span>
                            <div className="userdetailsmall-content">
                                <span className="userdetailsmall-info">
                                    <span className="userdetailsmall-info-names">
                                        <span className="userdetailsmall-info-disname">{displayName}</span>
                                        <span className="userdetailsmall-info-username">@{username}</span>
                                    </span>
                                </span>
                            </div>
                        </div> 
                    })
                }
            </div>}

        </div>
        {searchList.length > 0 && <SearchBackdrop onClick={()=>setSearchList([])}/>}
    </>
}

export default SearchBar;
