import React from 'react';
import { Input, DatePicker, Button } from 'antd';
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

class TodoApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    var text = props.text ? props.text : "";
    var todoId = props.todoId ? props.todoId : "";
    var submitCallback= props.submitCallback ? props.submitCallback : (()=>{return})
    this.state = {
      text: text,
      addTodo:props.addTodo,
      todoId: todoId,
      submitCallback: submitCallback
    }
    this.onKeyDown=this.onKeyDown.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onDateChange=this.onDateChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(props) {
    var text = props.text ? props.text : "";
    var todoId = props.todoId ? props.todoId : "";
    var submitCallback= props.submitCallback ? props.submitCallback : (()=>{return})
    this.state = {
      text: text,
      addTodo:props.addTodo,
      todoId: todoId,
      submitCallback: submitCallback
    }
  }

  submit = () => {
    if (this.state.id===""){
      this.state.addTodo(this.state.text, this.state.due);
      this.setState({"text":""});
    }
    else{
      this.state.addTodo(this.state.text, this.state.due, this.state.todoId);
      this.setState({"text":""});
    }

    this.state.submitCallback();
  }
  onKeyDown = (event) => {
    if (event.keyCode === 13){
      this.submit()
    }
  }

  onChange = (event) => {
    this.setState({"text":event.target.value});
  }

  onDateChange = (dateMoment, dateString) => {
    this.setState({"due":dateMoment._d.getTime()});
  }

  renderExtraFooter = () =>{
    return <ButtonGroup>
      <Button>Today</Button>
      <Button>Tomorrow</Button>
      <Button>Next week</Button>
      <Button>in 1 month</Button>
    </ButtonGroup>
  }

  render(){
    return (
      <div className="TodoForm">
        <InputGroup compact>
          <Input
            value={this.state.text}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder="Write a todo here ;)"
            style={{ width: '70%' }}/>
          <DatePicker onChange={this.onDateChange} renderExtraFooter={this.renderExtraFooter}/>
        </InputGroup>
      </div>
    );
  }
}
export default TodoApp;
