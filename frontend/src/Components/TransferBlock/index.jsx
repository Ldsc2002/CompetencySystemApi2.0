import React from 'react';
import styles from './transferBlock.module.css';
import ComboBox from '../ComboBox';

const TransferBlock = (props) => {
    console.log("log", props)
    return (
        <div className={styles.block}>
            <ComboBox
                title = {"Seleccione el emisor"}
                options = {props.options}
            />
            <ComboBox
                title = {"Seleccione el receptor"}
                options = {props.options}
            />
            <ComboBox
                title = {"Seleccione una competencia"}
            />
        </div>
    )
}

export default TransferBlock; 