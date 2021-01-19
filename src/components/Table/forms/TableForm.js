import React from "react";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {Form, Formik, Field} from "formik";
import * as Yup from "yup";
import TextInput from "../../TextInput";

const TableForm = ({open, onClose, onSubmitForm, licenseFormAction, headCells = [], initialValues, licenseFormError, errorType, errorMessage, onCloseAlert}) => {
    const validation = {};
    const createValidation = () => {
        headCells.forEach(cell => {
            if (cell.id === 'email') {
                validation[cell.id] = Yup.string().email().required()
            } else if (cell.type === 'date') {
                validation[cell.id] = Yup.date().required()
            } else {
                validation[cell.id] = Yup.string().required()
            }
        })
    }
    createValidation();
    return (
        <Formik enableReinitialize initialValues={initialValues} validationSchema={Yup.object(validation)}
                onSubmit={onSubmitForm}>
            {({isSubmitting, handleSubmit, values}) => (
                <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        <Grid container>
                            <Grid item xs={11}>{licenseFormAction} License</Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={onClose}>
                                    <CloseRoundedIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    licenseFormError && (<Grid>
                                        <Zoom in={licenseFormError}>
                                            <Alert onClose={onCloseAlert}
                                                   severity={errorType}>{errorMessage}</Alert>
                                        </Zoom>
                                    </Grid>)
                                }
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Form>
                            <Grid container spacing={2}>
                                {headCells.map(cell => {
                                    return (
                                        <Grid item xs={6} key={cell.id}>
                                            {cell.type === 'checkbox' ? (
                                                <label>
                                                    {cell.label}
                                                    <Field name={cell.id} type={cell.type}/>
                                                </label>
                                            ) : (
                                                <TextInput
                                                    name={cell.id}
                                                    label={cell.label.charAt(0).toUpperCase() + cell.label.slice(1)}
                                                    variant="outlined"
                                                    InputLabelProps={cell.type === 'date' ? ({shrink: true}) : null}
                                                    type={cell.type}
                                                    fullWidth/>
                                            )}
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={'contained'}
                            type={'submit'}
                            color="primary"
                            onClick={handleSubmit}
                            disabled={isSubmitting}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>
    );
}

export default TableForm;