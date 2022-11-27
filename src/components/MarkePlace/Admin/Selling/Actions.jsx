import React, { useEffect, useRef } from 'react';
import styles from './Actions.module.scss';
import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import axios from '../../../../config/axios';
// import { toast, ToastContainer } from 'react-toastify';

const ActionPopup = (
    { left,
        top,
        setShowActionPopup,
        showActionPopup,
        product,
        setShowDeletePop,
        positionBefore
    }) => {

    const actionPopupRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const checkClick = (e) => {
            if (showActionPopup && !actionPopupRef.current.contains(e.target)) {
                setShowActionPopup(false)
            }
        }
        document.addEventListener('mousedown', checkClick);

        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showActionPopup, setShowActionPopup, actionPopupRef]);
    
    return (
        <>
            {/* <ToastContainer className='toaster' /> */}
            <div className={styles.actions_popup} ref={actionPopupRef} style={{
                top: `${top + 47}px`,
                left: `${left - 200}px`
            }}>
                <div
                    className={`
                    ${styles.wrapper} 
                    ${positionBefore === 'top' && styles.before_top} 
                    ${positionBefore === 'bottom' && styles.before_bottom}`
                    }
                >
                    <ul>
                        <li>
                            <button >
                                <EditFilled className={styles.icon} />
                                <span>Edit</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate(`/marketplace/item/${product?._id}`)}>
                                <EyeFilled className={styles.icon} />
                                <span>View</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setShowDeletePop(true)}>
                                <DeleteFilled className={styles.icon} />
                                <span>Delete</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default ActionPopup