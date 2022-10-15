import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from '../../ImagePopup/Image';
import styles from './Photos.module.scss';

const Photos = () => {
  const { currentUser } = useSelector(state => state.user);
  const [active, setActive] = useState('mine');
  const [showImagePopup, setShowImagePopup] = useState(false)
  return (
    <div className={styles.photos}>
      <div className={styles.body}>

        <div className={styles.head}>
          <h3>Photos</h3>
          <button>Add Photo/Video</button>
        </div>

        <div className={styles.filter_options}>
          <div className={`${styles.filter} ${active === 'mine' && styles.active}`} onClick={() => {
            setActive('mine')
          }}>Photos of you</div>
          <div className={`${styles.filter} ${active === 'friends' && styles.active}`} onClick={() => {
            setActive('friends')
          }}>Friends photos</div>
        </div>

        <div className={styles.photos_div}>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
          <div className={styles.img} onClick={()=>setShowImagePopup(true)}>
            <img src={currentUser.profilePic} alt="profilepicture" />
          </div>
        </div>

      </div>
      {showImagePopup && <Image src={currentUser.profilePic} setShowImagePopup={setShowImagePopup}/>}
    </div>
  )
}

export default Photos