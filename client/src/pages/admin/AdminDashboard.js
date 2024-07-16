import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/AdminMenu';

const AdminDashboard = () => {
  const [auth] = useAuth();

  const containerStyle = {
    margin: '1rem',
    padding: '1rem'
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  };

  const colMenuStyle = {
    flex: '0 0 25%',
    maxWidth: '25%'
  };

  const colContentStyle = {
    flex: '0 0 75%',
    maxWidth: '75%'
  };

  const cardStyle = {
    width: '75%',
    padding: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '4px',
    backgroundColor: '#f8f9fa'
  };

  const headerStyle = {
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
    color: '#333'
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <div style={rowStyle}>
          <div style={colMenuStyle}>
            <AdminMenu />
          </div>
          <div style={colContentStyle}>
            <div style={cardStyle}>
              <h3 style={headerStyle}> Admin Name : {auth?.user?.name}</h3>
              <h3 style={headerStyle}> Admin Email : {auth?.user?.email}</h3>
              <h3 style={headerStyle}> Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;