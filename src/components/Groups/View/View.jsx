import React, { useEffect, useState } from 'react';
import styles from './View.module.scss';
import { DownOutlined, GlobalOutlined, LockOutlined, PlusOutlined, UpOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard';

const View = () => {
    const [active, setActive] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [showRelatedGroup, setShowRelatedGroup] = useState(false)

    const location = useLocation();
    const activeState = location.pathname.split('/')[3];

    useEffect(() => {
        activeState === undefined ? setActive('discussion') : setActive(activeState)
    }, [activeState])

    useEffect(() => {
        const isScroll = () => {
            if (window.scrollY > 374) {
                setScrolled(true)
            } else {
                setScrolled(false)

            }
        }
        window.addEventListener('scroll', isScroll);
        return () => {
            window.removeEventListener('scroll', isScroll)
        }
    }, []);

    const handleArrow = () => {
        switch (clicked) {
            case true:
                setClicked(false);
                setShowRelatedGroup(false);
                break;
            case false:
                setClicked(true);
                setShowRelatedGroup(true);
                break;
            default:
                setClicked(false);
                setShowRelatedGroup(false);
                break;
        }
    }

    return (
        <div className={styles.view}>
            <div className={styles.group_cover}>
                <img src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?b=1&s=170667a&w=0&k=20&c=_UfKmwUAFyylJkXm75hsnM9bPRajhoK_RT5t6VWMovo=" alt="" />
            </div>
            <div className={styles.group_name}>SB FlexiFunnels DOer's Community</div>
            <div className={styles.counter}><LockOutlined className={styles.icon} /> Private group · <span>88.6k</span> members</div>
            <div className={`${styles.actions} ${scrolled && styles.scrolled}`}>
                <div className={styles.badges}>
                    {scrolled ?
                        // <h3>SB FlexiFunnels DOer's Community</h3>
                        <div className={styles.card}>
                            <div className={styles.img}>
                                <img src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?b=1&s=170667a&w=0&k=20&c=_UfKmwUAFyylJkXm75hsnM9bPRajhoK_RT5t6VWMovo=" alt="img" />
                            </div>
                            <div className={styles.details}>
                                <span>SB FlexiFunnels DOer's Community </span>
                            </div>
                        </div>
                        : <h3>user must have to add in future</h3>
                    }
                </div>

                <div className={styles.btns}>
                    <button><UsergroupAddOutlined className={styles.icon} /> Joined</button>
                    <button ><PlusOutlined className={styles.icon} />Invite</button>
                    <button onClick={handleArrow}>
                        {clicked
                            ? <UpOutlined className={styles.icon} />
                            : <DownOutlined className={styles.icon} />
                        }
                    </button>
                </div>

            </div>

            {showRelatedGroup &&
                <div className={styles.related_group}>
                    <div className={styles.head}>
                        <h2>Related Groups</h2>
                        <Link className={styles.link} to='/groups/discover'>Discover more groups</Link>
                    </div>
                    <div className={styles.groups}>
                        <div className={styles.default}>
                            <GlobalOutlined className={styles.icon}/>
                            <span>No recommendations to show</span>
                            <Link className={styles.link} to='/groups/discover'>Explore Groups</Link>
                        </div>
                        {/* <>
                            <div>
                                <GroupCard bg='var(--bgDark)' />
                            </div>
                            <div>
                                <GroupCard bg='var(--bgDark)' />
                            </div>
                            <div>
                                <GroupCard bg='var(--bgDark)' />
                            </div>
                            <div>
                                <GroupCard bg='var(--bgDark)' />
                            </div>
                        </> */}
                    </div>
                </div>}

            <div className={styles.navs}>
                <Link to={`/groups/234`} className={`${styles.nav_items}  ${active === 'discussion' && styles.active_nav}`} onClick={() => setActive('discussion')}>
                    <span className='link'>Discussion</span>
                </Link>
                <Link to={`/groups/234/featured`} className={`${styles.nav_items}  ${active === 'featured' && styles.active_nav}`} onClick={() => setActive('featured')}>
                    <span className='link'>Featured</span>
                </Link>
                <Link to={`/groups/234/videos`} className={`${styles.nav_items}  ${active === 'videos' && styles.active_nav}`} onClick={() => setActive('videos')}>
                    <span className='link'>Videos</span>
                </Link>
                <Link to={`/groups/234/members`} className={`${styles.nav_items}  ${active === 'members' && styles.active_nav}`} onClick={() => setActive('members')}>
                    <span className='link'>Members</span>
                </Link>
                <Link to={`/groups/234/media`} className={`${styles.nav_items}  ${active === 'media' && styles.active_nav}`} onClick={() => setActive('media')}>
                    <span className='link'>Media</span>
                </Link>
                <Link to={`/groups/234/files`} className={`${styles.nav_items}  ${active === 'files' && styles.active_nav}`} onClick={() => setActive('files')}>
                    <span className='link'>Files</span>
                </Link>
            </div>
            <div className={styles.outlet_}>
                <Outlet />
            </div>
        </div>
    )
}

export default View