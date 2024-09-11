import React, { useState } from 'react';
import styles from './competencyConsultor.module.css';
import ComboBox from '../ComboBox';
import AlertButton from '../AlertButton';

const CompetencyConsultor = (props) => {
  const [selectedCompetency, setSelectedCompetency] = useState("");

  const helpMethod = async () => ({
    title: "Módulo de consulta de competencias",
    text: "Este módulo se utiliza para la consulta de competencias",
  });

  const method = async () => {
    if (selectedCompetency !== "") {
      const obj = props.competencys.find(({ name }) => name === selectedCompetency);
      const result = await props.competencysMethod(obj.id);

      const dispositions = props.dispositions
        .filter(disposition => result.dispositions.includes(disposition.id))
        .map(disposition => disposition.name);

      const knowledgeElements = props.knowledgeElements
        .filter(knowledgeElement => result.knowledgeElements.includes(knowledgeElement.id))
        .map(knowledgeElement => knowledgeElement.name);

      return {
        title: result.name,
        text: result.statement,
        knowledgeElements,
        dispositions,
      };
    } else {
      return { title: "Error", text: "Seleccione un campo" };
    }
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
        <p className={styles.title}>Consulta de competencias</p>
        <AlertButton text="?" method={helpMethod} />
      </div>
      <div>
        <ComboBox
          value={selectedCompetency}
          options={props.competencys ? props.competencys.map(competency => competency.name) : []}
          method={setSelectedCompetency}
          title="Seleccione una competencia"
        />
        <br />
        <br />
        <AlertButton text="Consultar" method={method} />
      </div>
    </div>
  );
};

export default CompetencyConsultor;