import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import Table from "../components/Table/Table";
import users from "../config/users";

const Users = () => {
    const classes = useStyles()
    const [checked, setChecked] = useState(true)

    const handleChange = ({target}) => setChecked(target.checked)
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Navbar/>
                </Grid>
                <Grid container item xs={12} justify={'center'} >
                    <Grid item xs={11} className={classes.breadcrumb}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Typography color="inherit">
                                Users
                            </Typography>
                            <Typography color="inherit" >
                                Manage Users
                            </Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={11}>
                        <Paper variant={'outlined'} className={classes.paper}>
                            <Table headCells={users} showPrint={false} showImport={false} allowEditing={false}/>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles({
    breadcrumb: {
        margin: 18
    },
    paper: {
        padding: 10
    }
})
export default Users