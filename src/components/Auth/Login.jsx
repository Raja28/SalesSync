import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLogin } from "../../feature/userSlice";

export function Login() {
    const [userLoginData, setUserLoginData] = useState({
        username: "",
        password: ""
    });
    const { user, status } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserLoginData({
            ...userLoginData,
            [name]: value
        });
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await dispatch(userLogin(userLoginData)).unwrap();
            
            if (response?.accessToken) {
                toast.success("Login successful!");
                // Redirect to the home page after successful login
                navigate("/dashboard");
            } else {
                console.error("Login failed:", response?.payload);
            }
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        }
    }
    return (
        <>
            <section className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4 rounded-5" style={{ width: "30rem" }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin} className="mt-5">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username <sup>*</sup></label>
                            <input type="username"
                                className="form-control"
                                id="username"
                                placeholder="Enter your email"
                                required
                                name="username"
                                onChange={handleChange}
                                disabled={status === "loading"}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password <sup>*</sup></label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                required
                                name="password"
                                onChange={handleChange}
                                disabled={status === "loading"}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 my-4"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

            </section>
        </>
    )
}