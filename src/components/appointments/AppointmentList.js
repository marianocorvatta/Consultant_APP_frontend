import React, { useState, useEffect, useContext } from 'react'
import MaterialTable from "material-table";
import TableIcons from "../TableIcons";
import moment from 'moment';
import { IconButton,Tooltip, Button, CircularProgress, Container,Box  } from '@material-ui/core/';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import AppointmentTypes from './AppointmentTypes';
import AppointmentFile from './AppointmentFile'

import DataServices from '../../services/DataServices';
import { AppContext } from '../../context/AppContext';

const AppointmentList = () => {

    let { historyList, setAppointmentSelectedData,getHistory } = useContext(AppContext);
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [historyList])

    const [selectedRow, setSelectedRow] = useState(null);
    const [appointmentSelected, setAppointmentSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteAppointmentData, setDeleteAppointmentData] = useState({});

    const handleAppointmentSelected = (selectedRow) => {
        setAppointmentSelectedData(selectedRow);
        setAppointmentSelected(true);
        setSelectedRow(selectedRow.tableData.id);
    };

    const removeAppointment = () => {
        try {
            const resp = DataServices.removeAppointment(deleteAppointmentData.consultantId,deleteAppointmentData._id)
            getHistory(deleteAppointmentData.consultantId);
            setDeleteAppointmentData({});
            setOpen(false);
        } catch (e) {
            console.log("Error:",e);
        }
    }

    const handleModal = (e,appointment) => {
        e.stopPropagation();
        setDeleteAppointmentData(appointment);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setDeleteAppointmentData({});
      };
 
    const DeleteButton = ({appointment}) => {
        return <>
            <Tooltip title="Eliminar consulta">
                <IconButton style={{ color: 'red'}} onClick={(e) => handleModal(e,appointment)}>
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </Tooltip>
        </>
    }

    const UserStateIcons = ({ appointment }) => {
        switch (appointment.completed) {
            case true:
                return <>
                    <Tooltip title="Completada" >
                        <CheckRoundedIcon tyle={{ color: 'green'}}/>
                    </Tooltip>
                </>
            case false:
                return <>
                    <Tooltip title="Pendiente">
                        <CloseRoundedIcon style={{ color: 'grey'}} />
                    </Tooltip>
                </>
            default:
                return null;
        }
    }

    return (
        <>
       { appointmentSelected && <AppointmentFile setAppointmentSelected={setAppointmentSelected} /> }
      {appointmentSelected ? '' : mounted ? <> 
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                    >
                        <DialogTitle id='alert-dialog-title'>
                        ¿Desea eliminar la consulta?
                        </DialogTitle>
                        <DialogActions>
                        <Button onClick={removeAppointment} color='primary'>
                            Confirmar
                        </Button>
                        <Button onClick={handleClose} color='primary' autoFocus>
                            Cancelar
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <MaterialTable
                        style={{ marginTop: '10px', textAlign: 'center'}}
                        title="Historial de consultas"
                        icons={TableIcons}                        
                        options={{ 
                            headerStyle: {
                                padding: '10px',
                                backgroundColor: '#CBCBCB',
                                color: '#FFF'
                              },
                            pageSize: 10,
                            search: false,
                            rowStyle: rowData => ({
                                backgroundColor: (selectedRow === rowData.tableData.id) ? '#DEB1DF' : '#FFF',
                              })
                             
                         }}
                        columns={[
                            { title: 'Fecha', field: 'date', render: c => `${moment(c.date).utc().format('DD-MM-YYYY')}`},
                            { title: 'Hora', field: 'date', render: c => `${moment(c.date).utc().format('LT')}` },
                            { title: 'Tipo', field: 'type', render: c => <AppointmentTypes type={c.type}/>},
                            { title: 'Estado', field: 'completed', render: c => <UserStateIcons appointment={c}/> },
                            { title: 'Eliminar', render: c => <DeleteButton appointment={c}/> },
                        ]}
                        onRowClick={((evt, selectedRow) => handleAppointmentSelected(selectedRow))}
                        data={historyList}
                        components={{
                            Pagination: props => (
                            < >
                            </>
                            ),
                          }}
                    /></> : <Box style={{textAlign: 'center', marginTop: '50px'}}><CircularProgress/></Box> }
            
        </>
    )
}

export default AppointmentList
