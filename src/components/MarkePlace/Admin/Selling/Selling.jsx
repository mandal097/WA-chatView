import React, { useEffect, useRef } from 'react';
import styles from './Selling.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  TableOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import axios from '../../../../config/axios';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import Loading from '../../../Loading/Loading';
import ActionPopup from './Actions';
import DeletePop from './DeletePop';
// import EditProductModal from '../../../_Modals/EditMarketPlaceProductModal/EditProductModal';


const CardList = ({ cardStyle, width, product, showEditModal, setShowEditModal }) => {
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [color, setColor] = useState('green');
  const actionRef = useRef();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [positionBefore, setPositionBefore] = useState('top');

  useEffect(() => {
    if (product?.status === 'in-stock') {
      setColor('green')
    }
    if (product?.status === 'out-of-stock') {
      setColor('red')
    }
    if (product?.status === 'sold') {
      setColor('grey')
    }
  }, [product]);


  const showActions = () => {
    const positionLeft = actionRef.current.getBoundingClientRect().left;
    const positionTop = actionRef.current.getBoundingClientRect().top;
    setLeft(positionLeft);
    if (positionTop >= 500) {
      setTop(positionTop - 165);
      setPositionBefore('bottom');
    } else {
      setTop(positionTop)
      setPositionBefore('top');
    }
    setShowActionPopup(true);
  };


  return (
    <>
      <div
        style={{ position: 'relative' }}
        className={`${styles.card_list} ${cardStyle === 'grid' && styles.card_list_grid}`} >
        <div className={styles.actions} ref={actionRef} onClick={showActions}>
          <MoreOutlined className={styles.icon} />
        </div>
        <div className={`${styles.img} ${cardStyle === 'grid' && styles.img_grid}`}
          style={{
            width: cardStyle === 'grid' && width,
            height: cardStyle === 'grid' && width
          }}
        >
          <img src={product?.photo} alt="" />
        </div>
        <div className={styles.details} style={{ width: cardStyle === 'grid' && width }}>
          <span>{product?.productName}</span>
          <small>₹ {product?.price}</small>
          <span style={{
            width: '0.7rem',
            height: '0.7rem',
            borderRadius: '50%',
            marginTop: '0.3rem',
            backgroundColor: color,
          }}></span>
          <small>{product?.status} • product listed {format(product.createdAt)}</small>
        </div>
      </div >
      {
        showActionPopup &&
        <ActionPopup
          showActionPopup={showActionPopup}
          setShowActionPopup={setShowActionPopup}
          setShowDeletePop={setShowDeletePop}
          positionBefore={positionBefore}
          setShowEditModal={setShowEditModal}
          product={product}
          left={left}
          top={top}
        />
      }
      {showDeletePop &&
        <DeletePop
          setShowDeletePop={setShowDeletePop}
          showDeletePop={showDeletePop}
          product={product}
        />
      }

    </>
  )
}




const Selling = () => {
  const { currentUser } = useSelector(state => state.user);
  const [cardStyle, setCardStyle] = useState('list');
  const [width, setWidth] = useState(Number);
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [searchedProduct, setSearchedProducts] = useState([]);
  const [mapedProduct, setMapedProduct] = useState([]);
  const [checked, setChecked] = useState('')
  const navigate = useNavigate();
  const cardsRef = useRef();


  useEffect(() => {
    const totalWidth = cardsRef.current.clientWidth;
    const cardWidth = totalWidth / 2;
    setWidth(cardWidth - 40)
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/market-place/get-my-products/${currentUser?._id}`, {
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
          // console.log(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong')
      }
    }
    fetchProducts()
  }, [currentUser]);

  useEffect(() => {
    const filter = products.filter((product) => {
      if (searchTerm === '') {
        return false
      }
      else if (product?.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return product
      }
      return false;
    })
    setSearchedProducts(filter)
  }, [products, searchTerm])

  useEffect(() => {
    if (searchTerm === '') {
      setMapedProduct(products)
    }
    else {
      setMapedProduct(searchedProduct)
    }
    if (checked !== '') {
      const filter = products.filter((product) => product.status === checked);
      setMapedProduct(filter)
    }
  }, [searchTerm, products, searchedProduct, checked, mapedProduct]);




  return (
    <div className={styles.selling} >
      <div className={styles.body}>
        <div className={styles.search_box}>
          <h1>Your listings</h1>
          <div className={styles.search}
          //  onClick={()=>setChecked('')}
           >
            <SearchOutlined className={styles.icon} />
            <input
              type="text"
              placeholder='Search your listings by name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

        <div className={styles.indicator}>
          <div className={styles.indicator_}>
            <div className={styles.color} style={{ backgroundColor: 'hotpink' }}></div>
            <span>All</span>
            <input checked={checked === ''} type="checkbox" name="stock" value='' onChange={(e) => setChecked(e.target.value)} />
          </div>
          <div className={styles.indicator_}>
            <div className={styles.color} style={{ backgroundColor: 'green' }}></div>
            <span>In Stock</span>
            <input checked={checked === 'in-stock'} type="checkbox" name="stock" value='in-stock' onChange={(e) => setChecked(e.target.value)} />
          </div>
          <div className={styles.indicator_}>
            <div className={styles.color} style={{ backgroundColor: 'red' }}></div>
            <span>Out Of Stock</span>
            <input checked={checked === 'out-of-stock'} type="checkbox" name="stock" value='out-of-stock' onChange={(e) => setChecked(e.target.value)} />
          </div>
          <div className={styles.indicator_}>
            <div className={styles.color} style={{ backgroundColor: 'grey' }}></div>
            <span>Sold</span>
            <input checked={checked === 'sold'} type="checkbox" name="stock" value='sold' onChange={(e) => setChecked(e.target.value)} />
          </div>
        </div>

        <div
          className={styles.cards}
          ref={cardsRef}
          style={{ justifyContent: cardStyle === 'grid' && 'center' }}>
          {
            loading && <Loading font='15rem' color='var(--text)' />
          }
          {
            mapedProduct?.map(product => (
              <CardList
                key={product._id}
                cardStyle={cardStyle}
                width={width}
                product={product}
              />
            ))
          }

          {mapedProduct.length === 0 && <h1 style={{ fontWeight: '400', color: 'var(--error)', marginTop: '2rem' }}>No Listed products found</h1>}

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