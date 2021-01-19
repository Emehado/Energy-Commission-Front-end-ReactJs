import Zoom from "@material-ui/core/Zoom";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import React from "react";
import Lottie from "lottie-react";
import {Link, useLocation} from "react-router-dom";
import loading from "../../../config/lottie/loading.json";
import syncing from "../../../config/lottie/syncing.json"
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const ImportLicenseForm = ({open, onClose, onImport, onChange, error, importStatus, checked, message, importSuccess, importErrors, onFailedClick, showErrors, readXcelFileErrors = []}) => {
    const location = useLocation()
    return (
        <div>
            <Dialog fullWidth maxWidth={'sm'} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Import License</DialogTitle>
                <DialogContent>
                    {importStatus === 'file' && <div>
                        <DialogContentText>
                            Select the file excel file you wish to import.
                            <Typography color={'secondary'}>
                                <small>
                                    The selected file must follow a format. Your upload might fail if the format is
                                    incorrect.
                                </small>
                            </Typography>
                            <small>
                                <Link to={`${location.pathname}.xlsx`} target="_blank" download>Click here</Link> to
                                download a sample format
                            </small>
                        </DialogContentText>
                        <TextField
                            id="file"
                            label="Select file"
                            type="file"
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            onChange={onChange}
                            error={error}
                            helperText={error && 'Please select a file'}
                        />
                    </div>}
                    <Zoom direction="right" timeout={1000} in={checked} mountOnEnter unmountOnExit>
                        <Grid container>
                            <Grid container item xs={12} alignItems={'center'} justify={'center'}>
                                <Grid container item xs={4} justify={'center'} alignItems={'center'}>
                                    {importStatus === 'loading' && <Lottie animationData={syncing} autoPlay loop/>}
                                    {showErrors || (importStatus === 'done' &&
                                        <Lottie initialSegment={[300, 400]} animationData={loading} loop={false}/>)}
                                    {showErrors || (importStatus === 'failed' &&
                                        <Lottie initialSegment={[700, 800]} animationData={loading} loop={false}/>)}
                                    <Typography color={'inherit'} variant={'caption'}>{message}</Typography>
                                    {(importStatus === 'failed' || importStatus === 'done') &&
                                    <Typography color={'primary'}
                                                variant={'caption'}>{`${importSuccess.length} imports successful`}</Typography>}
                                    {importErrors.length < 1 || ((importStatus === 'failed' || importStatus === 'done') &&
                                        <Typography variant={'caption'}>
                                            <Link href={'#'} color={'secondary'}
                                                  onClick={onFailedClick}>{`${importErrors.length} imports failed`}</Link>
                                        </Typography>)}
                                </Grid>
                                <Grid item xs={12}>
                                    {showErrors && importErrors.map((error, index) => <Alert key={index}
                                                                                             severity={'error'}>
                                        <AlertTitle>Error located at "{error.name}" on row {index + 1}</AlertTitle>
                                        {error.message}
                                    </Alert>)}
                                </Grid>
                                <Grid item xs={12}>
                                    {readXcelFileErrors.map((error, index) => <Alert key={index}
                                                                                     severity={'error'}>
                                        <AlertTitle>Column "{error.column}" on row {error.row} is a required
                                            field</AlertTitle>
                                        {error.message}
                                    </Alert>)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Zoom>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    {importStatus === 'file' && <Button onClick={onImport} color="primary">
                        Import
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ImportLicenseForm