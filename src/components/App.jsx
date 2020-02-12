import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../state';
import TodoList from './TodoList';

function App(props) {
  useEffect(() => {
    props.loadTodos();
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
};

export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
