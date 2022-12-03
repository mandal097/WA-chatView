import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { ClockCircleOutlined, CompassFilled, LayoutFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';

const Card = ({ details }) => {
    return (
        <Link className={styles.card} to={`/groups/${details?._id}`}>
            <div className={styles.img}>
                <img src={details.groupCoverImg} alt="img" />
            </div>
            <div className={styles.details}>
                <span>{details?.groupName} </span>
            </div>
        </Link>
    )
}


const Sidebar = () => {
    const [active, setActive] = useState('');
    const location = useLocation();
    const activeState = location.pathname.split('/')[2];
    const [searchTerm, setSearchTerm] = useState('')
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();
    const listRef = useRef();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const checkClick = (e) => {
            if (searchTerm && !listRef.current.contains(e.target)) {
                setSearchTerm('')
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [searchTerm, setSearchTerm]);

    useEffect(() => {
        setActive(activeState)
    }, [activeState])

    const navigateToSearch = () => {
        navigate({
            pathname: `/groups/search/`,
            search: `${createSearchParams({ 'q': searchTerm, count: 2})}`
        })
        setSearchTerm('')
    }

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true)
            const res = await axios.get(`/groups`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.error(res.data.message);
                setGroups(res.data.data)
            }
            setLoading(false)
            console.log(res.data.data);
        }
        fetchGroups()
    }, [])

    // console.log(groups);


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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder='search groups...'
                    />
                    {
                        searchTerm &&
                        <div className={styles.search_item} onClick={navigateToSearch} ref={listRef}>
                            <ClockCircleOutlined className={styles.icon} />
                            search for <span>{searchTerm}</span>
                        </div>
                    }
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

                <button className={styles.create_group_btn} onClick={() => navigate('/group/create')}>
                    <PlusOutlined className={styles.icon} />
                    <span>Create New Group</span>
                </button>

                <div className={styles.group_list}>
                    <h2>Groups you've joined</h2>
                    {
                        loading && <Loading font='10rem' color='white' />
                    }
                    {
                        groups.map((group) => (
                            <Card key={group._id} details={group} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar