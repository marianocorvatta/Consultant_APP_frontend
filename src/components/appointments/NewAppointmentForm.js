import React, {useContext,useState, useEffect} from 'react'
import {Container, Card , CardContent, CardHeader, CardActions,TextField, MenuItem, Button } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import is from 'is_js';
import moment from "moment";


import DataServices from '../../services/DataServices';
import { AppContext } from '../../context/AppContext';


const useStyles = makeStyles((theme) => ({
    gridItem: {
        textAlign: 'center',
    },
    gridItemDate: {
        width: '225px!important',

    }
  }));

const APPOINTMENT_TYPES = [ 
   "Terapia Floral",
   "Reiki"
]

const NewAppointmentForm = () => {
    const classes = useStyles();
    let { consultantsData, setConsultantsData } = useContext(AppContext);

    const [ date, setDate ] = useState('');
    const [ consultant, setConsultant ] = useState('');
    const [ appointmentType, setAppointmentType ] = useState(0);
    const [dateError, setDateError] = useState('');

    const getConsultants = async () => {
        const resp = await DataServices.getConsultants();
        setConsultantsData(resp.data);
     }

    useEffect(() => {
        if(is.empty(consultantsData)) {
            getConsultants();
        }
    }, [])

    const setAppointment = async () => {
        const data = {
            type: appointmentType,
            date,
            notes: null, 
            flowers: null, 
            completed: false, 
            todo: null
        }
        console.log("data de cita",data);
        try {
            const resp = await DataServices.createAppointment(data ,consultant);
        } catch (e) {
            console.log(e);
            setDateError("Ya existe una consulta con esta fecha y hora!");
            setTimeout(() => setDateError(''),3000);
        } finally {
            setDate('');
            setConsultant('');
            setAppointmentType(0);
        }
    }


    return (
        <>
                <Container  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
                    <Card style={{ width: '50%'}}>
                        <CardHeader
                            style={{ padding: '30px', backgroundColor: '#DEB1DF', color: '#fff'}}
                            title="Agendar consulta"
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item sm={12} className={classes.gridItem}>    
                                    <TextField
                                    style={{ minWidth: '223px'}}
                                    id="outlined-select-currency"
                                    select
                                    onChange={(e) => setConsultant(e.target.value)}
                                    label="Consultante"
                                    value={consultant}
                                    variant="outlined"
                                    >
                                        {consultantsData.map( c => <MenuItem key={`consultant_${c}`} value={c._id}>
                                            {`${c.name} ${c.lastName}`}
                                        </MenuItem>)}
                                        
                                    </TextField>
                                </Grid>
                                <Grid item sm={12} className={classes.gridItem}>    
                                    <TextField
                                    style={{ minWidth: '223px'}}
                                    id="outlined-select-currency"
                                    select
                                    onChange={(e) => setAppointmentType(e.target.value)}
                                    label="Tipo de consulta"
                                    value={appointmentType}
                                    variant="outlined"
                                    >
                                        {APPOINTMENT_TYPES.map( (t,i) => <MenuItem  key={i} value={i + 1}>
                                            {`${t}`}
                                        </MenuItem>)}
                                        
                                    </TextField>
                                </Grid>
                                <Grid item sm={12} className={classes.gridItem}>
                                    <TextField
                                        error={!!dateError}
                                        helperText={dateError}
                                        className={classes.gridItemDate}
                                        required
                                        id="outlined-required"
                                        label=""
                                        type='datetime-local'
                                        value={date}
                                        inputProps={{
                                            step: '3000', // 5 min
                                            }}
                                        onChange={(e) => {
                                            // setDate(moment(e.target.value).format("yyyy-MM-DD"));
                                            setDate(e.target.value);
                                            console.log("horario",e.target.value)
                                          }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Button variant="contained" onClick={setAppointment} style={{ backgroundColor: '#DEB1DF' }}>Confirmar</Button>
                        </CardActions>
                    </Card >
            </Container>

        </>
    )
}

export default NewAppointmentForm
