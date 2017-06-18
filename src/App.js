import React from 'react';
import axios from 'axios';
import './App.css';
import 'antd/dist/antd.css';
import TodoForm from './components/TodoForm.js';
import Todo from './components/Todo.js';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const TodoList = ({todos, remove, editTodo}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} editTodo={editTodo}/>)
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
    this.addTodo= this.addTodo.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.editTodo = this.editTodo.bind(this)
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
  addTodo(val, due){
    // Assemble data
    const todo = {text: val, due: due}
    // Update data
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }

  editTodo(val, due, id){
    // Assemble data
    const todo = {text: val, due: due}

    // Update data
    axios.put(this.apiUrl+'/'+id, todo)
       .then((res) => {
         // find and replace old todo
          const updated = this.state.data.map((todo) => {
            if(todo.id !== id){
              return todo;
            }
            else{
              return res.data
            }
          });
          this.setState({data: updated});
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
      <LocaleProvider locale={enUS}>
        <div className="TodoApp">
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove}
          editTodo={this.editTodo}
        />
      </div>
    </LocaleProvider>
    );
  }
}
export default TodoApp;
