import { useQuery } from '@tanstack/react-query'
import Loader from 'modules/Loader'
import React from 'react'
import { getPosts } from 'services/user'

import styles from 'templates/PostList.module.css'
import { sp } from 'utils/replaceNumber'

function PostList() {

    const { data, isLoading } = useQuery(["my-post-list"], getPosts)

    return (
        <div className={styles.list}>
            {
                isLoading ? <Loader /> :
                    <>
                            <h3>اگهی های شما</h3>
                        {
                            data.data.count !== 0 ? data.data.posts.map(post => (
                                <div key={post._id} className={styles.post}>
                                    <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} alt="" />
                                    <div>
                                        <p>{post.options.title}</p>
                                        <span>{post.options.content}</span>
                                    </div>
                                    <div className={styles.price}>
                                        <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                                        <span>{sp(post.amount)} تومان</span>
                                    </div>
                                </div>
                            )) :
                                <p className={styles.empty}>
                                    هیچ آگهی تا کنون ثبت نکرده اید
                                </p>
                        }
                    </>
            }
        </div>
    )
}

export default PostList