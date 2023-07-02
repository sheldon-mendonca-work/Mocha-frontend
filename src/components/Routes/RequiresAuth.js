import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../hooks/Contexts/AuthContext";

const RequiresAuth = (props) => {
    const location = useLocation();
    const {children} = props;
    const { authState } = useContext(AuthContext);

    return <>
    {authState.isLoggedIn ? children : <Navigate to="/login" state={{from: location}}/>}
    </>
}

export default RequiresAuth;