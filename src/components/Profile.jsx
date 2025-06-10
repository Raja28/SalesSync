import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUserSlice } from "../feature/userSlice";
export function Profile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function logoutHandler() {
        sessionStorage.clear();
        dispatch(clearUserSlice())
    }
    return (
        <div className="min-vh-100 border container">
            <div className="d-flex align-items-center my-4">
                <Link to="/dashboard">
                    <IoArrowBackCircleOutline className="fs-3" />
                </Link>
                <h3 className="w-100 text-center">Profile</h3>
            </div>
            <div>
                <div className="card mx-auto my-5" style={{ width: "18rem" }}>
                    <img src={user?.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-center">{user?.username}</h5>
                        <p className="card-text">{user?.email}</p>
                        <button onClick={logoutHandler} className="btn btn-primary mx-auto w-100">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}