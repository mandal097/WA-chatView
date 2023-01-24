import React, { useEffect } from 'react';
import styles from './Shipping.module.scss';
import { shippings } from './data'
import { useState } from 'react';

const Component = ({ ele }) => {
    return (
        <div className={styles.section}>
            <b>{ele?.topic}</b>
            {
                ele?.desc?.map(d => (
                    <p>{d}</p>
                ))
            }
        </div>
    )
}

const Shipping = () => {
    const [shippingDetails, setShippingDetails] = useState();
    useEffect(() => {
        setShippingDetails(shippings)
    }, [])

    return (
        <div className={styles.shipping}>
            <h1>Shipping</h1>

            {
                shippingDetails?.map(ele => (
                    <Component key={ele.id} ele={ele} />
                ))
            }

        </div>
    )
}

export default Shipping