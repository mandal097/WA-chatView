import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { capitalizeFirstLetter } from '../../../../helpers/strings';
import styles from './PopUp.module.scss';
import axios from '../../../../config/axios';
import { useDispatch } from 'react-redux';
import { pullAdminInvites, pushAdminInvites } from '../../../../redux/currentGroup';


const PopUp = ({ setShowPop, showPop, type, user, groupId, setRemoved, setInvited }) => {
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkClick = (e) => {
            if (showPop && !ref.current.contains(e.target)) {
                setShowPop(false)
            }

        }
        document.addEventListener('mousedown', checkClick);

        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [setShowPop, showPop, ref]);

    const inviteAsAdmin = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`/groups/handle-admins/invite/${groupId}`, {
                memberId: user?._id
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setLoading(false);
            }
            if (res.data.status === 'success') {
                // setInvited(true)
                dispatch(pushAdminInvites(user._id))
                toast.success(res.data.message);
                setLoading(false);
                setTimeout(() => {
                    setShowPop(false);
                }, 500);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false);
        }
    };


    const removeFromGroup = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`/groups/members/remove/${groupId}`, {
                memberId: user?._id
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                setRemoved(true)
                setLoading(false);
                dispatch(pullAdminInvites(user?._id))
                setTimeout(() => {
                    setShowPop(false);
                }, 500);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.pop_up}>
                <div className={styles.body} ref={ref}>
                    <div className={styles.img}>
                        <img src={user?.profilePic} alt="profile" />
                    </div>
                    <span>{capitalizeFirstLetter(user?.name)}</span>
                    {
                        type === 'delete'
                            ?
                            <p>Are you sure you want to remove <span>{capitalizeFirstLetter(user?.name)}</span>  from the group? </p>
                            :
                            <p>Are you sure you want to invite <span style={{ color: 'var(--successLight)' }}>{capitalizeFirstLetter(user?.name)}</span> be the admin of this group ?</p>
                    }
                    <div className={styles.btns}>
                        <button onClick={() => setShowPop(false)}>Cancel</button>
                        {type === 'delete'
                            ? <button onClick={removeFromGroup}>
                                {loading ? "Deleting..." : 'Delete'}
                            </button>
                            : <button
                                onClick={inviteAsAdmin}
                                style={{ width: 'fit-content' }}>{loading ? "Adding..." : 'Invite as admin'}
                            </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp