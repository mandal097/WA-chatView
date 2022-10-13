import React, { useEffect, useState } from 'react';
import styles from './AddModal.module.scss';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../config/axios';
import Loading from '../../../Loading/Loading';
import { removeMembers, setMembers } from '../../../../redux/AddToGroup';


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
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


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
        const filteredArr = (a, b) => {
            return a.filter(x => !b.filter(y => y?._id === x?._id).length);
        }
        setFilteredUsers(filteredArr(users, currentChat.users))

    }, [users, currentChat])


    return (
        <div className={styles.add_modal}>
            <div className={styles.wrapper}>
                <button className={styles.cancel} onClick={() => setShowAddModal(false)}><CloseOutlined className={styles.icon} /></button>
                <h2>Add new users</h2>
                <div className={styles.body}>
                    <div className={styles.search}>
                        <input type="text" placeholder='search friends' />
                        <SearchOutlined className={styles.icon} />
                    </div>
                    {/* {members.length !== 0 &&
                        <> */}
                    <div div className={styles.selected}>
                        {
                            members.length !== 0 && members.map(m => (
                                <SelectedUser key={m?._id} m={m} />
                            ))
                        }
                    </div>
                    {/* </>
                    } */}

                    <div className={styles.users_list}>
                        {
                            loading ? <Loading /> :
                                <>
                                    {
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