import React from "react";
import Layout from "../components/Layout";

const About = () => {
  const styles = {
    container: {
      display: 'flex',
      padding: '30px',
      alignItems: 'center',
      maxWidth: '1000px',
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
      fontSize: '2.2rem',
      marginBottom: '15px',
      color: '#333',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#555',
      marginBottom: '12px',
    }
  };

  return (
    <Layout title={"About Us - Cara Home Decor"}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img
            src="/images/about.jpeg"
            alt="Elegant home decor"
            style={styles.image}
          />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>About Cara</h1>
          <p style={styles.paragraph}>
            Welcome to Cara, your go-to destination for stylish home decor. We believe 
            in transforming houses into homes with carefully curated accessories that 
            reflect your unique taste and lifestyle.
          </p>
          <p style={styles.paragraph}>
            Our collection spans from contemporary minimalist pieces to classic designs, 
            catering to diverse aesthetics and budgets. At Cara, we're committed to 
            offering high-quality, trendsetting items that combine craftsmanship with 
            modern sensibilities.
          </p>
          <p style={styles.paragraph}>
            Whether you're looking to refresh a room or completely redesign your space, 
            Cara is here to inspire and assist. Let us help you create a home that's 
            not just beautiful, but uniquely yours.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;