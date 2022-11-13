import React from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../GroupCard/GroupCard';
import styles from './Suggestions.module.scss';

const Suggestions = () => {
    return (
        <div className={styles.suggestions}>

            <div className={styles.groups_}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <span>Popular near you</span>
                        <p>Groups that people in your area are in</p>
                    </div>
                    <div className={styles.right}>
                        <Link className={styles.link} to='/groups/discover'>See all</Link>
                    </div>
                </div>
                <div className={styles.group_lists}>\
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                </div>
            </div>

            <div className={styles.groups_}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <span>More suggestions</span>
                    </div>
                    {/* <div className={styles.right}>
                        <Link className={styles.link} to='discover'>See all</Link>
                    </div> */}
                </div>
                <div className={styles.group_lists}>\
                <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                    <div className={styles.card}>
                        <GroupCard bg='var(--bgDark)'/>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Suggestions