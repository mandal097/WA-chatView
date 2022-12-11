import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { capitalizeFirstLetter } from '../../../../helpers/strings';
import styles from './PopUp.module.scss';


const PopUp = ({ setShowPop, showPop, type, user }) => {
    const [loading, setLoading] = useState(false);
    const ref = useRef();
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
        alert('invite as admin')
    }
    const removeFromGroup = async () => {
        alert('remove from the group')
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
                            ? <p>Are you sure you want to remove <span>{capitalizeFirstLetter(user?.name)}</span>  from the group? </p>
                            : <p>Are you sure you want to invite <span style={{ color: 'var(--successLight)' }}>{capitalizeFirstLetter(user?.name)}</span> be the admin of this group ?</p>
                    }
                    <div className={styles.btns}>
                        <button onClick={() => setShowPop(false)}>Cancel</button>
                        {type === 'delete'
                            ? <button
                                onClick={removeFromGroup}
                            >{loading ? "Deleting..." : 'Delete'}</button>
                            : <button
                                onClick={inviteAsAdmin}
                                style={{ width: 'fit-content' }}>{loading ? "Adding..." : 'Invite for admin'}</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopUp