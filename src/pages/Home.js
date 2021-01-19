import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from "../components/Navbar";

export default function Home() {
    useEffect(() => {
        window.location = '/register/renewable/Provisional_Wholesale_Supply_and_Generation_License'
    })
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Navbar/>
            <main className={classes.content}>
            </main>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        width: '100%',
        marginTop: 50,
        padding: theme.spacing(3),
    },
}));
