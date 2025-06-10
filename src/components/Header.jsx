import { Link } from "react-router-dom";
import salesSync_logo from "../assets/sales_sync_logo.png"
import { useSelector } from "react-redux";
{/* img src={"https://dummyjson.com/icon/emilys/128"} */ }
export function Header() {
    const { user } = useSelector((state) => state.user);
    return (
        <header className="border " style={{ height: "4rem" }}>
            <nav className="h-100 ">
                <div className="container d-flex justify-content-between align-items-center h-100">
                    <Link to={'/'} className="" style={{ maxWidth: "10rem" }}>
                        <img src={salesSync_logo}
                            alt="sales sync logo"
                            className="w-100 h-100 rounded img-fluid"
                        />
                    </Link>
                    {
                        user?.accessToken && <div className="rounded-circle" >
                            <div style={{ maxWidth: "2.5rem" }}>
                                <Link to={'/dashboard/profile'} className="" >
                                    <
                                        img src={user?.image}
                                        alt="user logo"
                                        className="w-100 h-100 img-fluid rounded-circle"
                                    />
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}