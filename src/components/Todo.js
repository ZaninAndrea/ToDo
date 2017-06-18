import React from 'react';
import { Checkbox, Button } from 'antd';
import TodoForm from './TodoForm.js';

class Todo extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      hovered: false,
      edit:false,
      editTodo:props.editTodo,
      todo: props.todo,
      remove: props.remove
    }
    this.hover = this.hover.bind(this);
    this.onClick = this.onClick.bind(this);
    this.submitCallback = this.submitCallback.bind(this);
  }

  componentWillReceiveProps(props) {
      this.setState({
        editTodo:props.editTodo,
        todo: props.todo,
        remove: props.remove});
  }

  hover = (hovered) => {
    this.setState({"hovered":hovered});
  }

  onClick = () => {
    this.setState({edit:true});
  }

  submitCallback = () => {
    this.setState({edit:false});
  }

  render(){
    if (this.state.edit){
      return <TodoForm addTodo={this.state.editTodo} text={this.state.todo.text} todoId={this.state.todo.id} submitCallback={this.submitCallback}/>;
    }
    else{
      var editPencil = this.state.hovered ? <Button onClick={this.onClick}><i className="fa fa-pencil" aria-hidden="true"></i></Button> : ""
      return <li><Checkbox className="Todo" onChange={()=>this.state.remove(this.state.todo.id)}
                                            onMouseEnter={()=>{this.hover(true)}}
                                            onMouseLeave={()=>{this.hover(false)}}>
                    {this.state.todo.text}
                    {editPencil}
                  </Checkbox></li>;
    }
  }
}

export default Todo;
