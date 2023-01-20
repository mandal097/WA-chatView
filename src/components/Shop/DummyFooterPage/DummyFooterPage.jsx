import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DummyFooterPage.module.scss';

const DummyFooterPage = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];

    return (
        <div className={styles.dummy_page}>
            <p>we are working on <span>{path}</span> {' '} page</p>
        </div>
    )
}

export default DummyFooterPage