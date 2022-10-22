import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Comment.module.scss';
import {
    // HeartFilled,
    HeartOutlined
} from '@ant-design/icons'


const Replies = () => {
    const { currentUser } = useSelector(state => state.user)
    return (

        <div className={styles.comment} style={{ margin: '1rem 0' }}> {/*replies to comments */}
            <div className={styles.img}>
                <img src={currentUser.profilePic} alt="" />
            </div>
            <div className={styles.comment_wrapper}>
                <div className={styles.comment_details}>
                    <span>{currentUser.name}</span>
                    <p>Lorem ipsum dolor sit amet consectett.</p>
                    <div className={styles.cta_}>
                        <small>1 h </small>
                        <small>5 likes </small>
                        <div className={styles.like}>
                            {/* <HeartFilled className={styles.icon}/> */}
                            <HeartOutlined className={styles.icon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Comment = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className={styles.comments}>

            <div className={styles.comment}>
                <div className={styles.img}>
                    <img src={currentUser.profilePic} alt="" />
                </div>
                <div className={styles.comment_wrapper}>
                    <div className={styles.comment_details}>
                        <span>{currentUser.name}</span>
                        <p>Lorem ipsum dolor sit amet consectett.</p>
                        <div className={styles.cta_}>
                            <small>1 h </small>
                            <small>5 likes </small>
                            <small>1 reply </small>
                            <div className={styles.like}>
                                {/* <HeartFilled className={styles.icon}/> */}
                                <HeartOutlined className={styles.icon} />
                            </div>
                        </div>
                    </div>



                    <div className={styles.show_reply}>
                        _____ show replies
                    </div>

                    <Replies />

                    <div className={styles.show_reply}>
                        _____ hide replies
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Comment