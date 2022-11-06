import React, { useEffect, useState } from 'react';
import styles from './Watch.module.scss';
import axios from '../../config/axios';
import PostCard from '../../components/PostCard/PostCard';
import { BookOutlined, VideoCameraFilled } from '@ant-design/icons';


const Watch = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState('home')

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/post/get-all-posts', {
          headers: {
            token: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const arr = res.data.data;
        const filter = arr.filter(ele => ele.mediaType === 'video')
        setVideos(filter)
        setLoading(false)
      } catch (error) {
        console.log('something went wrong');
        setLoading(false)
      }
    }
    getPosts()
  }, []);

  return (
    <div className={styles.reel_page}>
      <div className={styles.sidebar}>

        <div onClick={() => setActive('home')}
          className={`${styles.filters} ${active === 'home' && styles.active}`}>
          <div className={styles.icon_}>
            <VideoCameraFilled className={styles.icon} />
          </div>
          <span>Home</span>
        </div>
        
        <div onClick={() => setActive('saved')}
          className={`${styles.filters} ${active === 'saved' && styles.active}`}>
          <div className={styles.icon_}>
            <BookOutlined className={styles.icon} />
          </div>
          <span>Saved videos</span>
        </div>

        <div onClick={() => setActive('reels')}
          className={`${styles.filters} ${active === 'reels' && styles.active}`}>
          <div className={styles.icon_}>
            <BookOutlined className={styles.icon} />
          </div>
          <span>Reels videos</span>
        </div>

      </div>
      <div className={styles.body}>
        <div className={styles.body_wrapper}>
          {
            videos?.map((post => (
              <PostCard key={post?._id} post={post} loading={loading} />
            )))
          }
          {
            !videos && !loading && <h2>No posts founds...</h2>
          }
        </div>
      </div>
    </div>
  )
}

export default Watch