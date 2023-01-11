import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../Loading/Loading';
import styles from './Media.module.scss';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import PostModal from '../../_Modals/PostModal/PostModal';
import { EditFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';


const MediaCard = ({ loading, post, active }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [comments, setComments] = useState([]);
  const actionRef = useRef();

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


  return (
    <>
      <div className={styles.card}>
        {
          loading
            ? <Loading font='6rem' color='white' />
            : active === 'image'
            ? <img src={post?.mediaUrl} alt="profilepicture" onClick={() => setShowPostModal(true)} />
            : <video src={post?.mediaUrl} alt="profilepicture" onClick={() => setShowPostModal(true)} />
        }
      </div>
      <div className={styles.actions} ref={actionRef} >
        <EditFilled className={styles.icon} />
      </div>
      {
        showPostModal &&
        <PostModal
          setShowPostModal={setShowPostModal}
          post={post}
          type={active}
          comments={comments}
        />
      }
    </>
  )
}




const Media = () => {
  const { currentGroup } = useSelector(state => state.currentGroup);
  const [active, setActive] = useState('image');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // const res = await axios.get('/post/get-all-posts', {
        const res = await axios.get(`/post/group-posts/${currentGroup?._id}`, {
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
          if (active === 'video') {
            const filter = arr.filter(ele => ele.mediaType === 'video')
            setPosts(filter)
          }
          if (active === 'reels') {
            const filter = arr.filter(ele => ele.mediaType === 'reels')
            setPosts(filter)
          }
          if (active === 'image') {
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
  }, [active, currentGroup]);

  return (
    <div className={styles.media}>

      <div className={styles.head}>
        <h2>Media</h2>
        <div className={styles.btns}>
          <button>+ Create Album</button>
          <button>Add Photo</button>
        </div>
      </div>


      <div className={styles.navs}>
        <div className={`${styles.nav_items}  ${active === 'image' && styles.active_nav}`} onClick={() => setActive('image')}>
          <span className='link'>Photos</span>
        </div>
        <div className={`${styles.nav_items}  ${active === 'video' && styles.active_nav}`} onClick={() => setActive('video')}>
          <span className='link'>Videos</span>
        </div>
        <div className={`${styles.nav_items}  ${active === 'reels' && styles.active_nav}`} onClick={() => setActive('reels')}>
          <span className='link'>Reels</span>
        </div>
      </div>

      <div className={styles.medias}>
        {loading && <Loading font='8rem' color='white' />}
        {
          posts.map(post => (
            <MediaCard
              key={post._id}
              loading={loading}
              post={post}
              active={active}
            />
          ))
        }
      </div>

    </div>
  )
}

export default Media