import React, { Component } from 'react';
import './item-add-form.css';

export default class itemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      //label: e.target.value.toUpperCase()
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addItem(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {

    return (
      <form className="item-add-form"
        onSubmit={this.onSubmit}>
        <input type="text"
          className="form-control"
          onChange={this.onLabelChange}
          value={this.state.label}
          placeHolder="What need to be done" />
        <button className="btn btn-outline-secondary"
          type="submit">
          Add task</button>
      </form>
    )
  }
}