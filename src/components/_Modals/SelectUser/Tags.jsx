import { ArrowRightOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
import Modal from '../ModalLayout';
import styles from './Tags.module.scss';
import Loading from '../../Loading/Loading';
import { removeMembers, setMembers } from '../../../redux/AddToGroup';

const UsersCard = ({ u, onClick }) => {

    return (
        <div className={styles.user} onClick={onClick}>
            <img src={u.profilePic} alt="profile pic" className={styles.img} />
            <span>{u.name}</span>
        </div>
    )
}
const SelectedUser = ({ m }) => {
    const [member, setMember] = useState({});
    const dispatch = useDispatch()

    const remove = (id) => {
        dispatch(setMembers(id))
    };
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user/get-profile/${m}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setMember(res.data.data);
        }
        fetchUser()
    }, [m])
    return (
        <div className={styles.selected_users}>
            <img src={member?.profilePic} alt="profile pic" className={styles.img} />
            <span>{member?.name}</span>
            <div className={styles.remove} onClick={() => remove(m)}><CloseOutlined className={styles.icon} /></div>
        </div>
    )
}


const Tags = ({ setShowTag, btn }) => {
    const { members } = useSelector(state => state.group);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const addUser = (id) => {
        dispatch(setMembers(id))
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            const res = await axios.get('/user/get-all-users', {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(res.data.data);
            setLoading(false);
        }
        fetchUser();
    }, []);




    useEffect(() => {
        const search = users.filter((user) => {
            if (searchTerm === '') {
                return user
            } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user
            }
            return false;
        });
        setSearchedUsers(search);

    }, [searchTerm, users])

    return (
        <Modal
            width='50rem'
            height='83vh'
            margin='6rem 0'
            zIndex='10001'
            head='Select friends'
            onClick={() => {
                dispatch(removeMembers())
                setShowTag(false)
            }}
        >
            <div className={`${styles.wrap} ${'custom_scroll'}`}>
                <div className={styles.search} >
                    <input
                        type="text"
                        placeholder='search friends'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchOutlined className={styles.icon} />
                </div>

                {members.length !== 0 &&

                    <>
                        <div div className={`${styles.selected} ${'custom_scroll'}`}>
                            {
                                members.map(m => (
                                    <SelectedUser key={m?._id} m={m} />
                                ))
                            }
                        </div>
                    </>
                }

                {
                    members.length !== 0 &&
                    <div className={styles.add_user_btn} onClick={() => setShowTag(false)}>
                        <span> {btn === undefined && "Tag "} {btn === "add" && "Add "}  them</span>
                        <ArrowRightOutlined className={styles.icon} />
                    </div>
                }

                <div className={`${styles.users_list} ${'custom_scroll'}`}
                    style={{ height: members.length >= 0 ? 'calc(80vh - 25.8rem)' : 'calc(80vh - 15.8rem)' }}
                >
                    {
                        loading
                            ? <Loading />
                            : <>
                                {searchTerm ?
                                    searchedUsers.map(u => (
                                        <UsersCard key={u?._id} u={u}
                                            onClick={() => addUser(u?._id)}
                                        />
                                    )) :
                                    users.map(u => (
                                        <UsersCard key={u?._id} u={u}
                                            onClick={() => addUser(u?._id)}
                                        />
                                    ))
                                }
                            </>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default Tags