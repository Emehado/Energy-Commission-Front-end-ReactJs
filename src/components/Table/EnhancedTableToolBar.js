import React, {Fragment, useState} from "react";
import {useMediaQuery} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Zoom from "@material-ui/core/Zoom";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import PrintRoundedIcon from '@material-ui/icons/PrintRounded';
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import PropTypes from "prop-types";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.primary.main,
                backgroundColor: lighten(theme.palette.primary.light, 0.55),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.dark,
            },
    title: {
        flex: '1 1 100%',
        textOverflow: "ellipsis",
    },
    searchInput: {
        margin: 20,
        borderRadius: 50
    },
    text: {

        // display: -webkit-box;
        // -webkit-line-clamp: 2; /* number of lines to show */
        // -webkit-box-orient: vertical;
    }
}));

const EnhancedTableToolbar = ({numSelected, tableName = 'Table Name', filterValue, onChangeFilter, searchValue, onChangeSearch, onDelete, onEdit, onRefreshTable, onOpenAddLicense, onPrintTable, onImportLicense, showImport = true, showPrint = true, showEdit = true, showAdd=true, showRefresh=true}) => {
    const [showSearch, setShowSearch] = useState(false);
    const toggleOpenSearch = () => setShowSearch(!showSearch)

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = useToolbarStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    <Tooltip title={'Filter'}>
                        <Select
                            value={filterValue}
                            onChange={onChangeFilter}
                            defaultValue={filterValue}
                        >
                            <MenuItem value="all"> All</MenuItem>
                            <MenuItem value={'active'}> Active</MenuItem>
                            <MenuItem value={'expired'}> Expired</MenuItem>
                        </Select>
                    </Tooltip>
                    {!showSearch ?
                        <Typography noWrap className={classes.title} variant="h6" id="tableTitle" component="div">
                            {tableName}
                        </Typography> :
                        <Grid container>
                            <Zoom in={showSearch}>
                                <OutlinedInput
                                    className={classes.searchInput}
                                    placeholder={'Enter Company Name'}
                                    value={searchValue}
                                    onChange={onChangeSearch}
                                    fullWidth
                                    autoFocus
                                    style={{height: 40}}
                                />
                            </Zoom>
                        </Grid>}
                </>
            )}
            {numSelected === 1 && (
                <>
                    {/*<Tooltip title="Renew">*/}
                    {/*    <IconButton onClick={onRenew}>*/}
                    {/*        <UpdateRoundedIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</Tooltip>*/}
                    {showEdit && <Tooltip title="Edit">
                        <IconButton onClick={onEdit}>
                            <EditRoundedIcon/>
                        </IconButton>
                    </Tooltip>}
                </>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Fragment>
                    {matches ? (
                        <Fragment>
                            <Tooltip title={showSearch ? 'Close Search' : 'Search'}>
                                <IconButton onClick={toggleOpenSearch}>
                                    {showSearch ? <ClearRoundedIcon/> : <SearchRoundedIcon/>}
                                </IconButton>
                            </Tooltip>
                            {showImport && <Tooltip title={'Import data'}>
                                <IconButton onClick={onImportLicense}>
                                    <PostAddRoundedIcon/>
                                </IconButton>
                            </Tooltip>}
                            {showRefresh && <Tooltip title={'Refresh'}>
                                <IconButton onClick={onRefreshTable}>
                                    <CachedRoundedIcon/>
                                </IconButton>
                            </Tooltip>}
                            {showPrint && <Tooltip title={'Print table'}>
                                <IconButton onClick={onPrintTable}>
                                    <PrintRoundedIcon/>
                                </IconButton>
                            </Tooltip>}
                            {showAdd && <Tooltip title={'Add new license'}>
                                <IconButton onClick={onOpenAddLicense}>
                                    <AddRoundedIcon/>
                                </IconButton>
                            </Tooltip>}
                        </Fragment>
                    ) : <>
                        {/*<Tooltip title={'Add new license'} aria-controls="simple-menu" aria-haspopup="true">*/}
                        {/*    <IconButton onClick={handleClick}>*/}
                        {/*        <MoreVertRoundedIcon/>*/}
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
                        {/*<Menu*/}
                        {/*    id="simple-menu"*/}
                        {/*    anchorEl={anchorEl}*/}
                        {/*    keepMounted*/}
                        {/*    open={Boolean(anchorEl)}*/}
                        {/*    onClose={handleClose}*/}
                        {/*>*/}
                        {/*    <MenuItem onClick={() => {*/}
                        {/*        handleClose()*/}
                        {/*        toggleOpenSearch()*/}
                        {/*    }}>Search</MenuItem>*/}
                        {/*    <MenuItem onClick={() => {*/}
                        {/*        onImportLicense()*/}
                        {/*        handleClose()*/}
                        {/*    }}>Import</MenuItem>*/}
                        {/*    <MenuItem onClick={() => {*/}
                        {/*        onRefreshTable()*/}
                        {/*        handleClose()*/}
                        {/*    }}>Refresh</MenuItem>*/}
                        {/*    <MenuItem onClick={() => {*/}
                        {/*        onPrintTable()*/}
                        {/*        handleClose()*/}
                        {/*    }}>Print</MenuItem>*/}
                        {/*    <MenuItem onClick={() => {*/}
                        {/*        onOpenAddLicense()*/}
                        {/*        handleClose()*/}
                        {/*    }}>Add</MenuItem>*/}
                        {/*</Menu>*/}
                        <Tooltip title={showSearch ? 'Close Search' : 'Search'}>
                            <IconButton onClick={toggleOpenSearch}>
                                {showSearch ? <ClearRoundedIcon/> : <SearchRoundedIcon/>}
                            </IconButton>
                        </Tooltip>
                    </>}
                </Fragment>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
export default EnhancedTableToolbar
