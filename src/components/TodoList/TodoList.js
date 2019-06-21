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
    this.getTodos()
  }
  
  getTodos = () => {
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
    
    // create new todo object to add to SQL DB
    const newTodo = {
      todoText: this.state.todoInput,
      isActive: 1
    }
    // add new todo object to SQL DB
    axios.post("/api/todos/add", newTodo)
      .then(res => {
        console.log(`add todo post res: ${JSON.stringify(res.data)}`)
        
        this.getTodos()
      })
      .catch(err => console.error(err))
    
    // reset form field to blank
    this.setState({ todoInput: "" })
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
