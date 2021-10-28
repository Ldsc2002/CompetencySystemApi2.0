import React, {useState} from 'react';
import styles from './selecListElement.module.css';
import ComboBox from '../ComboBox';

const SelecListElement = (props) => {

    const handleChange = (value, index) => {
        let temp = {...props.value};
        temp[index] = value;
        props.updateMethod(temp)
    }
    return (
        <div className={styles.block}>
            {
                props.skills.map((skill, index) => (
                    <ComboBox
                        value = {props.value[index]}
                        title = {skill}
                        options = {props.options}
                        method = {(value) => handleChange(value, index)}
                    />   
                ))
            }
        </div>
    )
}

export default SelecListElement; 