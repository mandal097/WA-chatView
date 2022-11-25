import { CloseOutlined, FileImageFilled, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProduct.module.scss';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import PreviewProduct from '../../components/MarkePlace/Admin/PreviewProduct/PreviewProduct';

const CreateMarketPlaceProduct = () => {
    const { currentUser } = useSelector(state => state.user);
    const [disable, setDisabled] = useState(true);
    const [photo, setPhoto] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('')

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productName && condition && category && price && tags && location && photo && desc) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [category, productName, condition, price, tags, location, photo, desc]);


    const goBack = () => {
        navigate(-1)
    }

    const createGroup = async (e) => {
        e.preventDefault();
        if (!photo && !productName && price && !condition && !category && !tags && !location && !desc) {
            toast.error('All fields are required')
        }
        setLoading(true)
        try {
          
            const token = localStorage.getItem('token')
            const res = await axios.post('/market-place/create-product', {
                sellerId: currentUser?._id,
                photo:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                productName,
                price,
                condition,
                category,
                tags,
                location,
                desc,
            },
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
            if (res.data.status === 'err') {
                setLoading(false)
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                setLoading(false);
                toast.success(res.data.message);
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            console.log('lll');
            toast.error('something went wrong')
        }
    }
    return (
        <div className={styles.create_product}>
            <ToastContainer className='toaster' />
            <div className={`${styles.sidebar} ${'custom_scroll'}`}>
                <div className={styles.top}>

                    <div className={styles.close}>
                        <button onClick={goBack}>
                            <CloseOutlined className={styles.icon} />
                        </button>
                    </div>
                    <h1>Create new listing</h1>
                </div>

                <div className={styles.admin_card}>
                    <div className={styles.img}>
                        <img src={currentUser?.profilePic} alt="" />
                    </div>
                    <div className={styles.name}>
                        <span>{currentUser?.name}</span>
                        <small>Listing to Marketplace</small>
                    </div>
                </div>
                <div className={styles.inputs}>



                    <div className={styles.input}>
                        <label>Photo:</label>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            accept='image/*'
                            id='photo'
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>
                    <div htmlFor="photo" className={styles.img_handler}>
                        <div className={styles.wrapper}>
                            {
                                photo ?
                                    <div className={styles.img}>
                                        <img src={URL.createObjectURL(photo)} alt="" />
                                    </div>
                                    :
                                    <label htmlFor="photo">
                                        <FileImageFilled className={styles.icon} />
                                    </label>
                            }
                        </div>
                        {photo !== '' && <button onClick={() => setPhoto('')}>Cancel</button>}
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="">Product name:</label>
                        <input
                            type="text"
                            value={productName}
                            placeholder='Product Name'
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="">Price:</label>
                        <input
                            type="text"
                            value={price}
                            placeholder='Price'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="">Condition:</label>
                        <select name="" id="" onChange={(e) => setCondition(e.target.value)}>
                            <option value="new" selected>New</option>
                            <option value="used-like-new">Used – like new</option>
                            <option value="used-good" selected>Used – good</option>
                            <option value="used-fair" selected>Used – fair</option>
                        </select>

                    </div>
                    <div className={styles.input}>
                        <label htmlFor="">Category:</label>
                        <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                            <option value='mens-clothing-shoes' selected>Men's clothing & shoes</option>
                            <option value='womens-clothing-shoes' selected>Women's clothing & shoes</option>
                            <option value='electronic'>Electronics</option>
                            <option value='books'>Books</option>
                            <option value='furniture'>Furniture</option>
                            <option value='sports-accessories'>Sports Accessories</option>
                            <option value='miscellaneous'>Miscellaneous</option>
                        </select>
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="">Tags:</label>
                        <input
                            type="text"
                            value={tags}
                            placeholder='Relevent tags for the product'
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <PlusOutlined className={styles.icon} />
                    </div>

                    <div className={styles.input}>
                        <label htmlFor="">Address:</label>
                        <input
                            type="text"
                            value={location}
                            placeholder='Location i.e., New delhi'
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="">Description:</label>
                        <textarea
                            placeholder='Add relavent product description'
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>

                    <p style={{ fontSize: '1.3rem' }}>Marketplace items are public and can be seen by anyone on or off WeeChat. Items such as animals, drugs, weapons, counterfeits and other items that infringe intellectual property aren't allowed on Marketplace.</p>

                    <button
                        onClick={createGroup}
                        disabled={disable}
                        className={`${styles.create_btn} ${disable && styles.btn_disabled}`}
                    >{loading ? <> <Loading color='var(--text)' font='5rem' /></> : 'Create Product'}</button>
                </div>
            </div>
            <div className={styles.body}>
                <PreviewProduct
                    photo={photo}
                    productName={productName}
                    price={price}
                    condition={condition}
                    category={category}
                    tags={tags}
                    location={location}
                    desc={desc}
                />
            </div>
        </div>
    )
}

export default CreateMarketPlaceProduct