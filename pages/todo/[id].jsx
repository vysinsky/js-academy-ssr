import Link from 'next/link';
import React from 'react';
import TodoItem from '../../src/components/TodoItem';

const loadTodo = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return res.json();
};

function TodoDetail({ todo }) {
  return (
    <>
      <Link href="/">
        <a>Back</a>
      </Link>
      <br />
      <TodoItem id={todo.id} title={todo.title} completed={todo.completed} handleTodoClick={() => {}} />
    </>
  )
}

TodoDetail.getInitialProps = async (props) => {
  const todo = await loadTodo(props.query.id);

  return {
    todo
  }
};

export default TodoDetail;
