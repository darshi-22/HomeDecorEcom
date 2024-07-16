import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#ffffff', color: '#333333' }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center" style={{ marginBottom: '20px', color: '#6c757d' }}>
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id} style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
                <div className="col-md-8">
                  <h5 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#333333' }}>{p.name}</h5>
                  <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>{p.description.substring(0, 30)}</p>
                  <p style={{ fontWeight: 'bold', color: '#28a745' }}>Price: ${p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                    style={{ borderRadius: '20px', padding: '5px 15px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333333' }}>Cart Summary</h2>
            <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>Total | Checkout | Payment</p>
            <hr style={{ margin: '15px 0', borderColor: '#dee2e6' }} />
            <h4 style={{ color: '#28a745', marginBottom: '20px' }}>Total: {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4 style={{ color: '#333333' }}>Current Address</h4>
                  <h5 style={{ color: '#6c757d' }}>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                    style={{ borderRadius: '20px', padding: '5px 15px', marginTop: '10px' }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                    style={{ borderRadius: '20px', padding: '5px 15px' }}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                    style={{ borderRadius: '20px', padding: '5px 15px' }}
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                    style={{ borderRadius: '20px', padding: '10px 20px', width: '100%', marginTop: '20px' }}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;