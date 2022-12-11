import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import styles from './Commerce.module.scss';
import axios from '../../../config/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Product = ({ loading, product }) => {


    return (
        <>
            <Link to={`/marketplace/item/${product?._id}`} className={styles.img}>
                {loading
                    ? <Loading font='6rem' color='white' />
                    : <img src={product?.photo} alt="profilepicture" />
                }
            </Link>
        </>
    )
}


const Commerce = () => {
    const { currentUser } = useSelector(state => state.user);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [owner, setOwner] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const profileId = location.pathname.split('/')[2];


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/market-place/get-my-products/${profileId}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    toast.error(res.data.message);
                    setLoading(false);
                }
                if (res.data.status === 'success') {
                    setProducts(res.data.data)
                    console.log(res.data.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong')
            }
        }
        fetchProducts()
    }, [profileId]);

    useEffect(() => {
        if (String(profileId) === String(currentUser?._id)) {
            setOwner(true);
        } else {
            setOwner(false);
        }
    }, [currentUser, profileId])

    return (
        <div className={styles.commerce}>
            <div className={styles.body}>

                <div className={styles.head}>
                    <h3>Commerce</h3>
                    {owner ? <button onClick={() => navigate(`/marketplace/you/selling`)}>Manage</button>
                        : <button onClick={() => navigate(`/marketplace`)}>Browse all</button>}
                </div>
                <div className={styles.products}>
                    {
                        loading && <Loading font='15rem' color='var(--text)' />
                    }

                    {
                        products?.map(product => (
                            <Product
                                key={product._id}
                                product={product}
                            />
                        ))
                    }

                    {products.length === 0 && <h1  style={{ fontSize: '2.3rem', color: 'var(--error)', fontWeight: '200' }}>No Listed products</h1>}
                </div>
            </div>
        </div>
    )
}

export default Commerce