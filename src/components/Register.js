import React from "react";
import {Typography} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Navbar from "./Navbar";
import Table from "./Table/Table";
import registers from "../config/registers.js";

const Register = ({location}) => {
    const classes = useStyles();
    const registerTypeName = location.pathname.split("/")[2]
    const licenseTypeName = location.pathname.split("/")[3]
    const register = registers.filter(register => register.name === registerTypeName);
    const license = register[0].licenseTypes.filter(license => license.name === licenseTypeName)
    const registerType = location.pathname.split('/')[2]
    const licenseType = location.pathname.split('/')[3].replaceAll('_', ' ')

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar/>
                </Grid>
                <Grid container item xs={12} justify={'center'}>
                    <Grid item xs={11} className={classes.breadcrumb}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Typography color="inherit">
                                {registerType}
                            </Typography>
                            <Typography color="inherit">
                                {licenseType}
                            </Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={11}>
                        <Paper variant={'outlined'} className={classes.paper}>
                            <Table headCells={license[0].headCells} showAdd={false} showRefresh={false}
                                   showImport={false} showPrint={false} showEdit={false} showCheckbox={false}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default Register;

const useStyles = makeStyles(theme => ({
    breadcrumb: {
        margin: 18
    },
    paper: {
        padding: 10
    }
}))