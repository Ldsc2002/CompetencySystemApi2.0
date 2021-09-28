import React from 'react';
import styles from './transferBlock.module.css';
import ComboBox from '../ComboBox';

const TransferBlock = () => {
    return (
        <div className={styles.block}>
            <ComboBox
                title = {"Seleccione una billetera"}
            />
            <ComboBox
                title = {"Seleccione una billetera"}
            />
            <ComboBox
                title = {"Seleccione una competencia"}
            />
        </div>
    )
}

export default TransferBlock; 