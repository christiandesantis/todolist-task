import { Todo } from "@/app/types/todo";

interface TodoItemProps {
  todo: Todo;
  borderBottom?: boolean;
  onDelete: (id: number) => void;
  onEdit: (editId: number) => void;
}

export default function TodoItem({todo, borderBottom = false, onDelete, onEdit}: TodoItemProps) {
  return (
    <div key={todo.id} className={`px-4 py-6 border-gray-300 ${borderBottom ? 'border-b-2' : ''}`}>
      <h2 className="font-bold text-lg">{todo.title}</h2>
      <p>{todo.description}</p>
      <button className="bg-red-500 text-white p-2 rounded-md mt-2" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
      <button className="bg-yellow-500 text-white p-2 rounded-md mt-2 ml-2" onClick={() => onEdit(todo.id)}>
        Edit
      </button>
    </div>
  );
}
