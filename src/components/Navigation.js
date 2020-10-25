import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core/';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

import {
  Link,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }));
  

const Navigation = () => {
    const classes = useStyles();
    const history = useHistory();
    let { setConsultantIsSelected } = useContext(AppContext);

    const getToHome = () => {
      setConsultantIsSelected(false);
      history.push('/');
    }

    return (
        <div className={classes.root}>
          <AppBar position="static" style={{  backgroundColor: '#DEB1DF'}}>
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link style={{ textDecoration: 'none', color: '#ffff',fontFamily: "NewsCycleRegular"}} onClick={getToHome}>
                  HOME
                </Link>
              </Typography>
              <Link to='/newConsultant' style={{textDecoration: 'none',fontFamily: "NewsCycleRegular"}}><Button variant="contained" style={{backgroundColor: '#C79FC8', marginRight: '15px', color: '#ffff'}}  type="button" >Agregar paciente</Button></Link>
              <Link to='/newAppointment' style={{textDecoration: 'none',fontFamily: "NewsCycleRegular"}}><Button variant="contained" style={{backgroundColor: '#C79FC8', color: '#ffff'}} type="button" >Agendar consulta</Button></Link>
            </Toolbar>
          </AppBar>
        </div>
    )
}

export default Navigation
