import Link from 'next/link';
import React, { useState } from 'react';
import { App } from '../src/components/App';
import TodoItem from '../src/components/TodoItem';
import { toggleTodoState } from '../src/state';

const loadTodos = async (onLoadingFinished = () => {}) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  onLoadingFinished(data);
  return data;
};

function renderTodo(item, onItemClicked) {
  return (
    <TodoItem
      key={item.id}
      title={item.title}
      id={item.id}
      completed={item.completed}
      handleTodoClick={() => onItemClicked(item.id)}
    >
      <br />
      <Link href="/todo/[id]" as={`/todo/${item.id}`}>
        <a>Open detail (next way)</a>
      </Link>
      <br />
      <a href={`/todo/${item.id}`}>Open detail (server-side way)</a>
    </TodoItem>
  );
}

function IndexPage(props) {
  const [todos, setTodos] = useState(props.todos);
  return (
    <App
      todos={todos}
      loadTodos={() => loadTodos(setTodos)}
      renderTodo={renderTodo}
      toggleTodo={id => {
        setTodos(toggleTodoState(todos, id));
      }}
    />
  );
}

IndexPage.getInitialProps = async () => {
  const todos = await loadTodos();

  return {
    todos,
  };
};

export default IndexPage;
