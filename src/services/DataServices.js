import axios from "axios";


const DataService = {
    
    getConsultants: () => {
      console.log(`DataService.getConsultants()`);
      const url = `${process.env.REACT_APP_API_URL}/consultants`;
      return axios.get(url);
    },
   
    createConsultant: (data) => {
      console.log(`DataService.createConsultant()`);
      const url = `${process.env.REACT_APP_API_URL}/consultants/create`;
      return axios.post(url,data);
    },

    updateConsultant: (data, consultantId) => {
      console.log(`DataService.createConsultant()`);
      const url = `${process.env.REACT_APP_API_URL}/consultants/edit/${consultantId}`;
      return axios.put(url,data);
    },

    updateConsultantStatus: (data, consultantId) => {
      console.log(`DataService.createConsultant()`);
      const url = `${process.env.REACT_APP_API_URL}/consultants/edit/${consultantId}`;
      return axios.patch(url,data);
    },

    getHistory: (consultantId) => {
      console.log(`DataService.getHistory()`);
      const url = `${process.env.REACT_APP_API_URL}/appointments/${consultantId}`;
      return axios.get(url);
    },

    createAppointment: (data, consultantId ) => {
      console.log(`DataService.createAppointment()`);
      const url = `${process.env.REACT_APP_API_URL}/appointments/${consultantId}/create`;
      return axios.post(url,data);
    },

    updateAppointment: (data, consultantId, appointmentId ) => {
      console.log(`DataService.updateAppointment(${appointmentId})`);
      const url = `${process.env.REACT_APP_API_URL}/appointments/${consultantId}/${appointmentId}/edit`;
      return axios.put(url,data);
    },

    getFlowers: () => {
      console.log(`DataService.getFlowers()`);
      const url = `${process.env.REACT_APP_API_URL}/flowers`;
      return axios.get(url);
    },

    removeAppointment: (consultantId,appointmentId) => {
      console.log(`DataService.removeAppointment()`);
      const url = `${process.env.REACT_APP_API_URL}/appointments/${consultantId}/${appointmentId}/delete`;
      return axios.delete(url);
    },

  };
  
  export default DataService;
  