import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Welcome.module.scss';


const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className={`${styles.welcome} ${'container'}`}>
            Welcome  <br />😁🥱😫😛 <br />
           🙄------------   stil working on this page -------------🙄          
            <br />
            😎
            <br />
            Please login to explore other sections
<br />
            <button onClick={()=>navigate('/login')}>Login</button>
        </div>
    )
}

export default Welcome