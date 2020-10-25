import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import Home from '../src/views/Home';
import Navigation from '../src/components/Navigation';
import History from '../src/views/History';
import NewAppointment from '../src/views/NewAppointment';
import NewConsultant from '../src/views/NewConsultant';

import { AppContextProvider } from './context/AppContext';

function App() {
  return (
    <>
      <AppContextProvider>
        <Router>
          <Navigation/>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/history' exact component={History}/>
            <Route path='/newAppointment' exact component={NewAppointment}/>
            <Route path='/newConsultant' exact component={NewConsultant}/>
          </Switch>
        </Router>
      </AppContextProvider>
    </>
  );
}

export default App;
