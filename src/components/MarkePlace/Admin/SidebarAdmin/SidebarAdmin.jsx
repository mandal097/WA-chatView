import React, { useState } from 'react';
import styles from './SidebarAdmin.module.scss'
import { ClockCircleOutlined, CompassFilled, LayoutFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
    const [active, setActive] = useState('');
  return (
         <div className={styles.sidebar}>
            <div className={styles.top}>
                <div className={styles.heading}>
                    <span>Groups</span>
                </div>
                <div className={styles.search_box}>
                    <SearchOutlined className={styles.icon} />
                    <input
                        type="search"
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        // value={searchTerm}
                        placeholder='search groups...'
                    />
                        <div className={styles.search_item}>
                            <ClockCircleOutlined className={styles.icon} />
                            {/* search for <span>{searchTerm}</span> */}
                        </div>
                </div>
            </div>
            <div className={`${styles.bottom} ${'custom_scroll'}`}>

                <Link onClick={() => setActive('feed')} to='feed'
                    className={`${styles.links} ${active === 'feed' && styles.active}`}>
                    <div className={styles.icon_}>
                        <LayoutFilled className={styles.icon} />
                    </div>
                    <span>Your feed</span>
                </Link>

                <Link onClick={() => setActive('discover')} to='discover'
                    className={`${styles.links} ${active === 'discover' && styles.active}`}>
                    <div className={styles.icon_}>
                        <CompassFilled className={styles.icon} />
                    </div>
                    <span>Discover</span>
                </Link>

                <button className={styles.create_group_btn}>
                    <PlusOutlined className={styles.icon} />
                    <span>Create New Group</span>
                </button>

                <div className={styles.group_list}>
                    <h2>Groups you've joined</h2>
                  
                </div>
            </div>
    </div>
  )
}

export default SidebarAdmin