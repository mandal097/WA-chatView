import React, { useEffect } from 'react';
import styles from './GroupList.module.scss';
import axios from '../../../../config/axios';
import { useState } from 'react';
import Loading from '../../../Loading/Loading';
import GroupCard from '../GroupCard';

const GroupList = () => {
  const [group, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get('/chats/group/get-groups', {
        headers: {
          token: `Bearer ${token}`
        }
      })
      setGroups(res.data.data);
      setLoading(false)
    }
    fetchChats()
  }, [])
  if (loading) return <Loading font='7rem' />
  return (
    <div className={styles.group_list}>
      {
        group.map((group) => (
          <GroupCard key={group._id} group={group} type='group' />
        ))
      }
    </div>
  )
}

export default GroupList