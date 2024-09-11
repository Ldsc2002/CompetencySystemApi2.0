import React, { useState } from 'react';
import styles from './transferBlock.module.css';
import ComboBox from '../ComboBox';

const TransferBlock = (props) => {
  const [selectedAccount1, setSelectedAccount1] = useState("");
  const [selectedAccount2, setSelectedAccount2] = useState("");
  const [selectedCompetency, setCompetency] = useState("");

  const updateMethod1 = (value) => {
    setSelectedAccount1(value);
    props.updateMethod([value, selectedAccount2, selectedCompetency]);
  };

  const updateMethod2 = (value) => {
    setSelectedAccount2(value);
    props.updateMethod([selectedAccount1, value, selectedCompetency]);
  };

  const updateCompetency = (value) => {
    setCompetency(value);
    props.updateMethod([selectedAccount1, selectedAccount2, value]);
  };

  return (
    <div className={styles.block}>
      <ComboBox
        value={selectedAccount1}
        title="Seleccione el emisor"
        options={props.accounts}
        method={updateMethod1}
      />
      <ComboBox
        value={selectedAccount2}
        title="Seleccione el receptor"
        options={props.accounts}
        method={updateMethod2}
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

export default TransferBlock;