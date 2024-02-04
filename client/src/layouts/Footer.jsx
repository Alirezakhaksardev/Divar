import React from 'react'
import { FaHeart } from "react-icons/fa";
import styles from 'layouts/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>ساخته شده با  <spna ><FaHeart className={styles.heart} /></spna> علیرضا خاکسار</p>
    </footer>
  )
}

export default Footer