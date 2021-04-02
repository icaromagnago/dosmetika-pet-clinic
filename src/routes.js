import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Appointment from './pages/Appointment';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/appointment" component={Appointment} />
      </Switch>
    </BrowserRouter>
  );
}
