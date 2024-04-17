import { useState, useMemo, useEffect } from 'react';
import useTodoOperations from '@/app/hooks/useTodoOperations';
interface TodoFormProps {
  editId: number | null; // The id of the todo being edited
  onClearEdit: () => void; // Function to call when the edit is saved
}

export default function TodoForm({ editId, onClearEdit }: TodoFormProps) {
  // Todo Operations Hook & Context
  const { todos, createTodo, updateTodo } = useTodoOperations();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isFormEmpty = useMemo(() => !title.trim() && !description.trim(), [title, description]);

  // If the editId changes, update the form fields with the todo data
  useEffect(() => {
    if (editId) {
      const todo = todos.find((todo) => todo.id === editId);
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    }
  }, [editId, todos]);

  // Methods
  const addTodo = async () => {
    // setTodos([ { id: Date.now(), title, description }, ...todos]);
    await createTodo({ title, description });
  };
  const saveEdit = async () => {
    // setTodos(todos.map((todo) => (todo.id === editId ? { id: editId, title, description } : todo)));
    if (editId) await updateTodo({ id: editId, title, description });
    onClearEdit(); // Clear the editId in parent component
  };
  const clearForm = () => {
    setTitle('');
    setDescription('');
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId) await saveEdit();
    else await addTodo();
    clearForm();
  }
  const onCancelEdit = () => {
    clearForm();
    onClearEdit();
  }

  return (
    <form
      className="flex space-x-4 mb-8 my-10"
      onSubmit={onSubmit}
      >
      <button type="submit" style={{ display: 'none' }}></button>
      <input
        className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title *"
        required
      />
      <input
        className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {!isFormEmpty && !editId ? (
        <button className="w-20 bg-gray-500 text-white p-2 rounded-md" onClick={clearForm}>
          Clear
        </button>  
        ) : ('')
      }

      {editId ? (
        <button className="w-20 bg-gray-500 text-white p-2 rounded-md" onClick={onCancelEdit}>
          Cancel
        </button>  
        ) : ('')
      }

      <button type="submit" className={`w-20 text-white p-2 rounded-md ${editId ? 'bg-blue-500' : 'bg-green-500'}`}>
        { editId ? 'Save' : 'Add' }
      </button>
    </form>
  );
}
