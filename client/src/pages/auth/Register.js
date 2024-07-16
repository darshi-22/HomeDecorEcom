import React, { useState } from "react";
import Layout from "../../components/Layout"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/authStyle.css"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
    <Layout title="Register - Ecommer App">
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
          <h4 className="title" style={{textAlign: 'center', marginBottom: '1rem'}}>REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
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
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;