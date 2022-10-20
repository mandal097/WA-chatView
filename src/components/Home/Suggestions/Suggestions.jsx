import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Suggestions.module.scss';

const Suggestions = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className={styles.suggestions}>

      <div className={styles.card}>
        <div className={styles.img}>
          <img src={currentUser.profilePic} alt="profilepic" />
        </div>
        <span>{currentUser.name}</span>
      </div>

      <div className={styles.head}>
        <h3>Suggestions</h3>
        <Link className='link'>See All</Link>
      </div>

      <div className={styles.card}>
        <div className={styles.img} style={{ width: '3.8rem', height: '3.8rem' }}>
          <img src={currentUser.profilePic} alt="profilepic" />
        </div>
        <span>aman kumar mandal</span>
        <button>Follow</button>
      </div>
      <div className={styles.card}>
        <div className={styles.img} style={{ width: '3.8rem', height: '3.8rem' }}>
          <img src={currentUser.profilePic} alt="profilepic" />
        </div>
        <span>aman kumar mandal</span>
        <button>Follow</button>
      </div>
      <div className={styles.card}>
        <div className={styles.img} style={{ width: '3.8rem', height: '3.8rem' }}>
          <img src={currentUser.profilePic} alt="profilepic" />
        </div>
        <span>aman kumar mandal</span>
        <button>Follow</button>
      </div>
      <div className={styles.card}>
        <div className={styles.img} style={{ width: '3.8rem', height: '3.8rem' }}>
          <img src={currentUser.profilePic} alt="profilepic" />
        </div>
        <span>aman kumar mandal</span>
        <button>Follow</button>
      </div>
     

    </div>
  )
}

export default Suggestions