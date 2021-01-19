import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, useMediaQuery } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AutorenewRoundedIcon from "@material-ui/icons/AutorenewRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

import AppDrawer from "./Drawer";
import registers from "../config/registers.js";
import { DrawerContext } from "../context/DrawerContext";
import { useHistory } from "react-router-dom";

export default function ButtonAppBar() {
  const [open, setOpen] = useContext(DrawerContext);
  const navigationLinks = registers;
  const history = useHistory();

  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const handleRenew = () => history.push("/renew");

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography align={"left"} variant="h6" className={classes.title}>
            Energy Commission
          </Typography>
          {matches && (
            <>
              <Grid container xs={4} className={classes.licenseButtons}>
                <Grid item xs={5} justify="flex-end">
                  <Button color={"inherit"}>Apply for License</Button>
                </Grid>
                <Grid item xs={5}>
                  <Button onClick={handleRenew} color={"inherit"}>
                    Renew License
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <AppDrawer
        open={open}
        onClose={() => setOpen(!open)}
        navigationLinks={navigationLinks}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    marginRight: 10,
  },
  licenseButtons: {
    marginTop: 10,
  },
}));
