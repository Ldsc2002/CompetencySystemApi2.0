import React, { useState } from 'react';
import styles from './competencyMiner.module.css';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';
import TextField from "@material-ui/core/TextField";

const CompetencyMiner = (props) => {
  const [selectedCompetency, setSelectedCompetency] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState(1);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const method = async () => {
    if (selectedCompetency !== "" && amount > 0 && selectedAccount !== "") {
      const obj = props.competencys.find(({ name }) => name === selectedCompetency);
      const result = await props.competencysMethod(selectedAccount, obj.blockId, amount);

      return result === undefined
        ? { title: "Elemento creado", text: "Las competencias han sido minadas" }
        : { title: "Error", text: result };
    } else {
      return { title: "Error", text: "Ingrese todos los campos de manera adecuada" };
    }
  };

  const helpMethod = async () => ({
    title: "Módulo para el minado de competencias",
    text: "Este módulo se utiliza para el minado de competencias. La billetera seleccionada debe ser la creadora o representante de la competencia.",
  });

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
        <p className={styles.title}>Minar competencias</p>
        <AlertButton text="?" method={helpMethod} />
      </div>
      <div>
        <ComboBox
          value={selectedAccount}
          options={props.accounts}
          method={setSelectedAccount}
          title="Seleccione una billetera"
        />
        <br />
        <ComboBox
          value={selectedCompetency}
          options={props.competencys ? props.competencys.map((competency) => competency.name) : []}
          method={setSelectedCompetency}
          title="Seleccione una competencia"
        />
        <br />
        <TextField
          id="standard-number"
          label="Cantidad"
          type="number"
          style={{ marginLeft: 6 }}
          value={amount}
          onChange={handleChange}
        />
        <br />
        <br />
        <AlertButton text="Minar" method={method} />
      </div>
    </div>
  );
};

export default CompetencyMiner; 