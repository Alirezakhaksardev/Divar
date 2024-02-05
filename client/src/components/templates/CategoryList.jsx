import { useMutation, useQuery , useQueryClient} from '@tanstack/react-query'
import Loader from 'modules/Loader'
import React, { useState } from 'react'
import { deleteCategory, getCategories } from 'services/admin'
import styles from 'templates/CategoryList.module.css'

function CategoryList() {

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(["get-categories"], getCategories)


    const mutationDel  = useMutation(deleteCategory , {
        onSuccess: () => queryClient.invalidateQueries("get-categories")
    })
    const deleteHandler = id => {
        mutationDel.mutate(id);
        
    }

    return (
        <div className={styles.list}>
            {
                isLoading ? <Loader /> :
                    <>
                        {
                            data.data.map(i => (
                                <div key={i._id}>
                                    <img src={`${i.icon}.svg`} alt="" />
                                    <h5>{i.name}</h5>
                                    <button onClick={() => deleteHandler(i._id)} disabled={mutationDel.isLoading}>Delete</button>
                                    <p>slug : {i.slug}</p>
                                </div>
                            ))
                        }
                    </>
            }
        </div>
    )
}

export default CategoryList