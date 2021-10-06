import React from 'react';
import styles from './selecListElement.module.css';
import ComboBox from '../ComboBox';

const TransferBlock = () => {

    const skills = ["skill 1", "skill 2", "skill 3"]

    return (
        <div className={styles.block}>
            {
                skills.map((skill) => (
                    <ComboBox
                        title = {skill}
                    />   
                ))
            }
        </div>
    )
}

export default TransferBlock; 