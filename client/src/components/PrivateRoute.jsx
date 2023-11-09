
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"






export default function PrivateRoute() {
    const {currentUser} = useSelector((stste => stste.user))
    return currentUser ? <Outlet/> : <Navigate to='/sign-in' />;
   
}
