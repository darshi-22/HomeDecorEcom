import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    productImage: {
      maxHeight: '400px',
      objectFit: 'contain',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    productInfo: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    productName: {
      color: '#007bff',
      marginBottom: '15px',
    },
    relatedProductImage: {
      height: '200px',
      objectFit: 'cover',
    },
    card: {
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
      },
    },
    primaryButton: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      color: 'white',
      '&:hover': {
        backgroundColor: '#0056b3',
        borderColor: '#0056b3',
      },
    },
    outlineButton: {
      color: '#007bff',
      borderColor: '#007bff',
      '&:hover': {
        backgroundColor: '#007bff',
        color: 'white',
      },
    },
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              style={styles.productImage}
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center mb-4">Product Details</h1>
            <div style={styles.productInfo}>
              <h4 style={styles.productName}>{product.name}</h4>
              <p>{product.description}</p>
              <h5>Price: ${product.price}</h5>
              <h6>Category: {product?.category?.name}</h6>
              <button className="btn mt-3" style={styles.primaryButton}>ADD TO CART</button>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <h2 className="text-center mb-4">Similar Products</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="row">
          {relatedProducts?.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card h-100" style={styles.card}>
                <img
                  src={`/api/v1/product/product-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={styles.relatedProductImage}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text flex-grow-1">{p.description.substring(0, 30)}...</p>
                  <p className="card-text"><strong>$ {p.price}</strong></p>
                  <div className="mt-auto">
                    <button
                      className="btn me-2"
                      style={styles.outlineButton}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn" style={styles.primaryButton}>ADD TO CART</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;