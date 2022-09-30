import React from 'react';
import styles from './NewConversations.module.scss';
import ChatsCard from '../FriendsCard/FriendsCard';
import { ArrowLeftOutlined } from '@ant-design/icons';

const NewConverstations = ({ setNewConverstations  ,setCurrentChat}) => {
    return (
        <div className={styles.new_conversations}>
            <div className={styles.btn_wrapper}>
                <button onClick={() => setNewConverstations(false)}>
                    <ArrowLeftOutlined className={styles.icon}/>
                    <span>Go to chats</span>
                </button>
            </div>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
            <ChatsCard setCurrentChat={setCurrentChat}/>
        </div>
    )
}

export default NewConverstations