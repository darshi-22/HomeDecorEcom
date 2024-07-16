import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth.js";
import toast from "react-hot-toast";
import SearchInput from "./Form/SearchInput.js";
import useCategory from "../hooks/useCategory.js";
import { useCart } from "../context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#333333' }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={{ color: '#ffffff', marginRight: '2rem' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🛒</span>
              <span style={{ letterSpacing: '2px', fontStyle: 'italic', fontWeight: 'bold', color: '#ffffff' }}>Cara</span>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item me-3">
                <SearchInput />
              </li>
              <li className="nav-item me-3">
                <NavLink to="/" className="nav-link" style={{ color: '#ffffff' }}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown me-3">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{ color: '#ffffff' }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" style={{ backgroundColor: '#444444' }}>
                  <li>
                    <Link className="dropdown-item" to={"/categories"} style={{ color: '#ffffff' }}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                        style={{ color: '#ffffff' }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item me-3">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown me-3">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none", color: '#ffffff' }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu" style={{ backgroundColor: '#444444' }}>
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                          style={{ color: '#ffffff' }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                          style={{ color: '#ffffff' }}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link" style={{ color: '#ffffff' }}>
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;