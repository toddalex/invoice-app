import React from 'react';
import Icon from '@material-ui/core/Icon';
import LineItem from './LineItem'

export default function LineItemList(props) {
  return (
  <div className="line-items-container">
    <LineItem />
    <Icon style={{ color: 'blue', fontSize: 30, cursor: 'pointer'}}>add_circle</Icon>
  </div>
  )
}