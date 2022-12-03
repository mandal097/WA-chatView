import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import styles from './Members.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Loading/Loading';

const Members = () => {
  const { currentGroup } = useSelector(state => state.currentGroup);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [groupDetails, setGroupDetails] = useState({});
  const [searchMembers, setSearchedMembers] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true)
      const res = await axios.get(`/groups/${currentGroup?._id}/members`, {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(res.data.data);
      if (res.data.status === 'err') {
        toast.error(res.data.message)
      }
      if (res.data.status === 'success') {
        toast.success(res.data.message);
        setGroupDetails(res.data.data)
      }
      setLoading(false)
      console.log(res.data.data.members)
    }
    fetchGroups()
  }, [currentGroup]);

  useEffect(() => {
    const search = groupDetails?.members?.filter((member) => {
      if (searchTerm === '') {
        return false
      } else if (member.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return member
      }
      return false;
    });
    setSearchedMembers(search);
  }, [searchTerm, groupDetails,])


  return (
    <div className={styles.members}>
      <ToastContainer className='toast' />
      <div className={styles.top}>
        <div className={styles.heading}>
          <h3>Members <span>88564</span></h3>
        </div>
        <p>New people and Pages that join this group will appear here. <Link className={styles.link}>Learn more</Link> </p>

        <div className={styles.search_box}>
          <SearchOutlined className={styles.icon} />
          <input
            type="search"
            placeholder='Find a member'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {searchTerm ?

        <div className={styles.section}>
          <div className={styles.heading}>
            <h3>Searched Members</h3>
          </div>
          {
            searchMembers?.map(member => (
              <Card key={member._id} id={member._id} user={member} />
            ))
          }
          {
            loading && <Loading font='10rem' color='white' />
          }
          {
            searchMembers?.length === 0 &&
            <h1 style={{ fontSize: '2rem', marginTop: '2rem', color: 'var(--textSoft)', fontWeight: '200' }}>No results found for
              <span style={{ fontSize: '2rem', color: 'var(--error)' }}>{' '}{searchTerm}</span>
            </h1>
          }
        </div>

        : <div>

          <div className={styles.section} style={{ minHeight: 'auto',borderBottom:'1px solid var(--border)' }}>
            <div className={styles.heading}>
              <h3>Admins</h3>
            </div>
            {
              groupDetails.admins?.map(member => (
                <Card key={member._id} id={member._id} user={member} />
              ))
            }
            {
              loading && <Loading font='10rem' color='white' />
            }
          </div>

          <div className={styles.section}>
            <div className={styles.heading}>
              <h3>Friends in common <span>88564</span></h3>
            </div>

            {
              groupDetails.members?.map(member => (
                <Card key={member._id} id={member._id} user={member} />
              ))
            }
            {
              loading && <Loading font='10rem' color='white' />
            }

          </div>

        </div>}

    </div>
  )
}

export default Members