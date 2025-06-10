import { Login } from "./components/Auth/Login"
import { Header } from "./components/Header"
import { Routes, Route } from "react-router-dom"
import OpenRoute from "./components/Auth/OpenRoute"
import { Dashboard } from "./components/Dashboard"
import { PrivateRoute } from "./components/Auth/PrivateRoute"
import { ProductDetail } from "./components/ProductDetail"
import { Profile } from "./components/Profile"

function App() {


  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/product-details/:productId" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App
