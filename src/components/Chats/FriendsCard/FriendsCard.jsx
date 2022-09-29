import React from 'react';
import styles from './FriendsCard.module.scss';

const NewConvCard = () => {
  return (
    <div className={styles.chat_card}>
      <div className={styles.img}>
        <img src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="profilepicture" />
      </div>
      <span className={styles.name}>Amarnath kumar mandal</span>
    </div>
  )
}

export default NewConvCard;