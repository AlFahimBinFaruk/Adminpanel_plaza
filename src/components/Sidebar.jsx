import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="mt-3 vh-100">
            <h5 className="text-center">Plaza</h5>

            <div className="custom-sidebar-menus ms-3 mt-5">
                <Link to="/"><h6>Dashboard</h6></Link>
                <Link to="/user-list"><h6>User List</h6></Link>
                <Link to="/category-list"><h6>Category List</h6></Link>
                <Link to="/product-list"><h6>Product List</h6></Link>
            </div>
        </div>
    )
}