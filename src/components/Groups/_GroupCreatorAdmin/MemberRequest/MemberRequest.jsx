import { CaretDownFilled, CaretUpFilled, CheckOutlined, QqOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { useState } from 'react';
import styles from './MemberRequest.module.scss';

const Sort = ({ setActiveFilter, activeFilter }) => {

    return (
        <div className={styles.sort_}>
            <div className={`${styles.filter} ${activeFilter === 'newest' && styles.filter_active}`} onClick={() => setActiveFilter('newest')}>
                <span>Newest first</span>  {activeFilter === 'newest' && <CheckOutlined className={styles.icon_} />}</div>
            <div className={`${styles.filter} ${activeFilter === 'oldest' && styles.filter_active}`} onClick={() => setActiveFilter('oldest')}>
                <span>Oldest first</span>  {activeFilter === 'oldest' && <CheckOutlined className={styles.icon_} />}</div>
        </div>
    )
}

const MemberRequest = () => {
    const [activeFilter, setActiveFilter] = useState('newest');
    const [showSort, setShowSort] = useState(false)
    return (
        <div className={styles.member_request}>
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <h1>Member requests</h1>
                    <div className={styles.search_box}>
                        <div className={styles.search}>
                            <SearchOutlined className={styles.icon} />
                            <input type="text" placeholder='search by name' />
                        </div>
                        <div className={styles.sort_btn} onClick={() => setShowSort(!showSort)}>
                            <span> {activeFilter} First
                                {/* {activeFilter === 'newest' && ' First'}
                                {activeFilter === 'oldest' && ' First'} */}
                            </span>
                            {
                                showSort ?
                                    <CaretUpFilled className={styles.icon} />
                                    : <CaretDownFilled className={styles.icon} />
                            }
                            {
                                showSort &&
                                <Sort setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.wrapper}>
                    <div className={styles.no_requests}>
                        <QqOutlined className={styles.icon} />
                        <span>No pending members </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberRequest