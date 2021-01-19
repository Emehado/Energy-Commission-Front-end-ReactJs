import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import { useLocation } from "react-router-dom";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import readXlsxFile from "read-excel-file";
import api from "../../config/api";
import Confirm from "./Confirm";
import ImportLicenseForm from "./forms/ImportLicenseForm";
import TableForm from "./forms/TableForm";
import Loader from "./Loader";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolBar";
import TableAlert from "./TableAlert";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 950,
    marginTop: 15,
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
  expired: {
    height: 70,
    backgroundColor: `${theme.palette.secondary.extraLight} !important`,
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.extraLight} !important`,
    },
  },
  tableCell: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  expiredTableCell: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  selected: {
    backgroundColor: `${lighten(theme.palette.primary.light, 0.55)} !important`,
    color: `${lighten(theme.palette.primary.main, 0.55)} !important`,
    "&:hover": {
      backgroundColor: `${lighten(
        theme.palette.primary.light,
        0.55
      )} !important`,
      color: `${lighten(theme.palette.primary.main, 0.55)} !important`,
    },
  },

  tableRow: {
    height: 70,
    maxHeight: 70,
  },
  emptyTable: {
    height: 350,
  },
}));

export default function EnhancedTable({
  headCells = [],
  showImport,
  showPrint,
  showEdit,
  showAdd,
  showRefresh,
  showCheckbox = true,
}) {
  const classes = useStyles();
  const location = useLocation();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [originalData, setOriginalData] = useState(rows);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = React.useState("all");
  const [confirm, setConfirm] = useState(false);
  const [openLicenseForm, setOpenLicenseForm] = useState(false);
  const [errorType, setErrorType] = useState("warning");
  const [errorMessage, setErrorMessage] = useState("");
  const [licenseFormError, setLicenseFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoType, setInfoType] = useState("info");
  const [infoDescription, setInfoDescription] = useState("");
  const [selectedRowValues, setSelectedRowValues] = useState({});
  const [licenseFormAction, setLicenseFormAction] = useState("Add");
  const [initialValues, setInitialValues] = useState({});
  const [openImportLicense, setOpenImportLicense] = useState(false);
  const [checked, setChecked] = useState(false);
  const [importFile, setImportFile] = useState();
  const [importStatus, setImportStatus] = useState("file");
  const [importFileSchema, setImportFileSchema] = useState();
  const [licenseFieldError, setLicenseFieldError] = useState(false);
  const [importMessage, setImportMessage] = useState("Analyzing file...");
  const [showLicenseErrors, setShowLicenseErrors] = useState(false);
  const [importSuccess, setImportSuccess] = useState([]);
  const [importErrors, setImportErrors] = useState([]);
  const [readXcelFileErrors, setReadXcelFileErrors] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const inputs = headCells.filter((cell) => cell.id !== "id");

  const tableRef = useRef();

  const setPrintMode = () => {
    setIsPrinting(true);
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    onAfterPrint: () => setIsPrinting(false),
  });

  const createImportFileSchema = () => {
    const schema = {};
    headCells.forEach((headCell) => {
      const label = headCell.label.toUpperCase();
      if (label === "ID") return;
      const prop = headCell.id;
      schema[`${label}`] = {
        prop,
        type: String,
        required: true,
      };
      setImportFileSchema(schema);
    });
  };

  const getRows = async () => {
    setLoading(true);
    const response = await api.get(location.pathname);
    if (!response.ok) {
      if (response.status === 401) return (window.location = "/login");
      setInfo(response.problem);
      setInfoDescription("Error loading license, Please try again");
      setInfoType("error");
      setShowInfo(true);
      setLoading(false);
      return;
    }
    setRows(response.data);
    setShowInfo(false);
    setOriginalData(response.data);
    setFilterValue("all");
    setLoading(false);
  };
  useEffect(() => {
    getRows();
    createImportFileSchema();
  }, []);
  useEffect(() => {
    if (selected.length === 1) {
      const values = rows.filter(({ _id }) => selected.includes(_id))[0];
      setSelectedRowValues(values);
    }
    if (selected.length < 1) {
      createAddInitialValues();
    }
  }, [selected]);
  useEffect(() => {
    Object.keys(selectedRowValues).length > 1 && createEditInitialValues();
  }, [selectedRowValues]);

  const createAddInitialValues = () => {
    const values = {};
    headCells.map((cell) => {
      if (cell.type === "checkbox") {
        return (values[cell.id] = false);
      }
      values[cell.id] = "";
    });
    delete values.id;
    setInitialValues(values);
  };
  const createEditInitialValues = () => {
    const values = {};
    headCells.map((cell) => {
      if (cell.id === "issueDate" || cell.id === "expiryDate") {
        return (values[cell.id] = new Date(selectedRowValues[cell.id])
          .toISOString()
          .split("T")[0]);
      }
      return (values[cell.id] = selectedRowValues[cell.id]);
    });
    delete values.id;
    setInitialValues(values);
  };
  useEffect(() => {
    licenseFormAction === "Edit" && createEditInitialValues();
  }, [licenseFormAction]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const searchRows = (searchValue) => {
    const copiedRows = originalData;
    setRows(
      copiedRows.filter((row) => {
        let include = false;
        for (const prop in row) {
          if (row[prop].toLowerCase().includes(searchValue.toLowerCase()))
            return (include = true);
        }
        return include;
      })
    );
  };
  const licenseIsExpired = (issueDate, expiryDate) =>
    new Date(issueDate) >= new Date(expiryDate);
  const handleChangeSearch = ({ target }) => {
    setSearchValue(target.value);
    searchRows(target.value);
  };
  const handleFilterChange = ({ target }) => {
    const filter = target.value;
    setFilterValue(filter);
    filterRows(filter);
  };
  const confirmDelete = () => {
    setConfirm(true);
  };
  const deleteRows = async () => {
    await handleDialogClose();
    setLoading(true);
    const url = `${location.pathname}/delete`;
    const response = await api.post(url, selected);
    setLoading(false);
    if (!response.ok) {
      setShowInfo(true);
      setInfo(response.problem);
      setInfoType("error");
      return;
    }
    setRows(rows.filter((row) => !selected.includes(row._id)));
    setOriginalData(originalData.filter((row) => !selected.includes(row._id)));
    clearSelection();
    setShowInfo(true);
    setInfoType("info");
    setInfoDescription("");
    setInfo(`${selected.length} item(s) Successfully Deleted`);
  };
  const filterRows = (value) => {
    const copiedRows = originalData;
    if (value === "expired") {
      setRows(
        copiedRows.filter((row) =>
          licenseIsExpired(row.issueDate, row.expiryDate)
        )
      );
    } else if (value === "active") {
      setRows(
        copiedRows.filter(
          (row) => !licenseIsExpired(row.issueDate, row.expiryDate)
        )
      );
    } else {
      setRows(copiedRows);
    }
  };
  const handleDialogClose = () => {
    setConfirm(false);
  };
  const clearSelection = () => setSelected([]);
  const handleOpenAddLicense = () => {
    setOpenLicenseForm(true);
    setLicenseFormAction("Add");
    setLicenseFormError(false);
  };
  const handleOpenEditLicense = () => {
    setOpenLicenseForm(true);
    setLicenseFormAction("Edit");
    setLicenseFormError(false);
  };
  const handleCloseAddLicense = () => {
    setLicenseFormError(false);
    setOpenLicenseForm(false);
    console.log(initialValues);
  };
  const handleSubmitForm = (values, { setSubmitting, resetForm }) =>
    licenseFormAction === "Edit"
      ? handleEditLicense(values, {
          setSubmitting,
          resetForm,
        })
      : handleAddLicense(values, { setSubmitting, resetForm });
  const handleAddLicense = async (values, { setSubmitting, resetForm }) => {
    setLicenseFormError(false);
    console.log(values);
    const response = await api.post(location.pathname, values);
    if (!response.ok) {
      setErrorType("error");
      setLicenseFormError(true);
      response.data
        ? setErrorMessage(response.data.message)
        : setErrorMessage(response.problem);
    } else {
      setOpenLicenseForm(false);
      setInfoType("success");
      setInfo("1 item(s) Added Successfully");
      setInfoDescription("");
      await getRows();
      setShowInfo(true);
      resetForm();
    }
    setSubmitting(false);
  };
  const handleEditLicense = async (values, { setSubmitting, resetForm }) => {
    setLicenseFormError(false);
    const url = `${location.pathname}/${selected[0]}`;
    const successMsg = "1 item(s) Updated Successfully";
    const response = await api.put(url, values);
    if (!response.ok) {
      if (response.data) {
        setErrorType("error");
        setLicenseFormError(true);
        response.data
          ? setErrorMessage(response.data.message)
          : setErrorMessage(response.problem);
      }
    } else {
      setOpenLicenseForm(false);
      setInfoType("success");
      setInfo(successMsg);
      await getRows();
      setShowInfo(true);
      setSelected([]);
      resetForm();
    }
    setSubmitting(false);
  };
  const handleOpenImportLicense = () => setOpenImportLicense(true);
  const handleCloseImportLicense = () => {
    setOpenImportLicense(false);
    setImportFile("");
    setImportStatus("file");
    setChecked(false);
    setImportErrors([]);
    setReadXcelFileErrors([]);
    setShowLicenseErrors(false);
  };
  const handleImportFileChange = ({ target }) => {
    setImportFile(target.files[0]);
    setLicenseFieldError(false);
    setReadXcelFileErrors([]);
  };
  const handleFailedClick = () => setShowLicenseErrors(true);
  const handleImportLicense = async () => {
    if (!importFile) return setLicenseFieldError(true);
    setChecked(true);
    try {
      const { rows, errors } = await readXlsxFile(importFile, {
        schema: importFileSchema,
      });
      let uploaded = [];
      let failed = [];
      //IF an error was encountered with the selected file
      if (errors.length > 0) {
        setReadXcelFileErrors(errors);
        return;
      }
      //IF no error was encountered
      setImportStatus("loading");
      setImportMessage("Importing data...");
      const uploads = rows.map(async (row) => {
        row.issueDate = new Date(row.issueDate);
        const response = await api.post(location.pathname, row);
        return !response.ok
          ? failed.push({ ...row, message: response.data.message })
          : uploaded.push(row);
      });
      await Promise.all(uploads);
      await getRows();
      setImportMessage("");
      setImportErrors(failed);
      setImportSuccess(uploaded);
      setImportStatus(uploaded.length > 0 ? "done" : "failed");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className={classes.root}>
      <TableAlert
        onClose={() => setShowInfo(false)}
        info={info}
        infoType={infoType}
        infoDescription={infoDescription}
        showInfo={showInfo}
      />
      <Confirm
        open={confirm}
        onClose={handleDialogClose}
        onAccept={deleteRows}
      />
      <ImportLicenseForm
        open={openImportLicense}
        onClose={handleCloseImportLicense}
        importStatus={importStatus}
        checked={checked}
        message={importMessage}
        showErrors={showLicenseErrors}
        importErrors={importErrors}
        onFailedClick={handleFailedClick}
        importSuccess={importSuccess}
        onImport={handleImportLicense}
        onChange={handleImportFileChange}
        error={licenseFieldError}
        readXcelFileErrors={readXcelFileErrors}
      />
      <TableForm
        headCells={inputs}
        initialValues={initialValues}
        licenseFormAction={licenseFormAction}
        open={openLicenseForm}
        licenseFormError={licenseFormError}
        onCloseAlert={() => setLicenseFormError(false)}
        onClose={handleCloseAddLicense}
        errorType={errorType}
        errorMessage={errorMessage}
        onSubmitForm={handleSubmitForm}
      />
      <Loader loading={loading} />
      <EnhancedTableToolbar
        filterValue={filterValue}
        onChangeFilter={handleFilterChange}
        searchValue={searchValue}
        onChangeSearch={handleChangeSearch}
        numSelected={selected.length}
        showImport={showImport}
        showPrint={showPrint}
        showEdit={showEdit}
        tableName={location.pathname.split("/").pop().replaceAll("_", " ")}
        onDelete={confirmDelete}
        onEdit={handleOpenEditLicense}
        onOpenAddLicense={handleOpenAddLicense}
        onImportLicense={handleOpenImportLicense}
        onRefreshTable={getRows}
        onPrintTable={setPrintMode}
        showAdd={showAdd}
        showRefresh={showRefresh}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={"small"}
          aria-label="enhanced table"
          ref={tableRef}
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={inputs}
            isPrinting={isPrinting}
            showCheckbox={showCheckbox}
          />
          <TableBody>
            {rows.length > 0 &&
              stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      className={
                        licenseIsExpired(row.issueDate, row.expiryDate)
                          ? classes.expired
                          : classes.tableRow
                      }
                      classes={{ selected: classes.selected }}
                      selected={isItemSelected}
                    >
                      {isPrinting || !showCheckbox || (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            color={"primary"}
                          />
                        </TableCell>
                      )}
                      {Object.entries(row).map(([key, value], index) => {
                        if (key === "_id" || key === "hidden") {
                          return;
                        } else {
                          return (
                            <TableCell
                              className={
                                isItemSelected
                                  ? classes.tableCell
                                  : licenseIsExpired(
                                      row.issueDate,
                                      row.expiryDate
                                    )
                                  ? classes.expiredTableCell
                                  : null
                              }
                              align={"center"}
                              variant={"body"}
                              style={{ padding: 0, minWidth: 120 }}
                              key={`${value}${index}`}
                            >
                              {key === "issueDate" || key === "expiryDate"
                                ? new Date(value).toDateString()
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            {rows.length < 1 && !loading && (
              <TableRow className={classes.emptyTable}>
                <TableCell colSpan={headCells.length + 1} align={"center"}>
                  <Typography variant={"h6"} align={"center"}>
                    No records Found!
                  </Typography>
                  <Tooltip title={"Reload Table"}>
                    <Button
                      onClick={getRows}
                      color={"inherit"}
                      variant={"contained"}
                      disableElevation
                    >
                      <RefreshRoundedIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
