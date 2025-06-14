// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
    const { accessToken } = useSelector((state) => state.user)

    if (accessToken === null) {
        return children
    } else {
        return <Navigate to="/dashboard" />
    }
}

export default OpenRoute