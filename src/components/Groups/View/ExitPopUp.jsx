import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { capitalizeFirstLetter } from '../../../helpers/strings';
import Loading from '../../Loading/Loading';
import styles from './PopUp.module.scss';
import axios from '../../../config/axios';
import { useNavigate } from 'react-router-dom';


const ExitPopUp = ({ setShowPop, showPop, user, group }) => {
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const ref = useRef();
    const navigate = useNavigate()

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

    useEffect(() => {
        if (group?.admins?.includes(user?._id)) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user, group]);
    // console.log(isAdmin);
    // console.log(group.admins.length);

    const leaveGroup = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`/groups/leave/${group?._id}`, {}, {
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
                setLoading(false);
                setTimeout(() => {
                    navigate(`/groups/feed`)
                }, 1200);
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
                        isAdmin
                            ?
                            group?.admins?.length <= 1
                                ? <p>You are the only admin of this group, if you exit from the group, the group will be deleted.</p>
                                :
                                <p>Are you sure you want to exit the group? Because you are in one of  the admins of this group.</p>
                            :
                            <p>Are you sure you want to exit the group?</p>
                    }
                    <div className={styles.btns}>
                        <button onClick={() => setShowPop(false)}>Cancel</button>
                        <button onClick={leaveGroup}
                            style={{ width: 'fit-content' }}>{loading ? <Loading font='5rem' color='var(--text)' /> : 'Exit from group'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExitPopUp