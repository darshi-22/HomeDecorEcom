import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/authStyle.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const backgroundImageUrl = "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg";

  return (
    <Layout title="Login - Ecommer App">
      <div 
        className="form-container"
        style={{
          backgroundImage: `url("${backgroundImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: 'calc(100vh - 64px)', // Adjust this value based on your header height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-1px', // This removes the tiny gap that might appear
        }}
      >
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
        }}>
          <h4 className="title" style={{textAlign: 'center', marginBottom: '1rem'}}>LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => {
                navigate('/forgot-password');
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;