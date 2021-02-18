import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { types } from '../../types/types';
import LoginModal from '../LoginModal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const { user, dispatch } = useContext(UserContext);
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchor);

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const logout = () => {
    dispatch({
      type: types.logout,
      payload: {},
    });
    handleClose();
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Casino
            </Typography>
            <Typography variant="h6" className={classes.menuButton}>
              Balance
              {' '}
              {user.balance.toLocaleString('es', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            {!user.logged && (
              <Button color="inherit" onClick={() => setOpenModal(true)}>Login</Button>
            )}
            {user.logged && (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>{user.name}</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
      { openModal && (<LoginModal open={openModal} setOpen={setOpenModal} />)}
    </>
  );
};

export default Header;
