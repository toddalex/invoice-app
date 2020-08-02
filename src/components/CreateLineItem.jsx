import React, {useState} from 'react';
import Icon from '@material-ui/core/Icon';

const CreateLineItem = ({ email, addLineItem}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleLineItemAdd = async (e) => {
    e.preventDefault();
    const body = { description, amount, email}
    try {
      await fetch('http://localhost:8080/lineitems', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      addLineItem(body)
    } catch (err) {
      console.error(err.message); 
    }  
  };

  return (
    <div className="line-item-wrapper">
      <div className="line-item-input">
        <label className="input-label">Description</label>
        <input 
          type="text" 
          name="description" 
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </div>
      <div className="line-item-input">
        <label className="input-label">Amount</label>
        <input 
          type="number" 
          name="amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
      </div>
      <Icon 
        style={{ color: 'blue', fontSize: 30, cursor: 'pointer'}}
        onClick={handleLineItemAdd}
      >add_circle</Icon>
    </div>
  );
}

export default CreateLineItem;