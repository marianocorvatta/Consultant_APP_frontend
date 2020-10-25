import React,
{
    useEffect,
    useState,
    useContext,
 } from 'react';
import { Container, IconButton,Tooltip } from '@material-ui/core/';
import InfoIcon from '@material-ui/icons/Info';
import MaterialTable from "material-table";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TableIcons from "../TableIcons";

import ConsultantFile from './ConsultantFile';

import DataServices from '../../services/DataServices';
import { AppContext } from '../../context/AppContext';



const ConsultantList = () => {
    let {
        consultantsData,
        setSelectedConsultant,
        getHistory,
        getConsultants,
        setConsultantIsSelected,
        isConsultantSelected,
     } = useContext(AppContext);

    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            getConsultants();
          }
          // eslint-disable-next-line
    }, [init]);

    const updateConsultant =  async (updatedData) => {
        const resp = await DataServices.updateConsultant(updatedData,updatedData._id);
        getConsultants();
    }

    const suspendConsultant = async (id) => {
        const resp = await DataServices.updateConsultantStatus({active: false},id);
        getConsultants();
    }

    const activateConsultant = async (id) => {
        const resp = await DataServices.updateConsultantStatus({active: true},id);
        getConsultants();
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

    const closeFile = () => {
        setConsultantIsSelected(false);
    }

    const handleFileData = (data) => {
        getHistory(data._id);
        setSelectedConsultant([data]);
        setConsultantIsSelected(true);
    }

    return (
        <>
            <Container style={{ marginTop: '25px'}}>

            {isConsultantSelected
            ? <ConsultantFile closeFile={closeFile} />
            :   <MaterialTable
            style={{   fontFamily: "NewsCycleRegular"}}
                        title="Consultantes"
                        icons={TableIcons}
                        actions={[
                            {
                                icon: () => <InfoIcon />,
                                tooltip: 'Ficha',
                                onClick: (event, rowData) => {
                                    handleFileData(rowData);
                                }
                            }
                        ]}
                        columns={[
                            { title: 'Nombre', field: 'name' },
                            { title: 'Apellido', field: 'lastName'},
                            { title: 'Mail', field: 'email' },
                            { title: 'Teléfono', field: 'phone' },
                            { title: 'Link', field: 'meetLink', render: c => <a href={c.meetLink} target="_blank" rel="noopener noreferrer">Meet Link</a> },
                            {
                                title: 'Estado',
                                sorting: false,
                                field: '',
                                render: c => <UserActionButtons consultant={c} />,
                            },
                        ]}
                        data={consultantsData}
                        localization={{
                            pagination: {
                                labelDisplayedRows: '{from}-{to} of {count}',
                                labelRowsSelect: 'por página'
                            },
                            header: {
                                actions: 'Actions'
                            },
                            body: {
                                emptyDataSourceMessage: 'No hay consultantes para mostrar.',
                            }
                        }}
                    />}
            </Container>
        </>
    )
}

export default ConsultantList
