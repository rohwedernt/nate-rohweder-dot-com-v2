import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    dialogContent: {
        wordWrap: 'break-word'
    }
}));

export default function CustomDialog(props) {
    const classes = useStyles();
    const { dialogTitle, confirmText, confirmFunc, content, breakpointMd, breakpointSm, open, handleClose, removeClose } = props;
    const getDialogStyles = () => {
        if (breakpointSm) return { minWidth: '250px' };
        else if (breakpointMd) return { minWidth: '300px' };
        else { return { minWidth: '600px'}};
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby='form-dialog-title'
            maxWidth='md'
        >
            {dialogTitle && <DialogTitle style={{ paddingBottom: '0px' }} id='form-dialog-title'>{dialogTitle}</DialogTitle>}
            <DialogContent className={classes.dialogContent} style={getDialogStyles()}>
                {content()}
            </DialogContent>
            <DialogActions>
                {!removeClose && (
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                )}
                <Button 
                    onClick={() => {
                        handleClose();
                        confirmFunc();
                    }} 
                    color='primary'
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
  );
}
