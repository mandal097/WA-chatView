import { HolderOutlined } from '@ant-design/icons';
import React from 'react';
import { useState } from 'react';
import CreateRules from '../../../_Modals/CreateGroupRules/CreateRules';
import styles from './Rules.module.scss';

const data = [
    {
        id: 1,
        title: "Be kind and courteous",
        desc: "We're all in this together to create a welcoming environment. Let's treat everyone with respect. Healthy debates are natural, but kindness is required."
    },
    {
        id: 2,
        title: "No hate speech or bullying",
        desc: "Make sure that everyone feels safe. Bullying of any kind isn't allowed, and degrading comments about things such as race, religion, culture, sexual orientation, gender or identity will not be tolerated."
    },
    {
        id: 3,
        title: "No promotions or spam",
        desc: "Give more to this group than you take. Self-promotion, spam and irrelevant links aren't allowed."
    },
    {
        id: 4,
        title: "Respect everyone's privacy",
        desc: "Being part of this group requires mutual trust. Authentic, expressive discussions make groups great, but may also be sensitive and private. What's shared in the group should stay in the group."
    }
]


const Card = ({ rules, index }) => {
    return (
        <div className={styles.card}>
            <HolderOutlined className={styles.icon} />
            <span>{index}</span>
            <div className={styles.rule}>
                <span>{rules.title}</span>
                <p>{rules.desc}</p>
            </div>
        </div>
    )
}

const Rules = () => {
    const [show, setShow] = useState(false);
    const [ruleList] = useState(data)
    return (
        <div className={styles.rules}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h2>Group rules</h2>
                    <button onClick={() => setShow(true)}>Create</button>
                </div>
                <div className={styles.rule_list}>
                    {
                        ruleList.map((rules, index) => (
                            <Card key={index} rules={rules} index={index + 1} />
                        ))
                    }
                </div>
            </div>
            {show && <CreateRules
                setShow={setShow}
                ruleList={ruleList} />}
        </div>
    )
}

export default Rules