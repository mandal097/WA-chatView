import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styles from './FriendsList.module.scss';
import axios from '../../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Card = ({ el, setShowFriendsList, setSearchText }) => {
    return (
        <Link to={`/profile/${el._id}`} className={styles.search_user_card} onClick={() => {
            setSearchText('')
            setShowFriendsList(false);
        }}>
            <div className={styles.img}>
                <img src={el.profilePic} alt="user_image" />
            </div>
            <span>{el.name}</span>
        </Link>
    )
}

const FriendsList = ({ showFriendsList, setShowFriendsList, searchText, setSearchText }) => {
    const listRef = useRef();
    const [list, setList] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                // setLoading(true)
                const res = await axios.get('/user/get-all-users', {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    toast.error(res.data.message)
                    // setLoading(false)
                }
                if (res.data.status === 'success') {
                    toast.success(res.data.message)
                    setList(res.data.data)
                    // setLoading(false)
                }
            } catch (error) {
                // setLoading(false)
                toast.error('somethin went wrong')
            }
        }
        fetchList()
    }, []);

    useEffect(() => {
        const search = list.filter((user) => {
            if (searchText === '') {
                return false
            } else if (user.name.toLowerCase().includes(searchText.toLowerCase())) {
                return user
            }
            return false;
        });
        setSearchedUsers(search);
    }, [searchText, list])


    useEffect(() => {
        const checkClick = (e) => {
            if (showFriendsList && !listRef.current.contains(e.target)) {
                setShowFriendsList(false)
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showFriendsList, setShowFriendsList]);

    return (
        // {

        <>
            {/* {loading
                ? <Loading font='7rem' />
                : */}
                <div div className={`${styles.friendslist} ${'custom_scroll'}`
                } ref={listRef} >
                    <ToastContainer className='toaster' />
                    <div className={styles.wrapper}>
                        {/* -------------------searched users----------------- */}

                        {searchedUsers.length > 0 && <h3>Searched users</h3>}
                        {searchedUsers &&
                            searchedUsers.map(el => (
                                <Card
                                    key={el._id}
                                    el={el}
                                    setShowFriendsList={setShowFriendsList}
                                    setSearchText={setSearchText}
                                />
                            ))
                        }

                        {/* -------------------all users----------------- */}
                        <h3 style={{ marginTop: '2rem' }}>Suggested</h3>
                        {
                            list.map(el => (
                                <Card
                                    key={el._id}
                                    el={el}
                                    setShowFriendsList={setShowFriendsList}
                                    setSearchText={setSearchText}
                                />
                            ))
                        }


                    </div>
                </div >
            {/* } */}
        </>
        // }
    )
}

export default FriendsList