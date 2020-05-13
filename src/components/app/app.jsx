import React, { Component } from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form';
import '../../index.css';

export default class App extends Component {

  idMax = 1;
  idData = new Set([1, 2, 3]);

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) { //Не работает стрелочная функция
    return {
      label,
      important: false,
      done:false,
      id: this.idMax++
    }
  }

  deleteItem = (id) => { // стрелочной функции нет в прототипе класса
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]

      this.idData.delete(id)

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

  onToggleImportant = (id) => {
    this.state(({ todoData }) => {
      const newObj = todoData
      return {
        toDoData: '2'
      }
    })   
  }

  onToggleDone = (id) => {
    console.log('Toggle done', id)
  }

  render() {
    return (
      <div className="todo-app" >
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}


console.log(App)
