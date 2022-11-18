import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../../Loading/Loading';
import Modal from '../ModalLayout';
import styles from './CreateRules.module.scss';
import { data } from './exampleRules'


const CreateRules = ({ setShow, ruleList }) => {
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


    const changeExamleRule = (p) => {
        setTitle(data[p].title);
        setDesc(data[p].desc);
    }



    const handleClick = () => {
        setLoading(true)
        const updateRules = {
            title,
            desc
        }
        ruleList.push(updateRules);
        setLoading(false)
        setShow(false)
    }
    return (
        <Modal
            width='50rem'
            height='70vh'
            margin='10rem 0'
            zIndex='10001'
            head='Create Rules'
            onClick={() => {
                setShow(false)
            }}
        >
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h2>Example rules</h2>
                    <div className={styles.example_rules}>
                        <button onClick={() => changeExamleRule(0)}>No hate speech or bullying</button>
                        <button onClick={() => changeExamleRule(1)}>Be kind and courteous</button>
                        <button onClick={() => changeExamleRule(2)}>No promotions or spam</button>
                        <button onClick={() => changeExamleRule(3)}>Respect everyone's privacy</button>
                    </div>
                </div>

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