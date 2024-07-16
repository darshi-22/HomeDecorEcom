import React from "react";
import Layout from "../components/Layout";

const Policy = () => {
  const styles = {
    container: {
      display: 'flex',
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    imageContainer: {
      flex: '1',
      marginRight: '30px',
    },
    image: {
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    content: {
      flex: '1',
    },
    heading: {
      fontSize: '1.8rem',
      marginBottom: '10px',
      color: '#333',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#555',
      marginBottom: '10px',
    },
  };

  return (
    <Layout title={"Terms & Policy - Cara Home Decor"}>
      <br/><br/>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img
            src="/images/contactus.jpeg"
            alt="Cara Home Decor Policy"
            style={styles.image}
          />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>Terms & Policies</h1>
          <br/> 
          <p style={styles.paragraph}>
            Welcome to Cara Home Decor. By using our services, you agree to these terms:
          </p>
          <p style={styles.paragraph}>
            • Website content is for general information and may change without notice.
          </p>
          <p style={styles.paragraph}>
            • We aim for accurate product descriptions but don't guarantee complete accuracy.
          </p>
          <p style={styles.paragraph}>
            • Prices and availability may change. We may modify or discontinue products.
          </p>
          <p style={styles.paragraph}>
            • Your privacy is protected as per our Privacy Policy.
          </p>
          <p style={styles.paragraph}>
            This is a brief overview. For complete terms, see our full policy on the website.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;