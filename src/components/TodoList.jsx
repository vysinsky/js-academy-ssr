import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ items, onItemClicked, renderTodo }) {
  return (
    <>
      <h1 className="f1 bold center mw5">My TODOs</h1>
      <ul className="list pl0 ml0 center mw5 ba b--light-silver br3">
        {items.map(({ id, title, completed }) =>
          renderTodo ? (
            renderTodo({ id, title, completed }, onItemClicked)
          ) : (
            <TodoItem
              key={id}
              title={title}
              completed={completed}
              handleTodoClick={() => onItemClicked(id)}
            />
          ),
        )}
      </ul>
    </>
  );
}
