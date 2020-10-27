import React,
{
    useEffect,
    useState,
    useContext,
 } from 'react';
import { Container, IconButton,Tooltip,CircularProgress, Box } from '@material-ui/core/';
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
        setConsultantsData,
     } = useContext(AppContext);

    const [init, setInit] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        if (!init) {
            setIsloading(true)
            try {
                getConsultants();
                setInit(true);
                setIsloading(false);
            } catch (e) {
                console.log(e);
            } 
        }
          // eslint-disable-next-line
    }, [init]);

    const suspendConsultant = async (id) => {
        try {
            const resp = await DataServices.updateConsultantStatus({active: false},id);
            setConsultantsData((currentState) => {
                const filteredData = currentState.filter(d => d._id !== id);
                const newData = currentState.filter(d => d._id == id)[0];
                newData.active = false;
                return [
                    ...filteredData,
                    newData
                ]
            });
        } catch (e) {
            console.log(e);
        }
        // getConsultants();
    }

    const activateConsultant = async (id) => {
        try {
            const resp = await DataServices.updateConsultantStatus({active: true},id);
            setConsultantsData((currentState) => {
                const filteredData = currentState.filter(d => d._id !== id);
                const newData = currentState.filter(d => d._id == id)[0];
                newData.active = true;
                return [
                    ...filteredData,
                    newData
                ]
            });
        } catch (e) {
            console.log(e);
        }
        // getConsultants();
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

            {isLoading ? <Box style={{ marginTop: '25px', alignContent: 'center', textAlign: 'center'}}> <CircularProgress/> </Box> : isConsultantSelected
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
