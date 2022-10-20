import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Image from '../../ImagePopup/Image';
import styles from './Photos.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading'
import { useLocation } from 'react-router-dom';
import { EditFilled } from '@ant-design/icons';
import { useRef } from 'react';
import PostActionPopup from './PostAction/PostActionPopup';

const Photo = ({ loading, post, isFriendsProfile, active }) => {
  const [showImagePopup, setShowImagePopup] = useState(false);
  // const { currentUser } = useSelector(state => state.user);
  const [showActionPopup, setShowActionPopup] = useState(false)
  const actionRef = useRef();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  // useEffect(() => {
  //   const checkClick = (e) => {
  //     if (showActionPopup && !actionPopupRef.current.contains(e.target)) {
  //       setShowActionPopup(false)
  //     }
  //   }
  //   document.addEventListener('mousedown', checkClick);

  //   return () => {
  //     document.removeEventListener('mousedown', checkClick);
  //   }
  // }, [showActionPopup])

  const showActions = () => {
    const positionLeft = actionRef.current.getBoundingClientRect().left
    const positionTop = actionRef.current.getBoundingClientRect().top
    setLeft(positionLeft)
    setTop(positionTop)
    setShowActionPopup(true)
  }

  return (
    <>
      <div className={styles.img}>
        {
          loading
            ? <Loading font='6rem' color='white' />
            : <img src={post?.mediaUrl} alt="profilepicture" onClick={() => setShowImagePopup(true)} />
        }


        {!isFriendsProfile && active === 'mine' &&
          <div className={styles.actions} ref={actionRef} onClick={showActions}>
            <EditFilled className={styles.icon} />
          </div>
        }


        {
          showActionPopup &&
          <PostActionPopup 
          showActionPopup={showActionPopup}
          setShowActionPopup={setShowActionPopup}
          left={left}
          top={top}
          post={post}
          />
        }
      </div>
      {showImagePopup && <Image src={post?.mediaUrl} setShowImagePopup={setShowImagePopup} />}
    </>
  )
}


const Photos = () => {
  const { currentUser } = useSelector(state => state.user);
  const { currentProfile } = useSelector(state => state.profile);
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState('mine');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFriendsProfile, setIsFriendsProfile] = useState(true)
  const path = useLocation()
  const currentProfileId = path.pathname.split('/')[2]


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/post/get-all-posts', {
          headers: {
            token: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.status === 'err') {
          setLoading(false)
          toast.error(res.data.message)
        }
        if (res.data.status === 'success') {
          setPosts(res.data.data)
          setLoading(false)
        }
      } catch (error) {
        toast.error('something went wrong')
      }
    }
    fetchPosts()
  }, []);

  useEffect(() => {
    if (String(currentProfileId) === String(currentUser._id)) {
      setIsFriendsProfile(false)
    }
  }, [currentProfileId, currentUser])

  useEffect(() => {
    if (!isFriendsProfile) {
      const filter = posts.filter(post => Object.values(post.userId).includes(currentUser._id));
      setActive('mine')
      setFilteredPosts(filter)
    } else {
      const filter = posts.filter(post => Object.values(post.userId).includes(currentProfileId));
      setActive('mine')
      setFilteredPosts(filter)
    }

  }, [currentUser, posts, currentProfileId, isFriendsProfile])

  const filterMyPhotos = () => {
    if (!isFriendsProfile) {
      const filter = posts.filter(post => Object.values(post.userId).includes(currentUser._id));
      setActive('mine')
      setFilteredPosts(filter)
    } else {
      const filter = posts.filter(post => Object.values(post.userId).includes(currentProfileId));
      setActive('mine')
      setFilteredPosts(filter)

    }
  }

  const filterFriendsPhotos = () => {
    if (!isFriendsProfile) {
      const filter = posts.filter(post => !Object.values(post.userId).includes(currentUser._id));
      setActive('friends')
      setFilteredPosts(filter)
    } else {
      const filter = posts.filter(post => !Object.values(post.userId).includes(currentProfileId));
      setActive('friends')
      setFilteredPosts(filter)
    }
  }

  return (
    <div className={styles.photos}>
      <div className={styles.body}>

        <div className={styles.head}>
          <h3>Photos</h3>
          <button>Add Photo/Video</button>
        </div>

        <div className={styles.filter_options}>
          <div className={`${styles.filter} ${active === 'mine' && styles.active}`} onClick={filterMyPhotos}>{
            isFriendsProfile ? currentProfile.name?.split(' ')[0] + "' s photos" : 'Photos of you'
          }
          </div>
          <div className={`${styles.filter} ${active === 'friends' && styles.active}`} onClick={filterFriendsPhotos}>Friends photos</div>
        </div>

        <div className={styles.photos_div} style={{
          justifyContent: filteredPosts.length <= 6 && 'flex-start',
          gap: filteredPosts.length <= 6 && '2rem'
        }}>
          {loading && <Loading font='8rem' color='white' />}
          {
            filteredPosts.map(post => (
              <Photo key={post._id} loading={loading} post={post} isFriendsProfile={isFriendsProfile} active={active} />
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Photos