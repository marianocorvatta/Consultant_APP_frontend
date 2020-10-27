import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  Button,
  Box,
} from "@material-ui/core";
import moment from "moment";
import is from "is_js";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../../assets/styleSheets/AutocompleteStyle.css";

import AppointmentTypes from "./AppointmentTypes";
import DataServices from "../../services/DataServices";


const AppointmentFile = ({ setAppointmentSelected }) => {
  let { appointmentSelectedData, getHistory, historyList } = useContext(
    AppContext
  );
  const [init, setInit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(
    appointmentSelectedData.completed
  );
  const [newNotes, setNewNotes] = useState(appointmentSelectedData.notes);
  const [newTodos, setNewTodos] = useState(appointmentSelectedData.todo);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const [flowerList, setFlowerList] = useState([]);
  const [flowersSelected, setFlowersSelected] = useState([]);
  const [lastAppointment, setLastAppointment] = useState({});

  const handleFlowersSelected = (e, newValue) => {
    setFlowersSelected(newValue);
    setEdit(true);
  };

  const getFlowers = async () => {
    try {
      const resp = await DataServices.getFlowers();
      setFlowerList(resp.data[0].flowers);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const getLastFlowers = () => {
    if (appointmentSelectedData.tableData.id !== 0) {
      const filteredList = historyList.slice(
        0,
        appointmentSelectedData.tableData.id
      );
      const lastAppointment = filteredList.reduce((a, b) =>
        a.date > b.date ? a : b
      );
      setLastAppointment(lastAppointment);
    } else {
      setLastAppointment({});
    }
  };

  useEffect(() => {
    if (!init) {
      setInit(true);
      getFlowers();
      getLastFlowers();

      is.not.empty(appointmentSelectedData.flowers) &&
        setFlowersSelected(appointmentSelectedData.flowers);
    }
    // eslint-disable-next-line
  }, [init]);

  const saveData = async () => {
    const data = {
      type: appointmentSelectedData.type,
      date: appointmentSelectedData.date,
      notes: newNotes,
      flowers: flowersSelected,
      completed: isCompleted,
      todo: newTodos,
    };
    const resp = await DataServices.updateAppointment(
      data,
      appointmentSelectedData.consultantId,
      appointmentSelectedData._id
    );
  };

  const saveChanges = async () => {
    if (edit) {
      saveData();
      setEdit(false);
      getHistory(appointmentSelectedData.consultantId);
    }
  };

  const closeFile = () => {
    if (edit) {
      setOpen(true);
    } else {
      setAppointmentSelected(false);
    }
  };

  const handleChangeIsCompleted = (e) => {
    setIsCompleted(e.target.value);
    setEdit(true);
  };
  const handleChangeNewNotes = (e) => {
    setNewNotes(e.target.value);
    setEdit(true);
  };
  const handleChangeNewTodos = (e) => {
    setNewTodos(e.target.value);
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
    setAppointmentSelected(false);
    setOpen(false);
  };

  const handleCloseAndSave = async () => {
    saveData();
    setEdit(false);
    setAppointmentSelected(false);
    setOpen(false);
    getHistory(appointmentSelectedData.consultantId);
  };

  return (
    <>
      <Box boxShadow={3} style={{ padding: "15px", marginTop: "15px" }}>
        <div style={{ alignContent: "right", textAlign: "right" }}>
          <Button
            onClick={closeFile}
            variant='contained'
            type='button'
            style={{ color: "#ffff", backgroundColor: "#DEB1DF" }}
          >
            CERRAR
          </Button>
          <h1
            style={{
              fontFamily: "NewsCycleRegular",
              textAlign: "left",
              marginTop: "-40px",
            }}
          >
            Ficha de consulta
          </h1>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            ¿Desea guardar los cambios realizados?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseAndSave} color='primary'>
              Confirmar
            </Button>
            <Button onClick={handleClose} color='primary' autoFocus>
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container style={{ flexGrow: 1 }} spacing={2}>
          <Grid item>
            <span>
              <b>Fecha:</b>{" "}
              {moment(appointmentSelectedData.date).utc().format("DD-MM-YYYY")}
            </span>
          </Grid>
          <Grid item>
            <span style={{ marginLeft: "10px" }}>
              <b>Hora:</b>{" "}
              {moment(appointmentSelectedData.date).utc().format("LT")}
            </span>
          </Grid>
          <Grid item>
            <span style={{ marginLeft: "10px" }}>
              <b>Tipo de consulta:</b>{" "}
              <AppointmentTypes type={appointmentSelectedData.type} />
            </span>
          </Grid>
          <Grid item>
            <span style={{ marginLeft: "10px" }}>
              <b>Flores anteriores:</b>{" "}
              {is.not.empty(lastAppointment)
                ? lastAppointment.flowers.join(", ")
                : "No tiene"}
            </span>
          </Grid>
          <Grid item>
            <span style={{ marginLeft: "10px" }}>
              <b>¿ Completada ?:</b>
            </span>
            <Select
              labelId='completedIdLabel'
              id='completedId'
              name='isCompleted'
              value={isCompleted}
              onChange={handleChangeIsCompleted}
              label='¿Completada?'
              style={{ width: "55px", marginLeft: "10px" }}
            >
              <MenuItem value={true}>Si</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: "25px", marginTop: "20px" }}>
          <Grid item sm={12}>
            <Autocomplete
              value={flowersSelected}
              multiple
              size='small'
              id='flowerAutocomplete'
              options={flowerList}
              ChipProps={{ display: "none" }}
              onChange={(event, newValue) => {
                handleFlowersSelected(event, newValue);
              }}
              getOptionLabel={(options) => options}
              filterSelectedOptions
              style={{ width: "270px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Flores de Bach'
                  placeholder='Flores de Bach'
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Box style={{ marginTop: "20px", display: "flex" }}>
              <TextField
                id='notes'
                label='Notas'
                style={{ width: "600px" }}
                multiline
                name='newNotes'
                rows={24}
                onChange={handleChangeNewNotes}
                value={newNotes}
                variant='outlined'
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box style={{ marginTop: "20px" }}>
              <TextField
                id='todos'
                label='Próxima consulta'
                style={{ width: "300px" }}
                multiline
                name='newTodos'
                rows={8}
                value={newTodos}
                onChange={handleChangeNewTodos}
                variant='outlined'
              />
            </Box>
          </Grid>
        </Grid>
        <div style={{ alignContent: "right", textAlign: "center" }}>
          <Button
            onClick={saveChanges}
            variant='contained'
            type='button'
            style={{ color: "#ffff", backgroundColor: "#DEB1DF" }}
          >
            GUARDAR
          </Button>
        </div>
      </Box>
    </>
  );
};

export default AppointmentFile;
