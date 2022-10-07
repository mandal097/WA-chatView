import React from 'react';
import styles from './GroupCard.module.scss'
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../../../redux/chatRedux';

const GroupCard = ({ group }) => {
    const dispatch = useDispatch();

    const startChat = () => {
        dispatch(setCurrentChat({ currentChat: group, chatId:group._id }))
    }

    return (
        <>
            <div className={styles.group_card} onClick={startChat}>
                <div className={styles.img}>
                    <img src={group?.groupAvatar} alt='profile pic' />
                </div>
                <span className={styles.name}>{group?.chatName}</span>
            </div>
        </>
    )
}

export default GroupCard