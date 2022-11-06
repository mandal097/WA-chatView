import React from 'react';
import styles from './Friends.module.scss';
// import { SearchOutlined } from '@ant-design/icons';
import FriendList from './FriendList/FriendList';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFriend } from '../../../redux/currentProfile';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const { activeFriend } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  return (
    <div className={styles.friends}>
      <div className={styles.header}>
        <h3>Friends</h3>
        <div className={styles.right}>
          {/* <div className={styles.search_box}>
            <SearchOutlined className={styles.icon} />
            <input type="text" placeholder='search' />
          </div> */}
          <button onClick={()=>navigate('/friends')}>Find friends</button>
        </div>
      </div>
      <div className={styles.navs}>
        <div className={`${styles.nav_items}  ${activeFriend === 'followers' && styles.active_nav}`} onClick={() => dispatch(setActiveFriend('followers'))}>
          <span className='link'>Followers</span>
        </div>
        <div className={`${styles.nav_items}  ${activeFriend === 'followings' && styles.active_nav}`} onClick={() => dispatch(setActiveFriend('followings'))}>
          <span className='link'>Followings</span>
        </div>
      </div>
      <FriendList active={activeFriend} />
    </div>
  )
}

export default Friends