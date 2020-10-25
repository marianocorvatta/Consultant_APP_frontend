import React, { useContext, useEffect } from 'react'
import { IconButton,Tooltip, Button } from '@material-ui/core/';
import MaterialTable from "material-table";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TableIcons from '../TableIcons';
import moment from 'moment';

import AppointmentList from '../appointments/AppointmentList';

import DataServices from '../../services/DataServices';
import { AppContext } from '../../context/AppContext';



const ConsultantFile = ({ closeFile }) => {

    let { selectedConsultant,getConsultants, setSelectedConsultant } = useContext(AppContext);


    const updateConsultant =  async (updatedData) => {
        try {
            const resp = await DataServices.updateConsultant(updatedData,updatedData._id);
            getConsultants();
            console.log("selectedConsultant",selectedConsultant);
            console.log("updatedData",updatedData);
            setSelectedConsultant([updatedData]);
        } catch (e) {
            console.log(e);
        }

    }

    const suspendConsultant = async (id) => {
        try {
            const resp = await DataServices.updateConsultantStatus({active: false},id);
            getConsultants();
            setSelectedConsultant((currentState) => {
                const newData = currentState[0];
                newData.active = false
                return [
                    newData
                ]
            });
        } catch (e) {
            console.log(e);
        }
    }

    const activateConsultant = async (id) => {
        try {
            const resp = await DataServices.updateConsultantStatus({active: true},id);
            getConsultants();
            setSelectedConsultant((currentState) => {
                const newData = currentState[0];
                newData.active = true
                return [
                    newData
                ]
            });    
        } catch (e) {
            console.log(e);
        }
    }

    const UserActionButtons = ({ consultant }) => {
        switch (consultant.active) {
            case true:
                return <>
                    <Tooltip title="Suspender consultante" >
                        <IconButton style={{ color: 'green'}}  onClick={() => suspendConsultant(consultant._id)}>
                            <ThumbUpIcon />
                        </IconButton>
                    </Tooltip>
                </>
            case false:
                return <>
                    <Tooltip title="Activar consultante">
                        <IconButton onClick={() => activateConsultant(consultant._id)}>
                            <ThumbDownIcon />
                        </IconButton>
                    </Tooltip>
                </>
            default:
                return null;
        }
    }

    return (
        <>  
        <div style={{ marginBottom: '10px', alignContent: 'right', textAlign: 'right'}}>
            <Button onClick={closeFile} type="button" variant="contained" style={{ color: '#ffff', backgroundColor: '#DEB1DF'}}>VOLVER</Button>
        </div>
            <MaterialTable
                        title={`Ficha de ${selectedConsultant[0]?.name} ${selectedConsultant[0]?.lastName}`}
                        icons={TableIcons}                        
                        options={{ 
                                headerStyle: {
                                    padding: '5px',
                                    backgroundColor: '#CBCBCB',
                                    color: '#FFF'
                                  },
                            pageSize: 1,
                            search: false
                         }}
                        columns={[
                            { title: 'Nombre', field: 'name' },
                            { title: 'Apellido', field: 'lastName'},
                            { title: 'Mail', field: 'email' },
                            { title: 'Teléfono', field: 'phone' },
                            { title: 'Enfermedades', field: 'illnesses' },
                            { title: 'Psicoterapia', field: 'psychotherapy' },
                            { title: 'Paciente desde', field: 'createdAt', render: c => `${moment(c.createdAt).format('DD-MM-YYYY')}` },
                            { title: 'Link', field: 'meetLink', render: c => <a href={c.meetLink} target="_blank" rel="noopener noreferrer">Meet Link</a> },
                            {
                                title: 'Estado',
                                sorting: false,
                                field: '',
                                render: c => <UserActionButtons consultant={c} />,
                            },
                        ]}
                        data={selectedConsultant}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                    const dataUpdate = [...selectedConsultant];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    updateConsultant(newData);
                                    resolve();
                                    }, 1000)
                                }),
                        }}
                        components={{
                            Pagination: props => (
                            < >
                            </>
                            ),
                          }}
                    />
            <AppointmentList />
        </>
    )
}

export default ConsultantFile
