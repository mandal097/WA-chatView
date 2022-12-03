import React from 'react';
import styles from './ProductPage.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    BookFilled,
    CloseOutlined,
    MessageFilled,
    MoreOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../../redux/chatRedux';
import { format } from 'timeago.js';

const ProductPage = () => {
    const { currentUser } = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product_id = location.pathname.split('/')[3];

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [owner, setOwner] = useState(false);
    const [bg, setBg] = useState('');
    const [showDesc, setShowDesc] = useState(false)

    const back = () => {
        navigate(-1)
    };

    useEffect(() => {
        if (product?.status === 'in-stock') {
            setBg('green')
        } else if (product?.status === 'out-of-stock') {
            setBg('red')
        } else if (product?.status === 'sold') {
            setBg('gray')
        }
    }, [product])


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/market-place/product/${product_id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    toast.error(res.data.message);
                    setLoading(false);
                }
                if (res.data.status === 'success') {
                    setProduct(res.data.data)
                    setMessage(`Hi ${res.data.data?.sellerId.name.split(' ')[0]}, is this still available? \n `)
                    console.log(res.data.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong')
            }
        }
        fetchProduct()
    }, [product_id,]);

    useEffect(() => {
        if (String(product?.sellerId?._id) === String(currentUser?._id)) {
            setOwner(true);
        } else {
            setOwner(false);
        }
    }, [currentUser, product])

    const sendMessage = async (param) => {
        setSending(true)
        const res = await axios.post('/chats/create-chat', {
            userId: product?.sellerId?._id
        }, {
            headers: {
                token: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const filter = res.data.data[0]?.users.find((c) => c._id !== currentUser._id);
        dispatch(setCurrentChat({ currentChat: filter, chatId: res.data.data[0]._id }));

        if (res.data.status === 'success' && param === 'message') {
            const resPostMessage = await axios.post('/message', {
                chatId: res.data.data[0]._id,
                content: message + window.location
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (resPostMessage.data.status === 'err') {
                toast.error(res.data.message)
                setSending(false)
            }
        }
        setTimeout(() => {
            navigate('/messenger');
        }, 100);
    }


    return (
        <div className={styles.product_page}>
            <div className={styles.close} onClick={back}>
                <CloseOutlined className={styles.icon} />
            </div>
            {loading
                ? <Loading font='15rem' color='var(--text)' />
                : <div className={styles.product}>
                    <div className={styles.left}>
                        <div className={styles.img}>
                            <img src={product?.photo} alt="product_photo" />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h1>{product?.productName}</h1>
                        <span>₹ {product?.price}</span>
                        <small>Listed {format(product?.createdAt)} in {product?.location}</small>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '1rem',
                                height: '1rem',
                                borderRadius: '50%',
                                backgroundColor: bg
                            }}></div>
                            <small>{product?.status}</small>
                        </div>
                        <div className={styles.actions_btn}>
                            {!owner &&
                                <button onClick={() => sendMessage('create-chat')}>
                                    {sending
                                        ? 'Wait...'
                                        : <>
                                            <MessageFilled className={styles.icon} />
                                            Message
                                        </>
                                    }
                                </button>
                            }
                            <button> <BookFilled className={styles.icon} /></button>
                            <button> <ShareAltOutlined className={styles.icon} /></button>
                            <button> <MoreOutlined className={styles.icon} /></button>
                        </div>
                        <div className={styles.details}>
                            <span>Details</span>
                            <div className={styles.details_field}>
                                <span>Condition</span>
                                <span>{product?.condition}</span>
                            </div>
                            <div className={styles.details_field}>
                                <span>Category</span>
                                <span>{product?.category}</span>
                            </div>
                            <div className={styles.details_field}>
                                <span>Location</span>
                                <span>{product?.location}</span>
                            </div>
                            <div className={styles.details_field}>
                                <span>Status</span>
                                <span>{product?.status}</span>
                            </div>
                        </div>
                        <h2 style={{ fontSize: '1.8rem' }}>Description :</h2>
                        {showDesc ?
                            <>
                                <p style={{ fontSize: '1.5rem', textAlign: 'justify',fontWeight:'100'}}>{product?.desc}</p>
                                <span className={styles.more} onClick={() => setShowDesc(!showDesc)}>Read less...</span>
                            </>
                            : <>
                                <p style={{ fontSize: '1.5rem', textAlign: 'justify' }} className={styles.desc}>{product?.desc}</p>
                                <span className={styles.more} onClick={() => setShowDesc(!showDesc)}>Read more...</span>
                            </>
                        }

                        <div className={styles.contact}>
                            <div className={styles.head}>
                                <MessageFilled className={styles.icon} />
                                {!owner ?
                                    <>
                                        <span>Send seller a message</span>
                                        <Link to={`/profile/${product?.sellerId?._id}/commerce`} className={styles.link}>View seller profile</Link>
                                    </>
                                    : <span>You list this product</span>}
                            </div>
                            {!owner && <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />}
                            {!owner &&
                                <button onClick={() => sendMessage('message')}>
                                    {sending ?
                                        'Sending...'
                                        : 'Send'}
                                </button>
                            }
                        </div>
                    </div>
                </div>}
        </div >
    )
}

export default ProductPage