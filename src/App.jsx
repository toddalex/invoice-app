import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import CreateInvoice from './components/CreateInvoice';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>INVOICE APP</h1>
        <Switch>
          <Route exact path='/' component={InvoiceList} />
          <Route path='/invoice' component={CreateInvoice} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
