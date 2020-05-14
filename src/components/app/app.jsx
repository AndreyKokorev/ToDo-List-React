import React, { Component } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form';
import '../../index.css';

export default class App extends Component {

  idMax = 1;

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) { 
    console.log(this)//Не работает стрелочная функция
    return {
      label,
      important: false,
      done:false,
      id: this.idMax++
    }
  }

  deleteItem = (id) => { 
    console.log(this)// стрелочной функции нет в прототипе класса
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]

      return {
        todoData: newArray
      }
    })
  }

  addItem = (newTask) => {
    const newObj = this.createTodoItem(newTask);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newObj]
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return {
      todoData: [ 
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)]
    }
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {

      return this.toggleProperty(todoData, id, 'important')
    })   
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
    
      return this.toggleProperty(todoData, id, 'done')
    })   
  }

  render() {
    
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done === true).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}


console.log(Component)
