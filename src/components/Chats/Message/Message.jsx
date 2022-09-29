import React from 'react';
import styles from './Message.module.scss'

const Message = ({ own  ,message }) => {

    return (
        <div className={`${styles.message} ${own && styles.own}`}>
            <div className={styles.img}>
                <img src="https://media.istockphoto.com/photos/teenager-using-cell-phone-outdoors-picture-id1365253345?b=1&k=20&m=1365253345&s=170667a&w=0&h=FZk3YYe7gwM7O9xt7NN0sR22rPNNLFYQewwgm7zAvXA=" alt="friends profile" />
            </div>
            <div className={`${styles.new_message}  ${own && styles.own_newmessage}`}>
                <p>{message}</p>
                <div className={` ${own ? styles.own_till : styles.till}`}></div>
            </div>
        </div>
    )
}

export default Message