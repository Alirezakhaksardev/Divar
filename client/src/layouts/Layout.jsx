import React from 'react'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import styles from 'layouts/Layout.module.css'


function Layout({children}) {
  return (
    <>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
    </>
  )
}

export default Layout