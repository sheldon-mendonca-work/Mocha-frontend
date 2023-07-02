import UserDetailSmall from "../UserDetailSmall/UserDetailSmall";
import './ScrollUser.css'

const ScrollUser = (props) => {
    const { userList } = props;

    return <>
    {
        userList.length === 0 && <div className="scrolluser-notfound">No users found</div>
    }
    {
        userList.length > 0 && userList.map((item) => <UserDetailSmall key={item._id} item={item} />)
    }
</>
}

export default ScrollUser;