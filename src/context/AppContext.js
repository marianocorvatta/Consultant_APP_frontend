import React, { createContext, useState, useEffect } from "react";
import DataServices from "../services/DataServices";

let AppContext = createContext();
let { Provider, Consumer } = AppContext;

function AppContextProvider({ children }) {
  const [consultantsData, setConsultantsData] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [appointmentSelectedData, setAppointmentSelectedData] = useState({});
  const [isConsultantSelected, setConsultantIsSelected] = useState(false);

  const getHistory = async (id) => {
    try {
      const resp = await DataServices.getHistory(id);
      setHistoryList(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getConsultants = async () => {
    try {
      const resp = await DataServices.getConsultants();
      setConsultantsData(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Provider
      value={{
        consultantsData,
        setConsultantsData,
        selectedConsultant,
        setSelectedConsultant,
        historyList,
        setHistoryList,
        appointmentSelectedData,
        setAppointmentSelectedData,
        getHistory,
        getConsultants,
        isConsultantSelected,
        setConsultantIsSelected,
      }}
    >
      {children}
    </Provider>
  );
}

export { AppContextProvider, Consumer as AppConsumer, AppContext };
