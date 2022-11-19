import React, { useEffect, useState } from 'react';
import styles from './Edit.module.scss';
import { CaretDownFilled, CaretUpFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const EditPrivacy = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [selected, setSelected] = useState(currentGroup?.isPrivate)
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState();

    useEffect(() => {
        if (selected === currentGroup?.isPrivate) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [currentGroup, selected])

    return (
        <>
            <div className={styles.edit_field} style={{ borderBottom: show && 'none' }}>
                <div>
                    <span>Privacy</span>
                    <small>{selected}</small>
                </div>
                <button className={styles.icon_} onClick={() => setShow(!show)}>
                    {
                        show
                            ? <CaretUpFilled className={styles.icon} />
                            : <CaretDownFilled className={styles.icon} />
                    }
                </button>
            </div>
            {show && <div className={styles.radios}>

                <div className={`${styles.radio} ${selected === 'public' && styles.radio_active}`} onClick={() => setSelected('public')}
                >
                    <div className={styles.icon_}>
                        <EyeFilled className={styles.icon} />
                    </div>
                    <div className={styles.type}>
                        <span>Public</span>
                        <p>Anyone can find this group</p>
                    </div>
                    <div className={styles.state}>
                        {
                            selected === 'public' && <div></div>
                        }

                    </div>
                </div>

                <div className={`${styles.radio} ${selected === 'private' && styles.radio_active}`} onClick={() => setSelected('private')}
                >
                    <div className={styles.icon_}>
                        <EyeInvisibleFilled className={styles.icon} />
                    </div>
                    <div className={styles.type}>
                        <span>Private</span>
                        <p>Anyone can find this group</p>
                    </div>
                    <div className={styles.state}>
                        {
                            selected === 'private' && <div></div>
                        }
                    </div>
                </div>

                <div className={styles.btns}>
                    <button onClick={() => setShow(!show)}>Cancel</button>
                    <button disabled={disable} className={`${disable && styles.disabled}`}>Save</button>
                </div>

            </div>}
        </>
    )
}

export default EditPrivacy