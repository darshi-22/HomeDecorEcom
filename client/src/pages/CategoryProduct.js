import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    categoryName: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '10px',
    },
    resultCount: {
      fontSize: '1.2rem',
      color: '#666',
    },
    productGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    productCard: {
      width: '280px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '15px',
    },
    productName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    productDescription: {
      fontSize: '0.9rem',
      color: '#666',
      marginBottom: '10px',
    },
    productPrice: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: '#28a745',
      marginBottom: '15px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      flex: '1',
      textAlign: 'center',
      fontSize: '0.9rem',
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      marginRight: '5px',
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      marginLeft: '5px',
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.categoryName}>Category - {category?.name}</h1>
          <h2 style={styles.resultCount}>{products?.length} result found</h2>
        </div>
        <div style={styles.productGrid}>
          {products?.map((p) => (
            <div style={styles.productCard} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                style={styles.productImage}
              />
              <div style={styles.cardBody}>
                <h3 style={styles.productName}>{p.name}</h3>
                <p style={styles.productDescription}>
                  {p.description.substring(0, 30)}...
                </p>
                <p style={styles.productPrice}>$ {p.price}</p>
                <div style={styles.buttonContainer}>
                  <button
                    style={{...styles.button, ...styles.primaryButton}}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button style={{...styles.button, ...styles.secondaryButton}}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;