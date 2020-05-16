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
    ],
    searchString: '',
    filter: 'all'
  };

  onSearchChange = (searchString) => {
    this.setState({ searchString })
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  filter = (items, filter) => {

    switch (filter) {
      case 'all':
        return items;
      case 'done':
        return items.filter((item) => item.done === true);
      case 'active':
        return items.filter((item) => item.done === false);
      default:
        return items;
    }
  }

  search = (items, searchString) => {
    if (searchString.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(searchString.toLowerCase()) > -1;
    });
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.idMax++
    }
  }

  deleteItem = (id) => {

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
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

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

    const { todoData, searchString, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, searchString), filter);
      
    const doneCount = todoData
                      .filter((el) => el.done === true).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter onFilterChange={this.onFilterChange}
                            filter={filter}/>
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}


console.log(Component)
