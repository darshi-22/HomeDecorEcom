import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
  }
  return (
    <div className='bg-dark text-light p-4'>
      <h4 className='text-center'>All rights Reserved @CaraHomeDecor</h4>
      <p className='text-center mt-3'>
        <Link to='/about' style={linkStyle} >About</Link>|
        <Link to='/contact' style={linkStyle}>Contact</Link>|
        <Link to='/policy' style={linkStyle}>Policy</Link>
      </p>
    </div>
  )
}

export default Footer
