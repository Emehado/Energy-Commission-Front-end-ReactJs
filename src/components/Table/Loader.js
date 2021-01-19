import React from "react";
import Zoom from "@material-ui/core/Zoom";
import spin from "../../config/lottie/spin.json";
import Lottie from "lottie-react";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const Loader = ({loading}) => {
    const classes = useStyles();
    return (
        <Zoom in={loading} unmountOnExit mountOnEnter>
            <Backdrop open={loading} className={classes.backdrop}>
                <Grid container alignItems={'center'} justify={'center'}>
                    <Grid item xs={10} container alignItems={'center'} justify={'center'}>
                        <Lottie animationData={spin} autoPlay loop style={{height: 80, width: 80}}/>
                    </Grid>
                </Grid>
            </Backdrop>
        </Zoom>
    )
}
const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))
export default Loader;