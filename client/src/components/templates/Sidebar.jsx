import styles from 'templates/Sidebar.module.css'
import React from 'react'

function Sidebar({data}) {

    return (
        <div className={styles.sidebar}>
            <h4>دسته ها</h4>
            <ul>
                {
                    data?.data.map(category => (
                        <li key={category._id}>
                            <img src={`${category.icon}.svg`} />
                            <p>{category.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar