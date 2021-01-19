import Zoom from "@material-ui/core/Zoom";
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

export default function AlertDialogSlide({open, onClose, onAccept}) {
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete the selected item(s)? <br /> This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onAccept} color="secondary">
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
