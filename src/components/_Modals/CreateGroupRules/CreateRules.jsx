import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../../Loading/Loading';
import Modal from '../ModalLayout';
import styles from './CreateRules.module.scss';
import { data } from './exampleRules';
import axios from '../../../config/axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';


const CreateRules = ({ setShow, ruleList, tTitle, tDesc, isForUpdation, rules }) => {
    const { currentUser } = useSelector(state => state.user);
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [disable, setDisable] = useState();
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (title === '' || desc === '') {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [title, desc]);

    useEffect(() => {
        if (isForUpdation) {
            setTitle(tTitle)
            setDesc(tDesc)
        }
    }, [tTitle, tDesc, isForUpdation])


    const changeExampleRule = (p) => {
        setTitle(data[p].title);
        setDesc(data[p].desc);
    }



    const handleClick = async () => {
        if (!title && !desc) {
            toast.error('Please fill all the fields')
        }
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('/groups/rules', {
                userId: currentUser._id,
                groupId: currentGroup._id,
                title,
                desc

            },
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
            if (res.data.status === 'err') {
                setLoading(false)
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                const updateRules = {
                    _id: res.data.data._id,
                    title,
                    desc
                }
                setLoading(false)
                ruleList.push(updateRules);
                toast.success(res.data.message)
                setShow(false)
            }
            setLoading(false)
        } catch (error) {
            toast.error('Something went wrong')
        }
    }




    return (
        <Modal
            width='50rem'
            height='70vh'
            margin='10rem 0'
            zIndex='10001'
            head={isForUpdation ? 'Update Rule' : 'Create Rules'}
            onClick={() => {
                setShow(false)
            }}
        >
            <ToastContainer className='toaster' />
            <div className={styles.wrapper}>
                {
                    isForUpdation ? "" :
                        <div className={styles.top}>
                            <h2>Example rules</h2>
                            <div className={styles.example_rules}>
                                <button onClick={() => changeExampleRule(0)}>No hate speech or bullying</button>
                                <button onClick={() => changeExampleRule(1)}>Be kind and courteous</button>
                                <button onClick={() => changeExampleRule(2)}>No promotions or spam</button>
                                <button onClick={() => changeExampleRule(3)}>Respect everyone's privacy</button>
                            </div>
                        </div>
                }

                <div className={styles.form}>
                    <h2>Write your own</h2>
                    <input
                        type="text"
                        placeholder='Write a rule...'
                        value={title}
                        onChange={(e => setTitle(e.target.value))}
                    />
                    <textarea
                        name="" id=""
                        cols="20" rows="5"
                        placeholder='Add details...'
                        value={desc}
                        onChange={(e => setDesc(e.target.value))}
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

export default CreateRules