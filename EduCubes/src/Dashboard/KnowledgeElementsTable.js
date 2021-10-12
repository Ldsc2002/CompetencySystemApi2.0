import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { DataContext } from '../Providers/DataProvider';

//function preventDefault(event) {
  //event.preventDefault();
//}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  fondoColor: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    outlineStyle: "solid",
    outlineWidth: "thin",
    outlineColor: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

export default function KnowledgeElementsTable() {
  const classes = useStyles();
  const { data } = useContext(DataContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = Object.values(data);

  // Se obtiene el identificador id de la URL
  const search = window.location.search;
  const params = new URLSearchParams(search);

  // Identificador de busqueda de perfil
  const identifier = params.get('id');

  console.log(identifier);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <React.Fragment>
      <Title>Listado</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.fondoColor}>Elemento de conocimiento</TableCell>
            <TableCell className={classes.fondoColor}>Nivel de habilidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
            <TableRow key={row.id}>
              <TableCell >{row.name}</TableCell>
              <TableCell>{row.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
