import React from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    paddingTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  desc: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  titleRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  comingSoon: {
    marginLeft: theme.spacing(5),
    paddingTop: theme.spacing(2),

  }
}));

export default function CustomDialogFullScreen(props) {
  const classes = useStyles();
  const { open, handleClose, title, description, content, comingSoon } = props;

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className={classes.titleRow}>
              <Typography variant='h6' className={classes.title}>
                {title}
              </Typography>
              <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              {description && <Typography variant='body1' component='div' className={classes.desc}>{description}</Typography>}
            </div>
          </Toolbar>
        </AppBar>
          {comingSoon && <Typography className={classes.comingSoon} variant='h6'>Coming Soon...</Typography>}
          {content()}
      </Dialog>
    </div>
  );
}