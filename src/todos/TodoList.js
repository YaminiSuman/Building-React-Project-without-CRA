import React from "react";
import { connect } from "react-redux";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import { removeTodo, markTodoAsCompleted } from "./actions";

const TodoList = ({ todos = [], onRemovePressed, markTodoAsCompleted }) => (
  <div className="list-wrapper">
    <NewTodoForm />
    {todos.map(todo => (
      <TodoListItem
        todo={todo}
        onRemovePressed={onRemovePressed}
        markTodoAsCompleted={markTodoAsCompleted}
      />
    ))}
  </div>
);

const mapStateToProps = state => ({
  todos: state.todos
});
const mapDispatchToProps = dispatch => ({
  onRemovePressed: text => dispatch(removeTodo(text)),
  markTodoAsCompleted: text => dispatch(markTodoAsCompleted(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
