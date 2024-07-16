import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/UserMenu';

const Dashboard = () => {
  const [auth] = useAuth();

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
    card: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px',
      width: '100%',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    infoItem: {
      fontSize: '1.1rem',
      marginBottom: '10px',
      color: '#555',
    },
    label: {
      fontWeight: 'bold',
      marginRight: '10px',
      color: '#007bff',
    },
  };

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.menuColumn}>
            <UserMenu />
          </div>
          <div style={styles.contentColumn}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>User Profile</h3>
              <p style={styles.infoItem}>
                <span style={styles.label}>Name:</span>
                {auth?.user?.name}
              </p>
              <p style={styles.infoItem}>
                <span style={styles.label}>Email:</span>
                {auth?.user?.email}
              </p>
              <p style={styles.infoItem}>
                <span style={styles.label}>Address:</span>
                {auth?.user?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;