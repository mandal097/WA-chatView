import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Suggestions.module.scss';
import axios from '../../../config/axios';
import { useDispatch } from 'react-redux'
import { followFriend } from '../../../redux/userRedux';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Loading/Loading';
import {capitalizeFirstLetter} from '../../../helpers/strings'

const Card = ({ user, onClick }) => {
  const dispatch = useDispatch()

  const followUsers = async (e) => {
    e.preventDefault()
    setTimeout(() => {
      dispatch(followFriend(user._id));
    }, 500);
    try {
      const res = await axios.put('/user/connections/follow', { friendId: user._id }, {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.status === 'err') {
        toast.error(res.data.message)
      }
      if (res.data.status === 'success') {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error('something went wrong')

    }
  }


  return (
    <>
      <ToastContainer className='toaster' />
      <div className={styles.card}>
        <div className={styles.img} style={{ width: '3.8rem', height: '3.8rem' }}>
          <img src={user?.profilePic} alt="profilepic" />
        </div>
        <span onClick={onClick}>{capitalizeFirstLetter(user?.name)}</span>
        <button onClick={followUsers}>Follow</button>
      </div>
    </>
  )
};





const Suggestions = () => {
  const { currentUser } = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
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
          setUsers(res.data.data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        toast.error('something went wrong')
      }
    }
    fetchList()
  }, []);


  useEffect(() => {
    const filteredArr = (a, b) => {
      return a?.filter(x => !b?.filter(y => y === x?._id).length);
    }
    setFilteredUsers(filteredArr(users, currentUser?.followings))

  }, [users, currentUser]);


  return (
    <div className={styles.suggestions}>

      <div className={styles.card}>
        <div className={styles.img}>
          <img src={currentUser?.profilePic} alt="profilepic" />
        </div>
        <span onClick={() => navigate(`/profile/${currentUser?._id}`)}>{capitalizeFirstLetter(currentUser?.name)}</span>
      </div>

      <div className={styles.head}>
        <h3>Suggestions</h3>
        <Link to='/friends' className='link'>See All</Link>
      </div>
      {
        loading
          ? <Loading font="7rem" color='white' />
          : <>
            {
              filteredUsers?.slice(0, 4).map((user) => (
                <Card key={user?._id} user={user} onClick={() => navigate(`/profile/${user?._id}`)} />
              ))
            }
          </>
      }
      {
        filteredUsers.length === 0 && <span style={{ fontSize: '1.8rem', textAlign: 'center' }}>No suggestions</span>
      }

    </div>
  )
}

export default Suggestions