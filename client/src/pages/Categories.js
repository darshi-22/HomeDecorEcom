import React from "react";
import { Link } from "react-router-dom";
import useCategory from '../hooks/useCategory'
import Layout from "../components/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={containerStyle}>
        <h2 style={headerStyle}>All Categories</h2>
        <div className="row" style={rowStyle}>
          {categories.map((c) => (
            <div className="col-md-4 col-sm-6 mb-4" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="category-link"
                style={categoryLinkStyle}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

// Inline styles
const containerStyle = {
  paddingTop: '40px',
  paddingBottom: '40px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#333',
  fontWeight: 'bold',
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const categoryLinkStyle = {
  display: 'block',
  padding: '15px 20px',
  backgroundColor: '#f8f9fa',
  color: '#333',
  textDecoration: 'none',
  borderRadius: '8px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  fontWeight: '500',
  border: '1px solid #ddd',
};

export default Categories;