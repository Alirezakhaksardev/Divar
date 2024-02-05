import React, { useState } from 'react'
import styles from './CategoryForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory } from 'services/admin';


function CategoryForm() {
    const queryClient = useQueryClient()
    const [form, setForm] = useState({
        name: '',
        slug: '',
        icon: ''
    });

    const { mutate, isLoading, error, data } = useMutation(addCategory, {
        onSuccess: () => queryClient.invalidateQueries("get-categories")
    })

    const changeHandle = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const submithandler = async e => {
        e.preventDefault();

        if (!form.name || !form.slug || !form.icon) return;
        
        mutate(form)
    }

    return (
        <form className={styles.form} onChange={changeHandle} onSubmit={submithandler}>
            <h3>دسته بندی جدید</h3>
            {!!error && <p>مشکلی پیش امده است</p>}
            {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}
            <label htmlFor="name">نام دسته بندی</label>
            <input type="text" name='name' id='name' />

            <label htmlFor="slug">اسلاگ</label>
            <input type="text" name='slug' id='slug' />

            <label htmlFor="icon">ایکون</label>
            <input type="text" name='icon' id='icon' />

            <button type='submit' disabled={isLoading}>ایجاد</button>

        </form>
    )
}

export default CategoryForm