import React from 'react';
import styles from './TaggedUser.module.scss';
import {
    UserAddOutlined,
    // MessageFilled
} from '@ant-design/icons';
import Modal from '../ModalLayout';

const Card = ({ user }) => {
    return (
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
            <button> <UserAddOutlined className={styles.icon} /> Follow</button>
            {/* <button> <MessageFilled className={styles.icon} /> Message</button> */}
        </div>
    )
}

const TaggedUser = ({ setShowTagModal, post }) => {
    console.log(post);
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