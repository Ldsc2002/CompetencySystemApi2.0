import React, { useContext } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { DataContext } from '../Providers/DataProvider';
import { Link as RouterLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

export default function CompetenciesTable() {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <React.Fragment>
      <Title>Listado</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.fondoColor}>Titulo de competencia</TableCell>
            <TableCell align="center" className={classes.fondoColor}>Elementos de conocimiento</TableCell>
            <TableCell align="center" className={classes.fondoColor}>Disposiciones</TableCell>
            <TableCell align="center" className={classes.fondoColor}>Visualizar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
            <TableRow key={row.id}>
              <TableCell >{row.name}</TableCell>
              <TableCell align="center">{row.knowledge}</TableCell>
              <TableCell align="center">{row.dispositions}</TableCell>
              <TableCell align="center">
                <Button
                  color="primary"
                  variant="contained"
                  to={"/perfil?id=" + identifier + "&comp=" + row.id}
                  component={RouterLink}
                  onClick={scrollToTop}
                >
                  <VisibilityIcon/>
                </Button>
              </TableCell>
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
        labelDisplayedRows={
          ({ from, to, count }) => {
            return '' + from + ' al ' + to + ' de ' + count
          }
        }
        labelRowsPerPage='Registros por página:'
      />
    </React.Fragment>
  );
}
