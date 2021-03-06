import React from 'react';

export default function TodoItem({ title, completed, handleTodoClick }) {
  return (
    <li
      onClick={handleTodoClick}
      className={`ph3 pv2 bb b--light-silver${completed ? ' strike' : ''}`}
    >
      {title}
    </li>
  );
}
