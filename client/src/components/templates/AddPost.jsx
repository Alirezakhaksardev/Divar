import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCategories } from 'services/admin'

import styles from 'templates/AddPost.module.css';
import { getCookie } from 'utils/cookie';

function AddPost() {

    const { data, isLoading } = useQuery(["get-categories"], getCategories)

    const defualtCategory = data ? data.data[0]._id : '';


    const [dataForm, setDataForm] = useState({
        title: '',
        content: '',
        category: defualtCategory,
        city: '',
        amount: null,
        images: null
    })
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault()

        if (dataForm.category == '') setDataForm({ ...dataForm, category: defualtCategory })

        const { title, content, category, city, amount, images } = dataForm
        if (!title || !content || !category || !city || amount == null || images == null) return toast.error("لطفا اطلاعات معتبر وارد کنید !")

        // بررسی فرمت فایل

        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif' , 'image/webp'];
        if (!allowedFormats.includes(images.type)) {
            toast.error('لطفاً یک فایل عکس با فرمت مناسب انتخاب کنید.');
            return;
        }

        // بررسی سایز فایل
        const maxSizeInBytes = 2 * 1024 * 1024; // 2 مگابایت
        if (images.size > maxSizeInBytes) {
            toast.error('لطفاً یک فایل عکس با حجم کمتر از 2 مگابایت انتخاب کنید.');
            return;
        }

        const formData = new FormData();

        for (let i in dataForm) {
            formData.append(i, dataForm[i])
        }

        const accessToken = getCookie("accessToken");

        if (accessToken) {
            axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `bearer ${accessToken}`
                }
            }).then(res => toast.success(res.data.message)).catch(error => console.log(error))
        }else{
            navigate(0)
        }

    }

    const changeHandle = e => {
        const { name, value } = e.target;
        if (name !== 'images') {
            setDataForm({ ...dataForm, [name]: value });
        } else {
            setDataForm({ ...dataForm, [name]: e.target.files[0] })
        }
    }

    return (
        <form onSubmit={submitHandler} onChange={changeHandle} className={styles.form}>
            <h3>افزودن آگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" name='title' id='title' />

            <label htmlFor="content">توضیحات</label>
            <textarea name='content' id='content' />

            <label htmlFor="amount">قیمت</label>
            <input type="number" name='amount' id='amount' />

            <label htmlFor="city">شهر</label>
            <input type="text" name='city' id='city' />

            <label htmlFor="category">دسته بندی</label>
            <select name="category" id="category" disabled={isLoading}>
                {
                    data?.data.map(i => (
                        <option key={i._id} value={i._id}>{i.name}</option>
                    ))
                }
            </select>
            <label htmlFor="images">عکس</label>
            <input type="file" name='images' id='images' />

            <button type='submit'>ثبت آگهی</button>
        </form>
    )
}

export default AddPost