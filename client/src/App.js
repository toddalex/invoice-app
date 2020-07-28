import React from 'react';
import InvoiceForm from './components/InvoiceForm'
import InvoiceList from './components/InvoiceList'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>INVOICE APP</h1>
        <button type="submit">Create Inovice</button>
        <InvoiceForm />
        <InvoiceList />
      </header>
    </div>
  );
}

export default App;
