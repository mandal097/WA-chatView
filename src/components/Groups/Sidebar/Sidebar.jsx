import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { ClockCircleOutlined, CompassFilled, LayoutFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Card = () => {

    return (
        <Link className={styles.card} to='09876'>
            <div className={styles.img}>
                <img src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?b=1&s=170667a&w=0&k=20&c=_UfKmwUAFyylJkXm75hsnM9bPRajhoK_RT5t6VWMovo=" alt="img" />
            </div>
            <div className={styles.details}>
                <span>SB FlexiFunnels DOer's Community </span>
            </div>
        </Link>
    )
}


const Sidebar = () => {
    const [active, setActive] = useState('');
    const location = useLocation();
    const activeState = location.pathname.split('/')[2];
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();
    const listRef = useRef();


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
        search:`${createSearchParams({ 'q': searchTerm })}`
        })
        setSearchTerm('')
    }

 

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

                <button className={styles.create_group_btn}>
                    <PlusOutlined className={styles.icon} />
                    <span>Create New Group</span>
                </button>

                <div className={styles.group_list}>
                    <h2>Groups you've joined</h2>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Sidebar