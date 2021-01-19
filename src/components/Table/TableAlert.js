import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";


const TableAlert = ({onClose,info, infoType,infoDescription,showInfo}) => {
    const classes = useStyles();
    return(
        <Collapse in={showInfo}>
            <Alert className={classes.alert} onClose={onClose}
                   severity={infoType}>
                <AlertTitle>{info}</AlertTitle>
                {infoDescription}
            </Alert>
        </Collapse>
    )
}
const useStyles = makeStyles(theme => ({
    alert: {
        margin: 20
    },
}) )
export default TableAlert;