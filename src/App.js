import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/product/AddProduct';
import ManageUser from './pages/user/ManageUser';
import CategoryList from './pages/category/CategoryList';
import AddCategory from './pages/category/AddCategory';
import ProductList from './pages/product/ProductList';
import UpdateProduct from './pages/product/UpdateProduct';
import UserList from './pages/user/UserList';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toast CSS
import { useGetMyProfileQuery } from './services/user_api';
import UpdateCategory from './pages/category/UpdateCategory';

function App() {
  const { data: details, error, isLoading } = useGetMyProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="app">
      <BrowserRouter>
        {details && details.email ? (
          <div className="admin-panel">
            <div className="custom-sidebar">
              <Sidebar />
            </div>
            <div className="main-content">
              <nav className="custom-navbar">
                <Navbar />
              </nav>
              <div className="custom-content">
                <Routes>
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/" element={<Home />} />

                  {/* product */}
                  <Route path="/product-list" element={<ProductList />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/update-product/:product_id" element={<UpdateProduct />} />

                  {/* category */}
                  <Route path="/category-list" element={<CategoryList />} />
                  <Route path="/add-category" element={<AddCategory />} />
                  <Route path="/update/category/:category_id" element={<UpdateCategory/>}/>

                  {/* user */}
                  <Route path="/user-list" element={<UserList />} />
                  <Route path="/manage-user/:user_id" element={<ManageUser />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
