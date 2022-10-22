import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styles from './FriendsPage.module.scss';
import axios from '../../config/axios';
import ConnectionsModal from '../../components/_Modals/ConnectionsModal/ConnectionsModal';
import Loading from '../../components/Loading/Loading';


const Card = ({ friend }) => {
  // const { currentUser } = useSelector(state => state.user)
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [active, setActive] = useState('followers')
  return (
    <>
      <div className={styles.card}>
        <div className={styles.img}>
          <img src={friend.profilePic} alt="" />
        </div>
        <div className={styles.details}>
          <h5 className={styles.name}>{friend?.name.split(' ')[0]}</h5>
          <div className={styles.connections}>
            <span onClick={() => {
              setActive('followers')
              setShowConnectionModal(true)
            }
            } >
              {friend?.followers.length ? friend?.followers.length : 0} Followers
            </span>
            <span onClick={() => {
              setActive('followings')
              setShowConnectionModal(true)
            }
            } >
              {friend?.followings.length ? friend?.followings.length : 0} Followings
            </span>
          </div>
          <button>Follow</button>
        </div>
      </div>
      {showConnectionModal &&
        <ConnectionsModal
          active={active}
          friend={friend}
          setActive={setActive}
          setShowConnectionModal={setShowConnectionModal}
        />
      }
    </>
  )
}






const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={styles.friends}>
      <ToastContainer className='toaster' />
      <h3>Suggested</h3>
      <div className={styles.friends_div}>
        {loading
          ? <Loading font='10rem' color='white' />
          : <>
            {
              friends &&
              friends.map((friend) => (
                <Card key={friend._id} friend={friend} />
              ))
            }
          </>
        }
      </div>
    </div>
  )
}

export default FriendsPage