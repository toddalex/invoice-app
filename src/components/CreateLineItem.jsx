import React, {useState} from 'react';
import Icon from '@material-ui/core/Icon';
import '../App.css';

const CreateLineItem = ({ email, addLineItem }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  // creates a new line item in state and stores info in db
  const handleLineItemAdd = async (e) => {
    e.preventDefault();
    const body = { description, amount, email}
    try {
      await fetch('http://localhost:8080/lineitems', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      // reassigns line-items array in state with new line-item
      addLineItem(body)
    } catch (err) {
      console.error(err.message); 
    }  
  };

  return (
    <div className="line-item-container">
      <div className="line-item-wrapper">
        <div className="line-item-input">
          <label className="input-label">Description</label>
          <input 
            type="text" 
            name="description"
            className="description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div className="line-item-input">
          <label className="input-label">Amount</label>
          <input 
            type="number"
            step="0.01"
            name="amount"
            className="amount"
            value={amount}
            style={{textAlign: 'right'}}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
      </div>
      <Icon 
        className="addItemIcon"
        onClick={handleLineItemAdd}
      >add_circle</Icon>
    </div>
  );
}

export default CreateLineItem;

