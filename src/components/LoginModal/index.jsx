import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';
import { types } from '../../types/types';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const LoginModal = ({ open, setOpen }) => {
  const { register, handleSubmit, errors } = useForm();
  const { dispatch } = useContext(UserContext);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = ({ name }) => {
    dispatch({
      type: types.login,
      payload: {
        name,
      },
    });
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h2>Login</h2>
            </Grid>
            <Grid item xs={12}>
              <input name="name" placeholder="Your name" ref={register({ required: true })} />
              {errors.name && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">Login</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default LoginModal;
