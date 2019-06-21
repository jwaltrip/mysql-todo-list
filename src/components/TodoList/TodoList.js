import React from "react"
import "./TodoList.css"

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoInput: ""
    };
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
  
  listTodos = () => {
    return this.state.todos.map((todo, idx) => {
      return <li key={`todo-${idx}`}>{todo}</li>
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
