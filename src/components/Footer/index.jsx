import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  text: {
    fontSize: 14,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.text}>
            © 2021 Casino, Inc.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
