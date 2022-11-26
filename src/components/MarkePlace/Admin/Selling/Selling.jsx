import React, { useEffect, useRef } from 'react';
import styles from './Selling.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  DashOutlined,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import axios from '../../../../config/axios';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import Loading from '../../../Loading/Loading';


const CardList = ({ cardStyle, width, product }) => {
  return (
    <div className={`${styles.card_list} ${cardStyle === 'grid' && styles.card_list_grid}`} >
      <div className={styles.actions}>
        <DashOutlined className={styles.icon} />
      </div>
      <div className={`${styles.img} ${cardStyle === 'grid' && styles.img_grid}`}
        style={{
          width: cardStyle === 'grid' && width,
          height: cardStyle === 'grid' && width
        }}
      >
        <img src={product?.photo} alt="" />
      </div>
      <div className={styles.details} style={{width: cardStyle === 'grid' && width}}>
        <span>{product?.productName?.slice(0,20)}</span>
        <small>₹ {product?.price}</small>
        <small>{product?.status} • product listed {format(product.createdAt)}</small>
      </div>
    </div >
  )
}




const Selling = () => {
  const { currentUser } = useSelector(state => state.user);
  const [cardStyle, setCardStyle] = useState('list');
  const [width, setWidth] = useState(Number);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const cardsRef = useRef();

  useEffect(() => {
    const totalWidth = cardsRef.current.clientWidth;
    const cardWidth = totalWidth / 2;
    setWidth(cardWidth - 40)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/market-place/all-products', {
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
  }, [])

  return (
    <div className={styles.selling}>
      <div className={styles.body}>

        <div className={styles.search_box}>
          <h1>Your listings</h1>
          <div className={styles.search}>
            <SearchOutlined className={styles.icon} />
            <input
              type="text"
              placeholder='Search your listings' />
          </div>
          <div className={styles.change_view}>
            <div
              className={`${styles.icon_} ${cardStyle === 'list' && styles.active}`}
              onClick={() => setCardStyle('list')}>
              <UnorderedListOutlined className={styles.icon} />
            </div>
            <div
              className={`${styles.icon_} ${cardStyle === 'grid' && styles.active}`}
              onClick={() => setCardStyle('grid')}>
              <TableOutlined className={styles.icon} />
            </div>
          </div>
        </div>

        <div className={styles.cards} ref={cardsRef} style={{ justifyContent: cardStyle === 'grid' && 'center' }}>
          {
            loading && <Loading font='15rem' color='var(--text)' />
          }
          {
            products?.map(product => (
              <CardList
                key={product._id}
                cardStyle={cardStyle}
                width={width}
                product={product}
              />
            ))
          }

          {products.length === 0 && <h1>No Listed products</h1>}

        </div>
      </div>


      <div className={styles.right}>
        <h1>Your commerce profile</h1>

        <div className={styles.user_card}>
          <div className={styles.img}>
            <img src={currentUser?.profilePic} alt="user_image" />
          </div>
          <span>{currentUser?.name}</span>
        </div>

        <button className={styles.create_group_btn} onClick={() => navigate('/marketplace/create')}>
          <PlusOutlined className={styles.icon} />
          <span>Create new listing</span>
        </button>
        <button className={styles.create_group_btn} onClick={() => navigate(`/profile/${currentUser?._id}`)}>
          <span>See profile</span>
        </button>

      </div>
    </div>
  )
}

export default Selling