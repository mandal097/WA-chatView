import React, { useEffect, useRef, useState } from 'react';
import styles from './DeletePop.module.scss';
import axios from '../../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';

const DeletePop = ({ showDeletePop, setShowDeletePop, product }) => {
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const checkClick = (e) => {
            if (showDeletePop && !ref.current.contains(e.target)) {
                setShowDeletePop(false)
            }

        }
        document.addEventListener('mousedown', checkClick);

        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [showDeletePop, setShowDeletePop, ref]);

    const deleteProduct = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`/market-place/delete-product/${product?._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                setLoading(false);
                window.location.reload();
            }
            console.log(res);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.delete_pop}>
                <div className={styles.body} ref={ref}>
                    <p>Are you sure you want to delete this product from your listings?</p>
                    <span>{product?.productName}</span>
                    <div className={styles.btns}>
                        <button onClick={() => setShowDeletePop(false)}>Cancel</button>
                        <button onClick={deleteProduct}>{loading ?"Deleting...": 'Delete'}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePop