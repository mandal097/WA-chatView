import React, { useEffect, useState } from 'react';
import styles from './Watch.module.scss';
import axios from '../../config/axios';
import PostCard from '../../components/PostCard/PostCard';
import { BookFilled, FileImageFilled, PlayCircleFilled, VideoCameraFilled } from '@ant-design/icons';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';


const Watch = () => {
  const { currentUser } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState('home');
  const [filterVideos, setFilterVideos] = useState([]);
  const [postVid, setPostVid] = useState([]);

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
        setPostVid(arr)
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

  const filterSavedVideos = () => {
    const filter = videos?.filter(video => video?.saved.includes(currentUser._id));
    setFilterVideos(filter);
  };

  const filterSavedReels = () => {
    const filterVid = postVid.filter(ele => ele.mediaType === 'reels')
    const filter = filterVid?.filter(video => video?.saved.includes(currentUser._id));
    setFilterVideos(filter);
  };

  const filterAllReels = () => {
    const filterVid = postVid.filter(ele => ele.mediaType === 'reels')
    setFilterVideos(filterVid);
  };

  const filterSavedPosts = () => {
    const filterVid = postVid.filter(ele => ele.mediaType === 'image')
    const filter = filterVid?.filter(video => video?.saved.includes(currentUser._id));
    setFilterVideos(filter);
  };

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

        <div onClick={() => {
          filterSavedVideos()
          setActive('saved')
        }}
          className={`${styles.filters} ${active === 'saved' && styles.active}`}>
          <div className={styles.icon_}>
            <BookFilled className={styles.icon} />
          </div>
          <span>Saved videos</span>
        </div>

        <div onClick={() => {
          filterAllReels()
          setActive('all_reels')
        }}
          className={`${styles.filters} ${active === 'all_reels' && styles.active}`}>
          <div className={styles.icon_}>
            <PlayCircleFilled className={styles.icon} />
          </div>
          <span> Reels</span>
        </div>

        <div onClick={() => {
          filterSavedReels()
          setActive('saved_reels')
        }}
          className={`${styles.filters} ${active === 'saved_reels' && styles.active}`}>
          <div className={styles.icon_}>
            <BookFilled className={styles.icon} />
          </div>
          <span>Saved reels</span>
        </div>

        <div onClick={() => {
          filterSavedPosts()
          setActive('saved_posts')
        }}
          className={`${styles.filters} ${active === 'saved_posts' && styles.active}`}>
          <div className={styles.icon_}>
            <FileImageFilled className={styles.icon} />
          </div>
          <span>Saved posts</span>
        </div>

      </div>
      <div className={styles.body}>
        {
          loading && <Loading color='white' font='10rem' />
        }
        <div className={styles.body_wrapper}>
          {
            active === 'home' ?
              <>
                {
                  videos?.map((post => (
                    <PostCard key={post?._id} post={post} loading={loading} />
                  )))
                }
              </> :
              <>
                {
                  filterVideos?.map((post => (
                    <PostCard key={post?._id} post={post} loading={loading} />
                  )))
                }
              </>
          }
          {
            !videos && !loading && active !=='home' &&<h2>No {active} founds...</h2>
          }
          {
            filterVideos.length === 0 && active !=='home' &&<h2 style={{ fontSize: '3rem' }}>No {active} founds...</h2>
          }
        </div>
      </div>
    </div>
  )
}

export default Watch