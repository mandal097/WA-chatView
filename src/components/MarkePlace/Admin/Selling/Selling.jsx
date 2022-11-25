import { DashOutlined, PlusOutlined, SearchOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Selling.module.scss';


const CardList = ({ cardStyle, width }) => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className={`${styles.card_list} ${cardStyle === 'grid' && styles.card_list_grid}`} >
      <div className={styles.actions}>
        <DashOutlined className={styles.icon}/>
      </div>
      <div className={`${styles.img} ${cardStyle === 'grid' && styles.img_grid}`}
        style={{
          width: cardStyle === 'grid' && width,
          height: cardStyle === 'grid' && width
        }}
      >
        <img src={currentUser?.profilePic} alt="" />
      </div>
      <div className={styles.details}>
        <span>title</span>
        <small>price</small>
        <small>Sold listed on 15/12/2021</small>
      </div>
    </div >
  )
}




const Selling = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [cardStyle, setCardStyle] = useState('list');
  const cardsRef = useRef();
  const [width, setWidth] = useState(Number);

  useEffect(() => {
    const totalWidth = cardsRef.current.clientWidth;
    const cardWidth = totalWidth / 2;
    setWidth(cardWidth - 20)
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
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
          <CardList cardStyle={cardStyle} width={width} />
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