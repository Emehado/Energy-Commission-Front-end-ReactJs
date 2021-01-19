import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import AutorenewRoundedIcon from "@material-ui/icons/AutorenewRounded";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

const AppDrawer = ({ open, onClose, navigationLinks = [] }) => {
  const history = useHistory();
  const goto = (url) => history.push(url);

  const [listOpen, setListOpen] = useState("");
  const classes = useStyles();

  const handleRenew = () => {
    history.push("/renew");
    onClose();
  };
  return (
    <div>
      <Drawer
        className={classes.drawer}
        // variant={"permanent"}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <Typography
            className={classes.drawerTitle}
            variant={"h6"}
            color={"primary"}
          >
            Energy Commission
          </Typography>
          <Divider />
          <List
            aria-labelledby="register"
            subheader={
              <ListSubheader align={"left"} component="div" id="register">
                Registers
              </ListSubheader>
            }
          >
            {navigationLinks.map((register) => (
              <React.Fragment key={register.name}>
                <ListItem
                  onClick={() =>
                    listOpen !== register.name
                      ? setListOpen(register.name)
                      : setListOpen("")
                  }
                  button
                >
                  <ListItemIcon>
                    {register.name === "renewable" && <AutorenewIcon />}
                    {register.name === "electricity" && <OfflineBoltIcon />}
                    {register.name === "naturalGas" && <LocalGasStationIcon />}
                  </ListItemIcon>
                  <ListItemText primary={register.label} />
                  {listOpen ? <ExpandMore /> : <ExpandLess />}
                </ListItem>
                <Collapse
                  in={listOpen === register.name}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {register.licenseTypes.map((licenseType) => (
                      <ListItem
                        onClick={() => {
                          goto(
                            `../../register/${register.name}/${licenseType.name}`
                          );
                          onClose();
                        }}
                        button
                        className={classes.nested}
                        key={licenseType.name}
                      >
                        <ListItemIcon>
                          <FiberManualRecordIcon className={classes.dot} />
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={licenseType.name.replace(/_/g, " ")}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
          {/* {License Application section starts here} */}
          <List
            aria-labelledby="License Application"
            subheader={
              <ListSubheader
                align={"left"}
                component="div"
                id="License Application"
              >
                License Application
              </ListSubheader>
            }
          >
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <AddBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Apply for License"} />
            </ListItem>
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <AutorenewRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Renew License"} onClick={handleRenew} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  dot: {
    fontSize: 12,
  },
  drawerTitle: {
    margin: 20,
  },
}));

export default AppDrawer;
