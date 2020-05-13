import React from 'react';
import './item-add-form.css';

export default function AddItemField ({ addItem }) {
  return (
    <div className="item-add-form">
      <input type="text" className=""/>
      <button className="btn btn-outline-secondary"
              type="button" 
              onClick={() => addItem('Yes')}>Add task</button>
    </div>
  )
}