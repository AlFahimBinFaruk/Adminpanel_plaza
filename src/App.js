import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/AddProduct';
import ManageUser from './pages/ManageUser';
import CategoryList from './pages/CategoryList';
import ManageCategory from './pages/ManageCategory';
import ProductList from './pages/ProductsList';
import UpdateProduct from './pages/UpdateProduct';
import UserList from './pages/UserList';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Alert from './components/Alert';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      {/* <Login/> */}
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
              <Route path="/" element={<Home/>}/>
              <Route path="/product-list" element={<ProductList/>}/>
              <Route path="/add-product" element={<AddProduct/>}/>
              <Route path="/update-product" element={<UpdateProduct/>}/>
              <Route path="/category-list" element={<CategoryList/>}/>
              <Route path="/manage-category" element={<ManageCategory/>}/>
              <Route path="/user-list" element={<UserList/>}/>
              <Route path="/manage-user" element={<ManageUser/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
            
          </div>
        </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
