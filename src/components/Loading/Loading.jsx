import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loading.module.scss'

const Loading = ({font,color}) => {
    return (
        <div className={styles.loader} style={{fontSize:font,color:color}}><LoadingOutlined /></div>
    )
}

export default Loading