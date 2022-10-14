import React from 'react';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { EditFilled, PlusCircleFilled, CameraFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Posts from '../../components/Profiles/Posts/Posts';


const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [active, setActive] = useState('posts');
    return (
        <>
            <div className={styles.profile_container}>
                <div className={styles.profile}>
                    <div className={styles.cover_img}>
                        <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.6435-9/100527609_1077588095956610_3980996785706369024_n.jpg?stp=dst-jpg_p180x540&_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=jgl8Y1QaPm0AX8WGkmY&_nc_ht=scontent.fdel27-4.fna&oh=00_AT-NiNCq2VXbKrf1BpcUUvqR3-1X3SDULsBEMNZzN92dcw&oe=636E3982" alt="coverImg" />
                        <div className={styles.edit_cover}><CameraFilled className={styles.icon} />Edit Cover Photo</div>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.profile_img}>
                            <img src={currentUser?.profilePic} alt="profilImage" />
                        </div>
                        <div className={styles.profile_details}>
                            <h3 className={styles.name}>{currentUser.name}</h3>
                            <div className={styles.connections}>
                                <div className={styles.conn_}><span>43</span> followers</div>
                                <div className={styles.conn_}><span>73</span> followings</div>
                            </div>
                            <div className={styles.user_actions}>
                                <div className={styles.connections_list}>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                    <div className={styles.list_item}>
                                        <img src="https://avatars.githubusercontent.com/u/90108894?v=4" alt="friends pictures" />
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button><PlusCircleFilled className={styles.icon} />Add story</button>
                                    <button><EditFilled className={styles.icon} />Edit Profile </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.navs}>
                        <Link to='#' className={`${styles.nav_items}  ${active === 'posts' && styles.active_nav}`} onClick={() => setActive('posts')}>
                            <span className='link'>Posts</span>
                        </Link>
                        <Link to='#' className={`${styles.nav_items}  ${active === 'photos' && styles.active_nav}`} onClick={() => setActive('photos')}>
                            <span className='link'>Photos</span>
                        </Link>
                        <Link to='#' className={`${styles.nav_items}  ${active === 'about' && styles.active_nav}`} onClick={() => setActive('about')}>
                            <span className='link'>About</span>
                        </Link>
                        <Link to='#' className={`${styles.nav_items}  ${active === 'videos' && styles.active_nav}`} onClick={() => setActive('videos')}>
                            <span className='link'>Videos</span>
                        </Link>
                        <Link to='#' className={`${styles.nav_items}  ${active === 'more' && styles.active_nav}`} onClick={() => setActive('more')}>
                            <span className='link'>More</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.outlets}>
                <Posts />
            </div>
        </>
    )
}

export default Profile