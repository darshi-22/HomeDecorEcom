import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -15px',
    },
    menuColumn: {
      flex: '0 0 25%',
      maxWidth: '25%',
      padding: '0 15px',
    },
    contentColumn: {
      flex: '0 0 75%',
      maxWidth: '75%',
      padding: '0 15px',
    },
    title: {
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    orderCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#f8f9fa',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #dee2e6',
      color: '#333',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #dee2e6',
      color: '#555',
    },
    productCard: {
      display: 'flex',
      padding: '15px',
      borderBottom: '1px solid #eee',
    },
    productImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      marginRight: '15px',
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    productDescription: {
      fontSize: '0.9rem',
      color: '#666',
      marginBottom: '5px',
    },
    productPrice: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#28a745',
    },
  };

  return (
    <Layout title={"Your Orders"}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.menuColumn}>
            <UserMenu />
          </div>
          <div style={styles.contentColumn}>
            <h1 style={styles.title}>All Orders</h1>
            {orders?.map((o, i) => (
              <div style={styles.orderCard} key={o._id}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      {['#', 'Status', 'Buyer', 'Date', 'Payment', 'Quantity'].map((header) => (
                        <th key={header} style={styles.th}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.td}>{i + 1}</td>
                      <td style={styles.td}>{o?.status}</td>
                      <td style={styles.td}>{o?.buyer?.name}</td>
                      <td style={styles.td}>{moment(o?.createAt).fromNow()}</td>
                      <td style={styles.td}>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td style={styles.td}>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  {o?.products?.map((p) => (
                    <div style={styles.productCard} key={p._id}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        style={styles.productImage}
                      />
                      <div style={styles.productInfo}>
                        <p style={styles.productName}>{p.name}</p>
                        <p style={styles.productDescription}>{p.description.substring(0, 30)}</p>
                        <p style={styles.productPrice}>Price: ${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;