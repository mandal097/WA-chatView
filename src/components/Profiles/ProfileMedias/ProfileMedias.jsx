import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './ProfileMedias.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading'
import { useLocation } from 'react-router-dom';
import { EditFilled } from '@ant-design/icons';
import { useRef } from 'react';
import PostActionPopup from './PostAction/PostActionPopup';
import PostModal from '../../_Modals/PostModal/PostModal';

const Media = ({ loading, post, isFriendsProfile, active, type }) => {
  // const [showImagePopup, setShowImagePopup] = useState(false);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [comments, setComments] = useState([]);
  const actionRef = useRef();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);


  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comment/${post?._id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.status === 'err') {
        toast.error(res.data.message)
      }
      if (res.data.status === 'success') {
        setComments(res.data.data);
      }
    }
    fetchComments()
  }, [post]);




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
            : type==='video'
            ?<video src={post?.mediaUrl} alt="profilepicture" onClick={() => setShowPostModal(true)} />
            :<img src={post?.mediaUrl} alt="profilepicture" onClick={() => setShowPostModal(true)} />
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
            type={type}
          />
        }
      </div>
      {
        showPostModal &&
        <PostModal
          setShowPostModal={setShowPostModal}
          post={post}
          type={type}
          comments={comments}
        />
      }
    </>
  )
}


const ProfileMedias = ({ type }) => {
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
          const arr = res.data.data;
          if (type === 'video') {
            const filter = arr.filter(ele => ele.mediaType === 'video')
            setPosts(filter)
          }
          if (type === 'image') {
            const filter = arr.filter(ele => ele.mediaType === 'image')
            setPosts(filter)
          }
          // setPosts(res.data.data)
          setLoading(false)
        }
      } catch (error) {
        toast.error('something went wrong')
      }
    }
    fetchPosts()
  }, [type]);

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
          <h3>{type ==='video' ?"Videos" :"Photos"}</h3>
          <button>Add Photo/Video</button>
        </div>

        <div className={styles.filter_options}>
          <div className={`${styles.filter} ${active === 'mine' && styles.active}`} onClick={filterMyPhotos}>{
            isFriendsProfile ? currentProfile.name?.split(' ')[0] + "' s photos" : 'Photos of you'
          }{type ==='video' ?"Videos" :"Photos"}
          </div>
          <div className={`${styles.filter} ${active === 'friends' && styles.active}`} onClick={filterFriendsPhotos}>Friends {type ==='video' ?"Videos" :"Photos"}</div>
        </div>

        <div className={styles.photos_div} style={{
          justifyContent: filteredPosts.length <= 6 && 'flex-start',
          gap: filteredPosts.length <= 6 && '2rem'
        }}>
          {loading && <Loading font='8rem' color='white' />}
          {
            filteredPosts.map(post => (
              <Media
                key={post._id}
                loading={loading}
                post={post}
                isFriendsProfile={isFriendsProfile}
                active={active}
                type={type}
              />
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default ProfileMedias;