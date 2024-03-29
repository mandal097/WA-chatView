import React, { useEffect, useState } from 'react';
import styles from './View.module.scss';
import { DownOutlined, QqOutlined, LockOutlined, PlusOutlined, UpOutlined, UsergroupAddOutlined, CameraFilled, ExportOutlined, DeleteFilled } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import GroupCard from '../GroupCard/GroupCard';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { pushMemberRequest, setCurrentGroup, updateGroupCoverImg } from '../../../redux/currentGroup';
import { useUpload } from '../../../hooks/useUpload';
import UserBadge from '../../UserBadge/UserBadge';
import ExitPopUp from './ExitPopUp';
import AboutGroup from '../About/About';
import DeletePopUP from './DeletePop';

const View = () => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    const { currentUser } = useSelector(state => state.user);
    const [active, setActive] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [showRelatedGroup, setShowRelatedGroup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [groupDetails, setGroupDetails] = useState({});
    const [coverImg, setCoverImg] = useState('');
    const [uploading, setUploading] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [showGroup, setShowGroup] = useState(false)
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const groupId = location.pathname.split('/')[2]
    const activeState = location.pathname.split('/')[3];
    const [isAdmin, setIsAdmin] = useState(false);

    const [sending, setSending] = useState(false) // loading purpose for sending request to join member

    const { uploadPerc, url } = useUpload(coverImg)

    useEffect(() => {
        activeState === undefined ? setActive('discussion') : setActive(activeState)
    }, [activeState])

    useEffect(() => {
        const check = currentGroup?.members?.includes(currentUser?._id)
        if (currentGroup?.isPrivate === 'private' && check) {
            setShowGroup(true);
            // if (check) {
            //     setShowGroup(true);
            // } else {
            //     setShowGroup(false);
            // }
        } else if (currentGroup?.isPrivate === 'public') {
            setShowGroup(true);
        }
        else {
            setShowGroup(false);
        }
    }, [currentGroup, currentUser]);


    useEffect(() => {
        const check = currentGroup?.admins.includes(String(currentUser?._id))
        if (check && activeState !== undefined) {
            setIsAdmin(true);
        }
        const routes = [undefined, 'about', 'featured', 'videos', 'members', 'media', 'files']
        const dblCheck = routes.includes(activeState)
        // if (check && activeState === undefined) {
        if (dblCheck) {
            setIsAdmin(false);
        }
    }, [currentGroup, currentUser, activeState]);

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

    useEffect(() => {
        const fetchGroupDetails = async () => {
            const res = await axios.get(`/groups/${groupId}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setLoading(false)
            }
            if (res.data.status === 'success') {
                toast.error(res.data.message);
                setGroupDetails(res.data.data)
                dispatch(setCurrentGroup(res.data.data))
                setLoading(false);
            }
            // console.log(res.data);
        }
        fetchGroupDetails()
    }, [groupId, dispatch]);

    const updateCoverImg = async () => {
        try {
            setUploading(true);
            const res = await axios.put(`/groups/update/${currentGroup?._id}`, {
                groupCoverImg: url ? url : currentGroup?.groupCoverImg,
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setUploading(false);
                dispatch(updateGroupCoverImg(url))
                window.location.reload()
            }
        } catch (error) {
            toast.error('something went wrong')
            setUploading(false);
        }
    };

    const handleRequests = async () => {
        try {
            setSending(true);
            const res = await axios.put(`/groups/member-request/${currentGroup?._id}`, {}, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setSending(false);
            }
            if (res.data.status === 'success') {
                setSending(false);
                toast.success(res.data.message);
                dispatch(pushMemberRequest(currentUser?._id))
                // console.log(res.data);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setSending(false);
        }
    }

    // console.log(currentGroup);

    if (loading) return <Loading font='15rem' color='white' />

    return (
        <>
            {!isAdmin ?
                <div className={styles.view}>
                    <div className={styles.group_cover}>
                        {coverImg
                            ? <img src={URL.createObjectURL(coverImg)} alt="profile pictures" />
                            : <img src={groupDetails?.groupCoverImg} alt="profile pictures" />}
                        {currentGroup?.admins.includes(String(currentUser?._id)) && <div className={styles.edit_cover}>
                            {coverImg && uploadPerc === 100 && <button className={`${styles.edit_cover_btns} ${styles.edit_cover_button}`} onClick={updateCoverImg}>{uploading ? <Loading /> : 'Update cover image'}</button>}

                            {uploadPerc < 99 && uploadPerc > 0 &&
                                <button className={`${styles.edit_cover_btns} ${styles.edit_cover_button}`} >{'uploading ' + uploadPerc + '%'}  </button>}

                            <label htmlFor='coverImg' className={styles.edit_cover_btns}><CameraFilled className={styles.icon} />Edit Cover Photo</label>
                        </div>}
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            accept='image/*'
                            id="coverImg"
                            onChange={(e) => setCoverImg(e.target.files[0])}
                        />
                    </div>
                    <div className={styles.group_name}>{groupDetails?.groupName}</div>
                    <div className={styles.counter}><LockOutlined className={styles.icon} />{groupDetails?.isPrivate} group · <span>{groupDetails?.members?.length}</span> member{groupDetails?.members?.length > 1 ? "'s" : ''}</div>
                    <div className={`${styles.actions} ${scrolled && styles.scrolled}`}>
                        <div className={styles.badges}>
                            {scrolled ?
                                // <h3>SB FlexiFunnels DOer's Community</h3>
                                <div className={styles.card}>
                                    <div className={styles.img}>
                                        <img src={groupDetails?.groupCoverImg} alt="" />
                                    </div>
                                    <div className={styles.details}>
                                        <span>{groupDetails?.groupName} </span>
                                    </div>
                                </div>
                                :
                                <UserBadge array={currentGroup?.members} show='true' />

                            }
                        </div>

                        <div className={styles.btns}>


                            {currentGroup?.members?.includes(currentUser?._id)
                                ?
                                <button onClick={handleRequests}><UsergroupAddOutlined className={styles.icon}
                                /> {currentGroup?.members?.includes(currentUser?._id) ? 'Joined' : sending ? 'wait...' : 'Leave group'}</button>

                                : <button onClick={handleRequests}><UsergroupAddOutlined className={styles.icon}
                                /> {currentGroup?.membersRequests?.includes(currentUser?._id) ? 'Requested' : sending ? 'wait...' : 'Join'}</button>}



                            {
                                currentGroup?.admins?.includes(currentUser?._id) &&
                                <button onClick={() => navigate(`/groups/${currentGroup?._id}/invite-members`)} ><PlusOutlined className={styles.icon} />Invite</button>
                            }
                            {
                                currentGroup?.members?.includes(currentUser?._id) &&
                                <button onClick={() => setShowPop(!showPop)} style={{ padding: '0 1rem' }}><ExportOutlined className={styles.icon} /></button>
                            }
                            {
                                currentGroup?.admins?.includes(currentUser?._id) &&
                                <button onClick={() => setShowDeletePopUp(!showDeletePopUp)} style={{ padding: '0 1rem' }}>
                                    <DeleteFilled className={styles.icon} />
                                </button>
                            }
                            <button onClick={handleArrow} style={{ padding: '0 1rem' }}>
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
                                    <QqOutlined className={styles.icon} />
                                    <span>No recommendations to show</span>
                                    <Link className={styles.link} to='/groups/discover'>Explore Groups</Link>
                                </div>

                            </div>
                        </div>}

                    <div className={styles.navs}>
                        {showGroup ? <>
                            <Link to={`/groups/${groupId}`} className={`${styles.nav_items}  ${active === 'discussion' && styles.active_nav}`} onClick={() => setActive('discussion')}>
                                <span className='link'>Discussion</span>
                            </Link>
                            <Link to={`/groups/${groupId}/featured`} className={`${styles.nav_items}  ${active === 'featured' && styles.active_nav}`} onClick={() => setActive('featured')}>
                                <span className='link'>Featured</span>
                            </Link>
                            <Link to={`/groups/${groupId}/videos`} className={`${styles.nav_items}  ${active === 'videos' && styles.active_nav}`} onClick={() => setActive('videos')}>
                                <span className='link'>Videos</span>
                            </Link>
                            <Link to={`/groups/${groupId}/members`} className={`${styles.nav_items}  ${active === 'members' && styles.active_nav}`} onClick={() => setActive('members')}>
                                <span className='link'>Members</span>
                            </Link>
                            <Link to={`/groups/${groupId}/media`} className={`${styles.nav_items}  ${active === 'media' && styles.active_nav}`} onClick={() => setActive('media')}>
                                <span className='link'>Media</span>
                            </Link>
                            <Link to={`/groups/${groupId}/files`} className={`${styles.nav_items}  ${active === 'files' && styles.active_nav}`} onClick={() => setActive('files')}>
                                <span className='link'>Files</span>
                            </Link>
                        </>
                            : <Link to={`/groups/${groupId}/about`} className={`${styles.nav_items}  ${active === 'about' && styles.active_nav}`} onClick={() => setActive('about')}>
                                <span className='link'>About</span>
                            </Link>
                        }
                    </div>
                    <div className={styles.outlet_}>
                        {showGroup ? <Outlet /> : <AboutGroup />}
                    </div>
                </div> :
                <div className={styles.outlet_}>
                    {showGroup ? <Outlet /> : <AboutGroup />}
                </div>
            }

            {
                showPop &&
                <ExitPopUp
                    setShowPop={setShowPop}
                    showPop={showPop}
                    user={currentUser}
                    group={currentGroup}
                />
            }
            {
                showDeletePopUp &&
                <DeletePopUP
                    showDeletePopUp={showDeletePopUp}
                    setShowDeletePopUp={setShowDeletePopUp}
                    group={currentGroup}
                />
            }

        </>
    )
}

export default View