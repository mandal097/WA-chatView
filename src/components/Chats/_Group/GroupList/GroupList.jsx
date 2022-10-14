import React, { useEffect } from 'react';
import styles from './GroupList.module.scss';
import axios from '../../../../config/axios';
import { useState } from 'react';
import Loading from '../../../Loading/Loading';
import GroupCard from '../GroupCard';
import { useDispatch, useSelector } from 'react-redux';
import { setGroups } from '../../../../redux/chatRedux';

const GroupList = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { groups } = useSelector(state => state.chat)
  const dispatch = useDispatch();
  // console.log(groups);
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get('/chats/group/get-groups', {
        headers: {
          token: `Bearer ${token}`
        }
      })
      dispatch(setGroups(res.data.data))
      setLoading(false)
    }
    fetchChats()
  }, [dispatch]);


  useEffect(() => {
    const search = groups?.filter((user) => {
      if (searchTerm === '') {
        return user
      } else if (user?.chatName?.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())) {
        return user
      }
      return false;
    });
    setSearchedUsers(search);

  }, [searchTerm, groups])



  if (loading) return <Loading font='7rem' />
  return (
    <div className={styles.group_list}>
      {searchTerm ?
        searchedUsers.map((group) => (
          <GroupCard key={group._id} group={group} type='group' />
        )) :
        groups.map((group) => (
          <GroupCard key={group._id} group={group} type='group' />
        ))
      }
    </div>
  )
}

export default GroupList