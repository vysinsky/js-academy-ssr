import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../state';
import TodoList from './TodoList';

export function App(props) {
  useEffect(() => {
    if (!props.todos.length) {
      props.loadTodos();
    }
  }, []);

  if (props.loading) {
    return <h1>Loading</h1>;
  }

  return <TodoList items={props.todos} onItemClicked={props.toggleTodo} />;
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  loadTodos: actions.loadTodos,
  toggleTodo: actions.toggleTodo,
};

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
