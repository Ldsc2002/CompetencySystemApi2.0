import React from 'react';
import styles from './selecListElement.module.css';
import ComboBox from '../ComboBox';

const SelecListElement = (props) => {
  const handleChange = (value, index) => {
    const updatedValues = { ...props.value, [index]: value };
    props.updateMethod(updatedValues);
  };

  return (
    <div className={styles.block}>
      {props.skills.map((skill, index) => (
        <ComboBox
          key={index}
          width={250}
          value={props.value[index]}
          title={skill}
          options={props.options}
          method={(value) => handleChange(value, index)}
        />
      ))}
    </div>
  );
};

export default SelecListElement;