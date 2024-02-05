import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from 'layouts/Header.module.css'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from 'services/user'
import { delCookie } from 'utils/cookie'

function Header() {

  const [showLink, setShowLink] = useState(false);
  const optionsList = useRef(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (showLink) {
      optionsList.current.style.opacity = `1`;
    } else {
      optionsList.current.style.opacity = `0`
    }
  })

  const { data, isLoading } = useQuery(["profile"], getProfile)

  const logout = () => {
    delCookie();
    navigate(0)
  }

  return (
    <header className={styles.header}>
      <div className={styles.boxs}>
        <Link to={'/'}>
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" alt="location" />
          <p>تهران</p>
        </span>
      </div>
      <div className={styles.boxs}>
        <span onClick={() => setShowLink(!showLink)}>
          <img src="profile.svg" alt="profile" />
          <p>دیوار من</p>
        </span>

        <div className={styles.options} ref={optionsList}>
          <ul>
            {
              data ? data.data.role === "ADMIN" && (
                <li onClick={() => setShowLink(!showLink)}>
                  <Link to={'/admin'} className={styles.link}>ورود به صفحه ادمین</Link>
                </li>
              ) : <></>
            }
            {
              !data ? (
                <li onClick={() => setShowLink(!showLink)}>
                  <Link to={'/auth'} className={styles.link}>ورود / ثبت نام</Link>
                </li>
              ) : (
                <>
                  <li onClick={() => setShowLink(!showLink)}>
                    <Link to={'/dashboard'} className={styles.link}>داشبورد</Link>
                  </li>
                  <li onClick={() => setShowLink(!showLink)}>
                    <button onClick={logout} className={styles.link}>خروج</button>
                  </li>
                </>
              )
            }



          </ul>
        </div>
        <Link to={"/dashboard"} className={styles.button} >ثبت اگهی</Link>
      </div>
    </header>
  )
}

export default Header