import React from 'react';
import styles from './Overview.module.scss';
import {
    Line,
    XAxis,
    Legend,
    Tooltip,
    LineChart,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts'

const Chart = ({ title, data, dataKey, grid }) => {

    return (
        <div className={styles.charts_full}>
            <h1>{title}</h1>
            <small>9 jan 2023</small>
            <div className={styles.chart_div}>
                <ResponsiveContainer width="100%" aspect={2} >
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#5550bd"/>
                        <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                        <Legend />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg)', fontSize: '2rem', border: 'none' }} />
                        {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Chart