import React, { useState, useContext } from 'react'
import {Container, Card , FormControl, InputLabel, CardContent, CardHeader, CardActions,TextField, OutlinedInput,MenuItem, Button } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import DataService from '../../services/DataServices'
import { AppContext } from '../../context/AppContext';


const useStyles = makeStyles((theme) => ({
    gridItem: {
        textAlign: 'center',
    }
  }));


const NewConsultantForm = () => {
    let {getConsultants} = useContext(AppContext);
    const classes = useStyles();
    const history = useHistory();

    const [ name, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ age, setAge ] = useState(0);
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState(0);
    const [ illnesses, setIllnesses ] = useState('');
    const [ psychotherapy, setPsychotherapy ] = useState(false);
    const [ active, setActive ] = useState(true);
    const [ meetLink, setMeetLink ] = useState('');

    const createConsultant = async () => {
        const resp = await DataService.createConsultant({
            name: name, 
            lastName: lastName, 
            age: age, 
            email: email, 
            phone: phone, 
            psychotherapy: psychotherapy,
            illnesses: illnesses,
            meetLink: meetLink,
            active: active
        });
        getConsultants()
        history.push('/');
        console.log("resp",resp);
    }

    return (
        <>
            <Container  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
                    <Card style={{ width: '50%'}}>
                        <CardHeader
                            style={{ padding: '30px', backgroundColor: '#DEB1DF',color: '#fff'}}
                            title="Agregar paciente"
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item sm={6} className={classes.gridItem}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={6}  className={classes.gridItem}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Apellido"
                                        onChange={(e) => setLastName(e.target.value)}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={6} className={classes.gridItem}>
                                    <TextField
                                    id="outlined-number"
                                    label="Edad"
                                    type="number"
                                    onChange={(e) => setAge(e.target.value)}
                                    variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={6} className={classes.gridItem}>    
                                    <TextField
                                    id="outlined-required"
                                    label="Mail"
                                    onChange={(e) => setEmail(e.target.value)}
                                    variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={6} className={classes.gridItem}>
                                    <TextField
                                    id="outlined-number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    label="Teléfono"
                                    type="number"
                                    variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={6} className={classes.gridItem}>    
                                    <TextField
                                    style={{ minWidth: '223px'}}
                                    onChange={(e) => setIllnesses(e.target.value)}
                                    id="outlined-required"
                                    label="Enfermedades"
                                    variant="outlined"
                                    multiline
                                    />
                                </Grid>
                                <Grid item sm={6} className={classes.gridItem}>
                                    <TextField
                                    style={{ minWidth: '223px'}}
                                    id="outlined-select-currency"
                                    onChange={(e) => setPsychotherapy(e.target.value)}
                                    label="Psicoterapia"
                                    variant="outlined"
                                    multiline
                                    />
                                </Grid>
                                <Grid item sm={6} className={classes.gridItem}>    
                                    <TextField
                                    style={{ minWidth: '223px'}}
                                    id="outlined-select-currency"
                                    select
                                    onChange={(e) => setActive(e.target.value)}
                                    label="Activo"
                                    variant="outlined"
                                    >
                                        <MenuItem  value={true}>
                                            SI
                                        </MenuItem>
                                        <MenuItem  value={false}>
                                            NO
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item sm={12}>
                                    <FormControl fullWidth style={{ marginTop: '15px'}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">Link</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        // value={values.amount}
                                        onChange={(e) => setMeetLink(e.target.value)}
                                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        labelWidth={60}
                                    />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        
                               
                           
                        </CardContent>
                        <CardActions style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Button variant="contained" onClick={createConsultant}>Confirmar</Button>
                        </CardActions>
                    </Card >
            </Container>
        </>
    )
}

export default NewConsultantForm
