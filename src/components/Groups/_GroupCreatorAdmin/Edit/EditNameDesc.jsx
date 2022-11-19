import React, { useEffect, useState } from 'react';
import styles from './Edit.module.scss';
import { EditFilled } from '@ant-design/icons';
const EditNameDesc = () => {
    const [groupName, setGroupName] = useState('');
    const [desc, setDesc] = useState('');
    const [disable, setDisable] = useState();
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (groupName === '' || desc === '') {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [desc, groupName])
    return (
        <>
            <div className={styles.edit_field} style={{borderBottom:show && 'none'}}>
                <div>
                    <span>Name and description</span>
                </div>
                {!show && <button className={styles.icon_}
                    onClick={() => setShow(!show)}
                >
                    <EditFilled className={styles.icon} />
                </button>}
            </div>
            {show && <div className={styles.inputs}>
                <input
                    placeholder='group name'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text" />
                <textarea
                    placeholder='give desc to group'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    name="" id="" cols="30" rows="5"></textarea>
                <div className={styles.btns}>
                    <button onClick={() => setShow(!show)}>Cancel</button>
                    <button disabled={disable} className={`${disable && styles.disabled}`}>Save</button>
                </div>
            </div>}

        </>
    )
}

export default EditNameDesc