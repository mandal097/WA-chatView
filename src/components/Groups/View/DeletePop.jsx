import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { capitalizeFirstLetter } from '../../../helpers/strings';
import Loading from '../../Loading/Loading';
import styles from './PopUp.module.scss';
import axios from '../../../config/axios';
import { useNavigate } from 'react-router-dom';


const DeletePopUP = ({ setShowDeletePopUp, showDeletePopUp, group }) => {
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        const checkClick = (e) => {
            if (showDeletePopUp && !ref.current.contains(e.target)) {
                setShowDeletePopUp(false)
            }

        }
        document.addEventListener('mousedown', checkClick);

        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [setShowDeletePopUp, showDeletePopUp, ref]);

 

    const deleteGroup = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`/groups/delete/${group?._id}`, {
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
                    <div className={styles.img_}>
                        <img src={group?.groupCoverImg} alt="profile" />
                    </div>
                    <span>{capitalizeFirstLetter(group?.groupName)}</span>
                            <p>Are you sure you want to delete the group?</p>
                    <div className={styles.btns}>
                        <button onClick={() => setShowDeletePopUp(false)}>Cancel</button>
                        <button onClick={deleteGroup}
                            style={{ width: 'fit-content' }}>{loading ? <Loading font='5rem' color='var(--text)' /> : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopUP