import React from "react"
import axios from "axios"
import "./TodoList.css"

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoInput: ""
    };
  }
  
  componentDidMount() {
    axios.get("/api/todos")
      .then(res => {
        console.log(`all todo res data: ${JSON.stringify(res.data)}`)
        this.setState({ todos: res.data })
      })
      .catch(err => console.error(err))
  }
  
  handleTextChange = (e) => {
    e.preventDefault()
    this.setState({ todoInput: e.target.value })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      todos: [...prevState.todos, prevState.todoInput],
      todoInput: ""
    }))
  }
  
  handleRemoveTask = (idx) => {
    const newState = {...this.state}
    newState.todos.splice(idx, 1)
    this.setState(newState)
  }
  
  listTodos = () => {
    return this.state.todos.map((todo, idx) => {
      return <li key={`todo-${todo.id}`}>{todo.todoText} - <button onClick={() => {this.handleRemoveTask(idx)}}>X</button></li>
    })
  }

  render() {
    return (
      <div className="todo-container">
        <h2>MySQL Todo List</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.todoInput}
            onChange={this.handleTextChange}
            placeholder="Add todo item..."
            className="todo-input"
          />
          
          <button onSubmit={this.handleSubmit} className="todo-submit">Add Task</button>
        </form>
        
        <ol className="todo-list">
          {this.listTodos()}
        </ol>
      </div>
    );
  }
}

export default TodoList;
