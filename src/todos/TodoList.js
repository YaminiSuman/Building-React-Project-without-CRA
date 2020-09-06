import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  loadTodos,
  removeTodoRequest,
  markTodoCompleteRequest
} from "./thunks";
import { getTodos, getTodosLoading } from "./selectors";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

const TodoList = ({
  todos = [],
  isLoading,
  onRemovePressed,
  markTodoAsCompleted,
  startLoadingTodos
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
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
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
  todos: getTodos(state),
  isLoading: getTodosLoading(state)
});
const mapDispatchToProps = dispatch => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  markTodoAsCompleted: id => dispatch(markTodoCompleteRequest(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
