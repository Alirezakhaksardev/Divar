import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCategories } from 'services/admin'

import styles from 'templates/AddPost.module.css';
import { getCookie } from 'utils/cookie';

function AddPost() {

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(["get-categories"], getCategories)

    const [loading, setLoading] = useState(false);

    const defualtCategory = data ? data.data[0]._id : '';


    const [dataForm, setDataForm] = useState({
        title: '',
        content: '',
        category: defualtCategory,
        city: '',
        amount: '',
        images: null
    })
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const submitHandler = e => {
        e.preventDefault()
        setLoading(true)
        if (dataForm.category == '') setDataForm({ ...dataForm, category: defualtCategory })

        const { title, content, category, city, amount, images } = dataForm
        if (!title || !content || !category || !city || amount == 0 || images == null) {
            toast.error("لطفا اطلاعات معتبر وارد کنید !");
            setLoading(false)
            return
        }
        // بررسی فرمت فایل

        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedFormats.includes(images.type)) {
            toast.error('لطفاً یک فایل عکس با فرمت مناسب انتخاب کنید.');
            setLoading(false)
            return;
        }

        // بررسی سایز فایل
        const maxSizeInBytes = 2 * 1024 * 1024; // 2 مگابایت
        if (images.size > maxSizeInBytes) {
            toast.error('لطفاً یک فایل عکس با حجم کمتر از 2 مگابایت انتخاب کنید.');
            setLoading(false)
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
            }).then(res => {
                toast.success(res.data.message);
                setDataForm({
                    ...dataForm,
                    title: '',
                    content: '',
                    city: '',
                    amount: '',
                });
                queryClient.invalidateQueries("my-post-list");
                setLoading(false)
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
        } else {
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
            <input type="text" name='title' id='title' value={dataForm.title} onChange={changeHandle} />

            <label htmlFor="content">توضیحات</label>
            <textarea name='content' id='content' value={dataForm.content} onChange={changeHandle} />

            <label htmlFor="amount">قیمت</label>
            <input type="number" name='amount' id='amount' value={dataForm.amount} onChange={changeHandle} />

            <label htmlFor="city">شهر</label>
            <input type="text" name='city' id='city' value={dataForm.city} onChange={changeHandle} />

            <label htmlFor="category">دسته بندی</label>
            <select name="category" id="category" disabled={isLoading}>
                {
                    data?.data.map(i => (
                        <option key={i._id} value={i._id}>{i.name}</option>
                    ))
                }
            </select>
            <label htmlFor="images">عکس</label>
            <input type="file" name='images' id='images' ref={fileInputRef} />

            <button type='submit' disabled={loading}>ثبت آگهی</button>
        </form>
    )
}

export default AddPost