import React from 'react';
import DailyInsight from './DailyInsight';
import Chart from './Chart';
import Counts from './Counts';
import styles from './Overview.module.scss';
import PostInsights from './PostInsights';
import { productData, userData } from './data'
import DemoMessage from './DemoMessage';
import { useState } from 'react';
import { useEffect } from 'react';

const Overview = () => {
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShowMessage(true)
        }, 1000);
    }, [])
    return (
        <div className={styles.overview}>
            <DailyInsight />
            <div className={styles.body}
                style={{ background: 'transparent', padding: '0', display: 'flex', gap: '1rem' }}>
                <PostInsights />
                <div className={styles.sections}>
                    <Chart data={productData} dataKey="Sales" title="Sales Performance" />
                </div>
            </div>
            <Chart data={userData} title="2 total members" dataKey="Active User" />
            <Chart data={productData} dataKey="Sales" title="Sales Performance" />
            <Counts />
            {
                showMessage && <DemoMessage setShowMessage={setShowMessage} />
            }
        </div>
    )
}

export default Overview