import React, { useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import Content from "../Dashboard/Content";
import {
    Box, Button, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import { SummaryCard } from "./Driver";
  
// Creating styles
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        "& > *": {
            borderBottom: "unset",
        },
    },
    table: {
        width: "100%",
    },
    snackbar: {
        bottom: "104px",
    },
    spacer: {
        flexGrow: "1",
    },
    fondoColor: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        outlineStyle: "solid",
        outlineWidth: "thin",
        outlineColor: theme.palette.getContrastText(theme.palette.primary.main),
    },
}));
  
function TableElements() {
    // Creating style object
    const classes = useStyles();
  
    // Defining a state named rows
    // which we can update by calling on setRows function
    const [rows, setRows] = useState([]);
  
    // Initial states
    const [open, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const [showConfirm, setShowConfirm] = React.useState(false);
  
    // Function For closing the alert snackbar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
  
    // Function For adding new row object
    const handleAdd = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1,
                element: "",
                skillLevel: "Recordando", 
            },
        ]);
        setEdit(true);
    };
  
    // Function to handle edit
    const handleEdit = (i) => {
        // If edit mode is true setEdit will 
        // set it to false and vice versa
        setEdit(!isEdit);
    };
  
    // Function to handle save
    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
        setDisable(true);
        setOpen(true);
    };
  
    // The handleInputChange handler can be set up to handle
    // many different inputs in the form, listen for changes 
    // to input elements and record their values in state
    const handleInputChange = (e, index) => {
        setDisable(false);
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };
  
    // Showing delete confirmation to users
    const handleConfirm = () => {
        setShowConfirm(true);
    };
  
    // Handle the case of delete confirmation where 
    // user click yes delete a specific row of id:i
    const handleRemoveClick = (i) => {
        console.log(i)
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };
  
    // Handle the case of delete confirmation 
    // where user click no 
    const handleNo = () => {
        setShowConfirm(false);
    };
    
    return (
        <Content>
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            className={classes.snackbar}
        >
            <Alert onClose={handleClose} severity="success">
            Registro guardado correctamente
            </Alert>
        </Snackbar>
        <Box margin={1} >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {isEdit ? (
                <div style={{margin: "5px 5px"}}>
                    <Button 
                        edge="end"
                        color="primary"
                        variant="contained"
                        onClick={handleAdd}
                        style={{margin: "5px 5px"}}
                    >        
                        <AddBoxIcon onClick={handleAdd} />
                        Agregar elemento
                    </Button>
                    {rows.length !== 0 && (
                    <>
                        {disable ? (
                            <Button 
                                disabled
                                align="right" 
                                edge="end"
                                color="primary"
                                variant="contained"
                                onClick={handleSave}
                                style={{margin: "5px 5px"}}
                            >
                                <DoneIcon />
                                Guardar
                            </Button>
                            ) : (
                            <Button 
                                edge="end"
                                color="primary"
                                variant="contained"
                                align="right" 
                                onClick={handleSave}
                                style={{margin: "5px 5px"}}
                            >
                                <DoneIcon />
                                Guardar
                            </Button>
                        )}
                    </>
                    )}
                </div>
                ) : (
                <div style={{margin: "5px 5px"}}>
                    <Button 
                        edge="end"
                        color="primary"
                        variant="contained"
                        onClick={handleAdd}
                        style={{margin: "5px 5px"}}
                    >
                        <AddBoxIcon onClick={handleAdd} />
                        Agregar elemento
                    </Button>
                    <Button 
                        align="right"
                        edge="end"
                        color="primary"
                        variant="contained"
                        onClick={handleEdit}
                        style={{margin: "5px 5px"}}
                    >
                        <CreateIcon />
                        Editar elemento
                    </Button>
                </div>
                )}
            </div>
            <div className={classes.root}>
            <SummaryCard
                title={"Elementos de conocimiento"}
                value={
                    <TableContainer>
                        <Table
                            className={classes.table}
                            size="small"
                            aria-label="a dense table"
                        >
                        <TableHead>
                            <TableRow>
                            <TableCell className={classes.fondoColor}>Elemento de conocimiento</TableCell>
                            <TableCell align="right" className={classes.fondoColor}>Nivel de habilidad</TableCell>
                            <TableCell align="right" className={classes.fondoColor}>Acciones</TableCell>
                            <TableCell className={classes.fondoColor}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .map((row, i) => {
                            return (
                                <TableRow key={row.id}>
                                    {isEdit ? (
                                        <>
                                        <TableCell
                                            scope="row" 
                                            component="th" 
                                            padding="none"
                                        >
                                            <TextField
                                                style={{ width: "90%" }}
                                                value={row.element}
                                                name="element"
                                                onChange={(e) => handleInputChange(e, i)}
                                            />
                                        </TableCell>
                                        <TableCell
                                            scope="row"
                                            component="th"
                                            padding="none"
                                            align="right"
                                        >
                                            {row.skillLevel}
                                        </TableCell>
                                        </>
                                    ) : (
                                    <>
                                        <TableCell 
                                            component="th" 
                                            scope="row"
                                        >
                                            {row.element}
                                        </TableCell>
                                        <TableCell 
                                            component="th" 
                                            scope="row" 
                                            align="right"
                                        >
                                            {row.skillLevel}
                                        </TableCell>
                                    </>
                                    )}
                                    {isEdit ? (
                                    <TableCell
                                        component="th" 
                                        scope="row" 
                                        align="right"
                                    >
                                    <Button className="mr10" onClick={handleConfirm}>
                                        <ClearIcon />
                                    </Button>
                                    </TableCell>
                                    ) : (
                                    <TableCell
                                        component="th" 
                                        scope="row" 
                                        align="right"
                                    >
                                    <Button className="mr10" onClick={handleConfirm}>
                                        <DeleteOutlineIcon />
                                    </Button>
                                    </TableCell>
                                    )}
                                    {showConfirm && (
                                    <TableCell
                                        component="th" 
                                        scope="row" 
                                        align="right"
                                    >
                                    <div>
                                        <Dialog
                                            open={showConfirm}
                                            onClose={handleNo}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Confirmar eliminacion"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                            ¿Estás seguro de borrar el registro?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                            onClick={() => handleRemoveClick(i)}
                                            color="primary"
                                            autoFocus
                                            >
                                                Si
                                            </Button>
                                            <Button
                                            onClick={handleNo}
                                            color="primary"
                                            autoFocus
                                            >
                                                No
                                            </Button>
                                        </DialogActions>
                                        </Dialog>
                                    </div>
                                    </TableCell>
                                    )}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    }
                />
            </div>
        </Box>
        </Content>
    );
}
  
export default TableElements;