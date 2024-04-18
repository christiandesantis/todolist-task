import { useTodos } from '@/app/context/TodoContext';
import TodoItem from '@/app/components/TodoItem';
import useTodoOperations from '@/app/hooks/useTodoOperations';
import { useEffect } from 'react';

interface TodoListProps {
  onEdit: (editId: number) => void;
}

export default function TodoList({ onEdit }: TodoListProps) {
  // Todo Operations Hook & Context
  const { todos, loadTodos, deleteTodo } = useTodoOperations();

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {todos.length > 0 ? (
        <div className="border-2 border-gray-300 p-2 rounded-md w-full bg-white dark:bg-gray-800">
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} borderBottom={todos.length !== index + 1} onDelete={() => deleteTodo(todo.id)} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <p>No todos yet.</p>
      )}
    </>
  );
}
