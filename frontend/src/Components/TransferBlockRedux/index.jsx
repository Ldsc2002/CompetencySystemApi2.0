import React, { useState } from 'react';
import styles from './transferBlockRedux.module.css';
import ComboBox from '../ComboBox';

const TransferBlockRedux = (props) => {
  const [selectedAccount1, setSelectedAccount1] = useState("");
  const [selectedCompetency, setCompetency] = useState("");

  const updateMethod1 = (value) => {
    setSelectedAccount1(value);
    props.updateMethod([value, selectedCompetency]);
  };

  const updateCompetency = (value) => {
    setCompetency(value);
    props.updateMethod([selectedAccount1, value]);
  };

  return (
    <div className={styles.block}>
      <ComboBox
        value={selectedAccount1}
        title="Seleccione una billetera"
        options={props.accounts}
        method={updateMethod1}
      />
      <ComboBox
        value={selectedCompetency}
        title="Seleccione una competencia"
        options={props.options}
        method={updateCompetency}
      />
    </div>
  );
};

export default TransferBlockRedux;