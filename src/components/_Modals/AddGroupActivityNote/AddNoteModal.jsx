import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '../../Loading/Loading'
import Modal from '../ModalLayout'
import styles from './AddNoteModal.module.scss'
import axios from '../../../config/axios';

const AddNoteModal = ({ setShow, actionId, groupId, setNotes }) => {
    const [disable, setDisable] = useState(true);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (note === '') {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [note]);

    const handleClick = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`/groups/activities/notes/${groupId}`, {
                actionId,
                note
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
                setNotes(note);
                setLoading(false);
                setTimeout(() => {
                    setShow(false);
                }, 500);
            }
        } catch (error) {
            toast.error('Something went wrong');
            setLoading(false);
        }
    }
    return (
        <Modal
            width='50rem'
            height='auto'
            center='center'
            zIndex='100'
            head='Add note'
            onClick={() => setShow(false)}
        >
            <ToastContainer className='toaster' />
            <div className={styles.add_notes}>
                <div className={styles.form}>
                    <textarea
                        name="" id=""
                        cols="20" rows="5"
                        placeholder='Add details...'
                        value={note}
                        onChange={(e => setNote(e.target.value))}
                        className='custom_scroll'></textarea>
                    <div className={styles.btns}>
                        <button
                            onClick={() => setShow(false)}
                        >Cancel</button>

                        <button
                            disabled={disable}
                            onClick={handleClick}
                            className={`${disable && styles.disable_btn}`}>
                            {loading ? <Loading font='3rem' color='white' /> : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddNoteModal