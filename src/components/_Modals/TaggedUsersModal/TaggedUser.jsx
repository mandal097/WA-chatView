import React from 'react';
import styles from './TaggedUser.module.scss';
import {
    UserAddOutlined,
    MessageFilled
} from '@ant-design/icons';
import Modal from '../ModalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { followFriend } from '../../../redux/userRedux';
import axios from '../../../config/axios'
import { toast, ToastContainer } from 'react-toastify';
import { setCurrentChat } from '../../../redux/chatRedux';
import { useNavigate } from 'react-router-dom';

const Card = ({ user }) => {
    const { currentUser } = useSelector(state => state.user);
    // const { currentChat } = useSelector(state => state.chat);
    // const [details, setDetails] = useState({});//for messaging details of the user
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const followUsers = async (e) => {
        e.preventDefault()
        dispatch(followFriend(user._id))
        try {
            const res = await axios.put('/user/connections/follow', { friendId: user._id }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'success') {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }


    const startChat = async () => {
        const res = await axios.post('/chats/create-chat', {
            userId: user._id
        }, {
            headers: {
                token: `Bearer ${localStorage.getItem('token')}`
            }
        });


        console.log(res.data.data);
        const filter = res.data.data[0]?.users.find((c) => c._id !== currentUser._id);
        dispatch(setCurrentChat({ currentChat: filter, chatId: res.data.data[0]._id }));
        if (filter) {
            navigate('/messenger');
        }
    }


    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.user_card}>
                <div className={styles.img}>
                    <img src={user?.profilePic} alt="" />
                </div>
                <div className={styles.details}>
                    <span>
                        {user.name}
                    </span>
                    <small>45 followers</small>
                </div>
                {!currentUser.followings?.includes(user._id)
                    ? String(user._id) !== String(currentUser._id) && <button onClick={followUsers} > <UserAddOutlined className={styles.icon} /> Follow</button>
                    : <button onClick={startChat}> <MessageFilled className={styles.icon} /> Message</button>
                }
            </div >
        </>
    )
}

const TaggedUser = ({ setShowTagModal, post }) => {
    return (
        <Modal
            width='50rem'
            height='70vh'
            center='center'
            zIndex='100'
            head='Tagged friends'
            onClick={() => setShowTagModal(false)}
        >

            <div className={`${styles.tagged_list} ${'custom_scroll'}`}>

                {
                    post.tags?.map(user => (
                        <Card key={user._id} user={user} />
                    ))
                }

            </div>
        </Modal >
    )
}

export default TaggedUser