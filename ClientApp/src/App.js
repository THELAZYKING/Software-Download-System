import React from 'react';
import Form from "./Component/Form";
import Error from "./Component/Error";
import TLForm from "./Component/TLForm";
import NSDForm from "./Component/NSDForm";
import HomePage from "./Component/Home";
import NSDHome from "./Component/NSDHome";
import './App.css';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/MakeRequest" component={Form} />
        <Route path="/NSDHome" component={NSDHome} />
        <Route path="/TL/:id" component={TLForm} />
        <Route path="/NSD/:id" component={NSDForm} />
        <Route path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
