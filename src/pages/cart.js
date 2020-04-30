import React, { Fragment } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

//redux
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/actions/dataActions";

//mui stuff
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

let emptyRows = 0;
const TAX_RATE = 0.07;
let productId;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const headCells = [
  {
    id: "image",
    numeric: false,
    disablePadding: true,
    label: "Product Image",
  },
  { id: "title", numeric: false, disablePadding: false, label: "Name" },
  { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
  {
    id: "totalprice",
    numeric: true,
    disablePadding: false,
    label: "Total Price ($)",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    onQtyIncrease,
    onQtyDecrease,
    onItemDelete,
    loading,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          SHOPPING CART
        </Typography>
      )}

      {numSelected > 0 ? (
        <Fragment>
          {loading && <CircularProgress size={30} />}
          <Tooltip title="Decrease quantity">
            <IconButton
              onClick={onQtyDecrease}
              aria-label="decrease"
              className={classes.margin}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Increase quantity">
            <IconButton
              onClick={onQtyIncrease}
              aria-label="increase"
              className={classes.margin}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={onItemDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ) : (
        <Fragment>
          {loading && (
            <CircularProgress size={30} style={{ marginRight: 30 }} />
          )}
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onQtyIncrease: PropTypes.func.isRequired,
  onQtyDecrease: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // redux store access
  const { loading, authenticated, incartProducts, totalPrice } = useSelector(
    (state) => ({
      authenticated: state.user.authenticated,
      loading: state.user.loading,
      incartProducts: state.user.incartProducts,
      totalPrice: state.user.totalPrice,
      totalItems: state.user.totalItems,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const rows = incartProducts;
  const invoiceSubtotal = totalPrice;
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.productId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    productId = id;
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleQtyIncrease = () => {
    dispatch(increaseQty(productId));
  };

  const handleQtyDecrease = () => {
    dispatch(decreaseQty(productId));
  };

  const handleItemDelete = () => {
    dispatch(removeFromCart(productId));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (productId) => selected.indexOf(productId) !== -1;

  emptyRows =
    !loading &&
    authenticated &&
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {authenticated ? (
          <Fragment>
            <EnhancedTableToolbar
              numSelected={selected.length}
              onQtyIncrease={handleQtyIncrease}
              onQtyDecrease={handleQtyDecrease}
              onItemDelete={handleItemDelete}
              loading={loading}
            />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                {!loading && (
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                )}
                <TableBody>
                  {!loading ? (
                    stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.productId);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, row.productId)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.productId}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <img
                                src={row.thumbnail}
                                height="100%"
                                alt="..."
                              />
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">
                              {Number(row.price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableCell colSpan={6}>
                      <Typography align="center" gutterBottom>
                        Please wait...
                        <br />
                        <CircularProgress size={30} />
                      </Typography>
                    </TableCell>
                  )}
                  {!loading && (
                    <Fragment>
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell align="right" colSpan={2}>
                          Sub Total
                        </TableCell>
                        <TableCell colSpan={2} align="right">
                          <Typography variant="subtitle1" gutterBottom>
                            {ccyFormat(invoiceSubtotal)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} align="right">
                          Tax
                        </TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                          0
                        )} %`}</TableCell>
                        <TableCell align="right">
                          {ccyFormat(invoiceTaxes)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right" colSpan={2}>
                          Total
                        </TableCell>
                        <TableCell colSpan={2} align="right">
                          <Typography variant="subtitle1" gutterBottom>
                            {ccyFormat(invoiceTotal)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right" colSpan={5}>
                          <Button
                            style={{ minWidth: "50%" }}
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/checkout"
                          >
                            Checkout Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  )}
                  {!loading && rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Typography
                          color="error"
                          align="center"
                          variant="h4"
                          component="h5"
                          gutterBottom
                        >
                          You have no items in the cart!
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6}></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {!loading && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </Fragment>
        ) : (
          <Typography style={{ padding: 40 }} variant="h6">
            Please Login <Link to="/login">here</Link>
          </Typography>
        )}
      </Paper>
      {authenticated && (
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      )}
    </div>
  );
}
