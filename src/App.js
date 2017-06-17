import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Checkbox, Input } from 'antd';
import TodoForm from './components/TodoForm.js'

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li><Checkbox className="Todo" onChange={()=>remove(todo.id)}>{todo.text}</Checkbox></li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul className="TodoList">{todoNode}</ul>);
}

const Title = ({todoCount}) => {
  return (
       <div className="Title">
          <h1>to-do ({todoCount})</h1>
       </div>
  );
}
// Contaner Component
// Todo Id
window.id = 0;

class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'http://59453f31cf46400011a8129d.mockapi.io/todo'
  }
  // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data.todos});
      });
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {text: val}
    // Update data
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});      
      })
  }

  render(){
    // Render JSX
    return (
      <div className="TodoApp">
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList 
          todos={this.state.data} 
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}
export default TodoApp;
