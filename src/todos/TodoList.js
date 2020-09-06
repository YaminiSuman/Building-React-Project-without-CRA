import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  loadTodos,
  removeTodoRequest,
  markTodoCompleteRequest
} from "./thunks";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos
} from "./selectors";
import TodoListItem from "./TodoListItem";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

const TodoList = ({
  completedTodos,
  incompletedTodos,
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
      <h3>Incomplete:</h3>
      {incompletedTodos.map(todo => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          markTodoAsCompleted={markTodoAsCompleted}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map(todo => (
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
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompletedTodos: getIncompleteTodos(state)
});
const mapDispatchToProps = dispatch => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  markTodoAsCompleted: id => dispatch(markTodoCompleteRequest(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
