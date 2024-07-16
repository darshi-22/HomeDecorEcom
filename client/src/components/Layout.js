import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast'

function Layout({children,title}) {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header/>
        <main style={{minHeight:'80vh'}}>{children}</main>
        <Toaster/>
        <Footer/>
    </div>
  )
}

export default Layout
