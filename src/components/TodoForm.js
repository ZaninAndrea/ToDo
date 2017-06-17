import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Input } from 'antd';


class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      text: "",
      addTodo:props.addTodo
    }
    this.apiUrl = 'http://59453f31cf46400011a8129d.mockapi.io/todo'
    this.onKeyDown=this.onKeyDown.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  
  onKeyDown = (event) => {
    console.log(event)
    if (event.keyCode === 13){
      this.state.addTodo(input.value);
      input.value = '';
    }
  }
  
  onChange = (value) => {
    this.setState({"text":value});
  }
  
  render(){
    let input;
    
    
    return (
      <div className="TodoForm">
        <Input
          value={this.state.text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Write a todo here ;)"/>
      </div>
    );
  }
}
export default TodoApp;
