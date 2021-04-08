import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Success from './pages/Success';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/appointment" component={Appointment} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  );
}
