import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ToastService from '../../services/ToastService';
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
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
    width: '100%',
  },
  slot: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  btn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    textAlign: 'center',
  },
}));

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const Popup = ({ open, setOpen }) => {
  const { user, dispatch } = useContext(UserContext);
  const [slots, setSlots] = useState(['-', '-', '-']);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };
  const isWinnerSpin = (newSlots) => {
    const tableHash = {};
    let type = 0;
    newSlots.forEach((elem) => {
      if (!tableHash[elem]) {
        tableHash[elem] = 1;
      } else {
        tableHash[elem] += 1;
      }
    });

    Object.entries(tableHash).forEach(([key, value]) => {
      if (value === 3 && key === '7') {
        type = 3;
        return type;
      }
      if (value === 3) {
        type = 2;
        return type;
      }
      if (value === 2) {
        type = 1;
        return type;
      }
      return type;
    });
    return type;
  };

  const spin = () => {
    if (user.balance < 1) {
      ToastService.error('You have insufficent money');
      return;
    }
    const newSlots = [];
    dispatch({
      type: types.spend,
      payload: user.balance - 1,
    });
    for (let i = 0; i < 3; i++) {
      newSlots.push(Math.floor(Math.random() * 10));
    }
    setSlots(newSlots);
    const typeWinner = isWinnerSpin(newSlots);
    switch (typeWinner) {
      case 1:
        dispatch({
          type: types.recive,
          payload: user.balance + 0.5,
        });
        ToastService.success('You win');
        break;
      case 2:
        dispatch({
          type: types.recive,
          payload: user.balance + 5,
        });
        ToastService.success('You win');
        break;
      case 3:
        dispatch({
          type: types.recive,
          payload: user.balance + 10,
        });
        ToastService.success('You Rocks 777 spin');

        break;

      default:
        break;
    }
    const current = new Date();
    dispatch({
      type: types.saveRecord,
      payload: {
        id: nanoid(),
        slot1: newSlots[0],
        slot2: newSlots[1],
        slot3: newSlots[2],
        date: `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`,
      },
    });
  };
  const fakeSpin = () => {
    setSlots([7, 7, 7]);
    dispatch({
      type: types.recive,
      payload: user.balance + 10,
    });
    ToastService.success('You Rocks 777 spin');
    const current = new Date();
    dispatch({
      type: types.saveRecord,
      payload: {
        id: nanoid(),
        slot1: 7,
        slot2: 7,
        slot3: 7,
        date: `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`,
      },
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Typography variant="h6" className={classes.subtitle}>
          Casino rumble
        </Typography>
        <Typography variant="body1" className={classes.text}>
          Spin the machine try to get a big prizes !
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.slot}>{slots[0]}</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.slot}>{slots[1]}</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.slot}>{slots[2]}</Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={4}>
            <Button variant="contained" color="primary" className={classes.btn} onClick={spin}>
              Spin
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="secondary" className={classes.btn} onClick={fakeSpin}>
              Debug
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" className={classes.btn} onClick={handleClose}>Close</Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

Popup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default Popup;
