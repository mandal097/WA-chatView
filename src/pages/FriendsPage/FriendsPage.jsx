import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styles from './FriendsPage.module.scss';
import axios from '../../config/axios';
import ConnectionsModal from '../../components/_Modals/ConnectionsModal/ConnectionsModal';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { followFriend, unFollowFriend } from '../../redux/userRedux';
import { useNavigate } from 'react-router-dom';


const Card = ({ friendId }) => {
  const { currentUser } = useSelector(state => state.user)
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [active, setActive] = useState('followers');
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {

      try {
        setLoading(true)
        const res = await axios.get(`/user/get-profile/${friendId}`, {
          headers: {
            token: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.status === 'err') {
          toast.error(res.data.message)
          setLoading(false);
        }
        if (res.data.status === 'success') {
          setUserDetails(res.data.data)
          setLoading(false);
        }
      } catch (error) {
        toast.error('Something went wrong')
        setLoading(false);
      }
    }
    getProfile()
  }, [friendId])

  const followUsers = async (e) => {
    e.preventDefault()
    dispatch(followFriend(friendId))
    try {
      const res = await axios.put('/user/connections/follow', { friendId: friendId }, {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.status === 'err') {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error('something went wrong');
    }
  }


  const unFollowUsers = async (e) => {
    e.preventDefault()
    dispatch(unFollowFriend(friendId));
    try {
      const res = await axios.put('/user/connections/unfollow', { friendId: friendId }, {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.status === 'err') {
        toast.error(res.data.message)
      }
      // if (res.data.status === 'success') {
      //     toast.success(res.data.message)
      // }
    } catch (error) {
      toast.error('something went wrong')
    }
  };


  return (
    <>
      <div className={styles.card}>
        {loading
          ? <Loading font='8rem' color='white' />
          :
          <>
            <div className={styles.img} onClick={()=>navigate(`/profile/${friendId}`)}>
              <img src={userDetails.profilePic} alt="" />
            </div>
            <div className={styles.details}>
              <h5 className={styles.name}>{userDetails?.name?.split(' ')[0]}</h5>
              <div className={styles.connections}>
                <span onClick={() => {
                  setActive('followers')
                  setShowConnectionModal(true)
                }
                } >
                  {userDetails?.followers?.length ? userDetails?.followers?.length : 0} Followers
                </span>
                <span onClick={() => {
                  setActive('followings')
                  setShowConnectionModal(true)
                }
                } >
                  {userDetails?.followings?.length ? userDetails?.followings?.length : 0} Followings
                </span>
              </div>
              {
                currentUser?.followings?.includes(friendId)
                  ? <button className={styles.unfollowBtn} onClick={unFollowUsers}>Unfollow</button>
                  : <button className={styles.followBtn}  onClick={followUsers}>Follow</button>
              }
            </div>
          </>
        }
      </div>
      {showConnectionModal &&
        <ConnectionsModal
          active={active}
          friend={userDetails}
          setActive={setActive}
          setShowConnectionModal={setShowConnectionModal}
        />
      }
    </>
  )
}






const FriendsPage = () => {
  const { currentUser } = useSelector(state => state.user);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
        toast.error('somethin went wrong')
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
      <h3>Suggested</h3>
      <div className={styles.friends_div}>
        {loading
          ? <Loading font='10rem' color='white' />
          : <>
            {
              filteredUsers &&
              filteredUsers.map((friend) => (
                <Card key={friend._id} friendId={friend._id} />
              ))
            }
          </>
        }
      </div>
      <h3 style={{ marginTop: '1.6rem' }}>Followers</h3>
      <div className={styles.friends_div}>
        {loading
          ? <Loading font='10rem' color='white' />
          : <>
            {
              currentUser &&
              currentUser?.followers?.map((id) => (
                <Card key={id} friendId={id} />
              ))
            }
          </>
        }
      </div>
      <h3 style={{ marginTop: '1.6rem' }}>Followings</h3>
      <div className={styles.friends_div}>
        {loading
          ? <Loading font='10rem' color='white' />
          : <>
            {
              currentUser &&
              currentUser?.followings?.map((id) => (
                <Card key={id} friendId={id} />
              ))
            }
          </>
        }
      </div>
    </div>
  )
}

export default FriendsPage