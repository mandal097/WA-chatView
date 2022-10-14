import React, { useEffect, useState } from 'react';
import styles from './AddModal.module.scss';
import { ArrowRightOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../config/axios';
import Loading from '../../../Loading/Loading';
import { removeMembers, setMembers } from '../../../../redux/AddToGroup';
import { toast, ToastContainer } from 'react-toastify';
import { addNewUserToGroup } from '../../../../redux/chatRedux';

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


const AddModal = ({ setShowAddModal }) => {
    const { currentChat } = useSelector(state => state.chat);
    const { members } = useSelector(state => state.group);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const addUser = (id) => {
        dispatch(setMembers(id))
    };

    const addNewUser = async () => {
        try {
            // console.log(url);
            setLoading(true)
            const token = localStorage.getItem('token');
            const res = await axios.put('/chats/group/add-new-user', {
                chatId: currentChat._id,
                userId: members
            }, {
                headers: {
                    token: `Bearer ${token}`
                }
            });
            console.log(res.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message);
            };
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                console.log(res.data.data.users);
                dispatch(addNewUserToGroup(res.data.data.users))
                setTimeout(() => {
                    dispatch(removeMembers());
                }, 1000);
                setShowAddModal(false)
            };
            setLoading(false)
        } catch (error) {
            toast.error('something went wrong')
            setLoading(false)
        }
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
        const filteredArr = (a, b) => {
            return a.filter(x => !b.filter(y => y?._id === x?._id).length);
        }
        setFilteredUsers(filteredArr(users, currentChat.users))

    }, [users, currentChat]);



    useEffect(() => {
        const search = filteredUsers.filter((user) => {
            if (searchTerm === '') {
                return user
            } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return user
            }
            return false;
        });
        setSearchedUsers(search);
        
    }, [searchTerm, filteredUsers])


    return (
        <div className={styles.add_modal}>
            <ToastContainer className='toaster' />
            <div className={styles.wrapper}>
                <button className={styles.cancel} onClick={() => {
                    setShowAddModal(false);
                    dispatch(removeMembers())
                }}><CloseOutlined className={styles.icon} /></button>
                <h2>Add new users</h2>
                <div className={styles.body}>
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
                            <div div className={styles.selected}>
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
                        <div className={styles.add_user_btn} onClick={addNewUser}>
                            <span>Add</span>
                            <ArrowRightOutlined className={styles.icon} />
                        </div>
                    }

                    <div className={styles.users_list}>
                        {
                            loading ? <Loading /> :
                                <>
                                    {searchTerm ?
                                        searchedUsers.map(u => (
                                            <UsersCard key={u?._id} u={u} onClick={() => addUser(u?._id)} />
                                        )) :
                                        filteredUsers.map(u => (
                                            <UsersCard key={u?._id} u={u} onClick={() => addUser(u?._id)} />
                                        ))
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddModal