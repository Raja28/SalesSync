import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
    const { accessToken } = useSelector(state => state.user)

    if (accessToken) {
        return children
    } else {
        return <Navigate to="/" />
    }
}