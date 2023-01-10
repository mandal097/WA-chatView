import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './MemberRequest.module.scss';
import {
    CaretDownFilled,
    CaretUpFilled,
    CheckOutlined,
    QqOutlined,
    SearchOutlined
} from '@ant-design/icons';
import axios from '../../../../config/axios';
import Card from './Card';
import Loading from '../../../Loading/Loading';

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
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [activeFilter, setActiveFilter] = useState('newest');
    const [showSort, setShowSort] = useState(false);

    // const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [groupDetails, setGroupDetails] = useState({});
    // const [searchMembers, setSearchedMembers] = useState([]);

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
            // console.log(res.data.data.membersRequests)
        }
        fetchGroups()
    }, [currentGroup]);
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
                {groupDetails?.membersRequests?.length === 0 && <div className={styles.wrapper}>
                    <div className={styles.no_requests}>
                        <QqOutlined className={styles.icon} />
                        <span>No pending members </span>
                    </div>
                </div>}

                {loading && <Loading font='10rem' color='var(--text)'/>}

                {
                    groupDetails?.membersRequests?.map(request_member => (
                        <Card
                            key={request_member._id}
                            id={request_member._id}
                            groupId={currentGroup?._id}
                            user={request_member}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MemberRequest