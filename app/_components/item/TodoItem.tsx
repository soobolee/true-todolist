'use client';

import {JSX} from 'react';

export type TodoItemProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  checked: boolean;
  onToggle: (id: string) => void;
};

const TodoItem = ({id, title, description, date, checked, onToggle}: TodoItemProps): JSX.Element => {
  return (
    <li className={'flex gap-5 border rounded p-3'}>
      <input
        type="checkbox"
        className={'w-7'}
        checked={checked}
        onChange={(): void => onToggle(id)}
      />
      <div>
        <span className={'text-lg font-semibold'}>{title}</span>
        <p className={'text-sm text-gray-600'}>{description}</p>
        <p className={'text-xs text-gray-400'}>{date}</p>
      </div>
    </li>
  );
};

export default TodoItem;