import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styles from './FriendsPage.module.scss';
import axios from '../../config/axios';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';
import Card from './Card';
import { CheckOutlined, SmileOutlined, UserAddOutlined } from '@ant-design/icons';

const FriendsPage = () => {
  const { currentUser } = useSelector(state => state.user);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [active, setActive] = useState('suggested')

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/user/get-all-users', {
          headers: {
            token: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.status === 'err') {
          toast.error(res.data.message)
          setLoading(false)
        }
        if (res.data.status === 'success') {
          toast.success(res.data.message)
          setFriends(res.data.data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        toast.error('something went wrong')
      }
    }
    fetchFriends()
  }, []);

  useEffect(() => {
    const filteredArr = (a, b) => {
      return a.filter(x => !b.filter(y => y === x?._id).length);
    }
    setFilteredUsers(filteredArr(friends, currentUser.followings))

  }, [friends, currentUser]);


  return (
    <div className={styles.friends}>
      <ToastContainer className='toaster' />

      <div className={styles.side_bar}>

        <div onClick={() => setActive('suggested')}
          className={`${styles.filters} ${active === 'suggested' && styles.active}`}>
          <div className={styles.icon_}>
            <UserAddOutlined className={styles.icon} />
          </div>
          <span>Suggested</span>
        </div>
        <div onClick={() => setActive('followings')}
          className={`${styles.filters} ${active === 'followings' && styles.active}`}>
          <div className={styles.icon_}>
            <CheckOutlined className={styles.icon} />
          </div>
          <span>Followings</span>
        </div>
        <div onClick={() => setActive('followers')}
          className={`${styles.filters} ${active === 'followers' && styles.active}`}>
          <div className={styles.icon_}>
            <SmileOutlined className={styles.icon} />
          </div>
          <span>Followers</span>
        </div>

      </div>


      <div className={styles.body}>
        <h3>{active}</h3>
        <div className={styles.friends_div}>
          {loading
            ? <Loading font='10rem' color='white' />
            : <>
              {
                filteredUsers && active === 'suggested' &&
                filteredUsers.map((friend) => (
                  <Card key={friend._id} friendId={friend._id} />
                ))
              }
            </>
          }
          {loading
            ? <Loading font='10rem' color='white' />
            : <>
              {
                currentUser && active === 'followings' &&
                currentUser?.followings?.map((id) => (
                  <Card key={id} friendId={id} />
                ))
              }
            </>
          }
          {loading
            ? <Loading font='10rem' color='white' />
            : <>
              {
                currentUser && active === 'followers' &&
                currentUser?.followers?.map((id) => (
                  <Card key={id} friendId={id} />
                ))
              }
            </>
          }
        </div>
      
      </div>
    </div>
  )
}

export default FriendsPage