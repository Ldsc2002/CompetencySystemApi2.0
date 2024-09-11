import React, { useState } from 'react';
import styles from './skillConsultor.module.css';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';

const SkillConsultor = (props) => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const competencys = props.competencys ? props.competencys.map((competency) => competency.name) : [];
  const accounts = props.accounts || [];

  const helpMethod = async () => ({
    title: "Módulo de consulta de habilidades",
    text: "Este módulo se utiliza para la consulta de habilidades que tiene una billetera para una determinada competencia",
  });

  const method = async () => {
    if (selectedItem !== "") {
      const selectedItemId = props.competencys
        .filter((competency) => competency.name === selectedItem)
        .map((competency) => competency.blockId)[0];

      const response = await props.method(selectedAccount, selectedItemId);
      
      return response === undefined
        ? { title: "Registros", text: "Este usuario no cuenta con esta competencia" }
        : { title: "Registros", records: response };
    } else {
      return { title: "Error", text: "Ingrese todos los campos de manera adecuada" };
    }
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
        <p className={styles.title}>Consulta de habilidades</p>
        <AlertButton text="?" method={helpMethod} />
      </div>
      <div>
        <ComboBox
          value={selectedAccount}
          options={accounts}
          method={setSelectedAccount}
          title="Seleccione una billetera"
        />
        <br />
        <ComboBox
          value={selectedItem}
          options={competencys}
          method={setSelectedItem}
          title="Seleccione una competencia"
        />
        <br />
        <AlertButton text="Consultar" method={method} />
      </div>
    </div>
  );
};

export default SkillConsultor;