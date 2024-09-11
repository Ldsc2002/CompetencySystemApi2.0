import React, { useState } from 'react';
import styles from './itemCreator.module.css';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextInput from '../TextInput';
import AlertButton from '../AlertButton';

const ItemCreator = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState(true);

  const handleChange = () => {
    setState(!state);
  };

  const helpMethod = async () => ({
    title: "Módulo de creación de disposiciones y elementos de competencia",
    text: "Este módulo se utiliza para la creación de disposiciones y elementos de conocimiento",
  });

  const method = async () => {
    if (name.trim().length !== 0 && description.trim().length !== 0) {
      if (state) {
        props.createDispositions({ name, meaning: description });
        return { title: "Elemento creado", text: "La disposición ha sido creada" };
      } else {
        props.createKnowledgeElement({ name, meaning: description });
        return { title: "Elemento creado", text: "El elemento de conocimiento ha sido creado" };
      }
    } else {
      return { title: "Error", text: "Ingrese toda la información en los campos" };
    }
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
        <p className={styles.title}>Creación de disposiciones y elementos de conocimiento</p>
        <AlertButton text="?" method={helpMethod} />
      </div>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Disposiciones</Grid>
          <Grid item>
            <Switch
              checked={state}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item>Elementos de conocimiento</Grid>
        </Grid>
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextInput
          placeHolder="Ingrese el nombre"
          value={name}
          updateMethod={setName}
          rows={1}
        />
        <br />
        <TextInput
          placeHolder="Ingrese la descripción"
          value={description}
          updateMethod={setDescription}
          rows={8}
        />
        <br />
        <AlertButton text="Crear" method={method} />
      </div>
    </div>
  );
};

export default ItemCreator;