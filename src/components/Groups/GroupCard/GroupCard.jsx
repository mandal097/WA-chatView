import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GroupCard.module.scss'

const GroupCard = ({ bg, details }) => {
  return (
    <div className={styles.group_card} style={{ backgroundColor: bg }}>
      <div className={styles.img}>
        <img src={ details?.groupCoverImg} alt="" />
      </div>
      <div className={styles.details}>
        <Link className={styles.link}  to={`/groups/${details?._id}`}>{details?.groupName}</Link>
        <div className={styles.counters}>
          <span className={styles.counts}>{details?.members?.length} Members</span>
          <span className={styles.counts}>2 post a week</span>
        </div>
      </div>
      {/* <div className={styles.}></div> */}
    </div>
  )
}

export default GroupCard