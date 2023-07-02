import { Route, Routes } from "react-router";
import HomePage from "../Pages/HomePage/HomePage";
import RequiresAuth from "./RequiresAuth";
import Login from "../Pages/Login/Login";
import LandingPage from "../Pages/LandingPage/LandingPage";
import SignUpForm from "../Pages/SignUp/SignUpForm/SignUpForm";
import BioForm from "../Pages/SignUp/BioForm/BioForm";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import SinglePost from "../Pages/SinglePost/SinglePost";
import UserProfile from "../Pages/UserProfile/UserProfile";
import CreatePost from "../Pages/CreatePost/CreatePost";

const AllRoutes = () => {
    return <Routes>
        <Route path='/' element={<LandingPage />}/>
        
        <Route 
            path='/home' 
            element={<HomePage />}
        />

        <Route path='/login' element={<Login />} />
        
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/bioform' element={<BioForm />} />
        <Route path="/post/:postID" element={<SinglePost />} />
        <Route path="/post/:postID/:typeID" element={<SinglePost />} />
        <Route path="/user/:userID" element={<UserProfile />} />
        <Route path="/user/:userID/:typeID" element={<UserProfile />} />
        <Route path="/compose" element={<RequiresAuth><CreatePost /></RequiresAuth>} />
        <Route path='*' element={<PageNotFound />} />
    </Routes>;
};

export default AllRoutes;