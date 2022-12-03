import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import styles from './Members.module.scss';
import { SearchOutlined } from '@ant-design/icons';

const Members = () => {
  const { currentUser } = useSelector(state => state.user);
  const { currentGroup } = useSelector(state => state.currentGroup);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={styles.members}>
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
            currentGroup.members?.map(id => (
              <Card key={id} id={id} />
            ))
          }
        </div>

        : <div>

          <div style={{ borderBottom: '1px solid var(--border)' }}>
            <Card id={currentUser?._id} />
          </div>

          <div className={styles.section}>
            <div className={styles.heading}>
              <h3>Friends in common <span>88564</span></h3>
            </div>
            {
              currentGroup.members?.map(id => (
                <Card key={id} id={id} />
              ))
            }

          </div>

        </div>}

    </div>
  )
}

export default Members