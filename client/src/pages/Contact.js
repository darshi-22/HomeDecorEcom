import React from "react";
import Layout from "../components/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  const styles = {
    container: {
      display: 'flex',
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    imageContainer: {
      flex: '1',
      marginRight: '40px',
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
      fontSize: '2.2rem',
      marginBottom: '20px',
      color: '#fff',
      backgroundColor: '#333',
      padding: '10px',
      textAlign: 'center',
      borderRadius: '5px',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#555',
      marginBottom: '20px',
    },
    contactInfo: {
      fontSize: '1.1rem',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      marginRight: '10px',
      fontSize: '1.3rem',
      color: '#333',
    },
  };

  return (
    <Layout title={"Contact Us - Cara Home Decor"}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img
            src="/images/contactus.jpeg"
            alt="Contact Cara Home Decor"
            style={styles.image}
          />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>CONTACT US</h1>
          <p style={styles.paragraph}>
            We're here to help! If you have any questions about our products, 
            need assistance with an order, or want to learn more about Cara's 
            home decor offerings, please don't hesitate to reach out. Our 
            dedicated customer support team is available to assist you.
          </p>
          <div style={styles.contactInfo}>
            <BiMailSend style={styles.icon} />
            <span>support@carahomedecor.com</span>
          </div>
          <div style={styles.contactInfo}>
            <BiPhoneCall style={styles.icon} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div style={styles.contactInfo}>
            <BiSupport style={styles.icon} />
            <span>1-800-CARA-HELP (toll-free)</span>
          </div>
          <p style={styles.paragraph}>
            Our customer service hours are Monday to Friday, 9 AM to 6 PM EST. 
            We strive to respond to all inquiries within 24 hours.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;