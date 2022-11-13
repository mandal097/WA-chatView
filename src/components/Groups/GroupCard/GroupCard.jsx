import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GroupCard.module.scss'

const GroupCard = ({bg}) => {
  return (
    <div className={styles.group_card} style={{backgroundColor:bg}}>
        <div className={styles.img}>
            <img src="https://media.istockphoto.com/id/1338737959/photo/little-kids-schoolchildren-pupils-students-running-hurrying-to-the-school-building-for.jpg?b=1&s=170667a&w=0&k=20&c=D1CYdH3EvNWkvWaufBSJgb3Da1uJDX4ElLS3HxcB7LA=" alt="" />
        </div>
        <div className={styles.details}>
            <Link className={styles.link}>SB FlexiFunnels DOer's Community</Link>
            <div className={styles.counters}>
                <span className={styles.counts}>12k Members</span>
                <span className={styles.counts}>2 post a week</span>
            </div>
        </div>
        {/* <div className={styles.}></div> */}
    </div>
  )
}

export default GroupCard