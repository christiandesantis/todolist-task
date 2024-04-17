import { useTodos } from '@/app/context/TodoContext';
import { Todo } from '@/app/types/todo';

const useTodoOperations = () => {
  const { todos, setTodos } = useTodos();
  const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST || 'http://localhost'}:${process.env.NEXT_PUBLIC_SERVER_PORT || '3000'}`

  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${baseUrl}/todo`);
    return response.json();
  };

  const loadTodos = async () => {
    try {
      const response = await fetch(`${baseUrl}/todo`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = async (todo: { title: string, description?: string }) => {
    try {
      const response = await fetch(`${baseUrl}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      setTodos(prevTodos => [...prevTodos, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(`${baseUrl}/todo/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      setTodos(prevTodos => prevTodos.map(todo => todo.id === updatedTodo.id ? data : todo));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${baseUrl}/todo/${id}`, {
        method: 'DELETE',
      });
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return { todos, fetchTodos, loadTodos, createTodo, updateTodo, deleteTodo };
};

export default useTodoOperations;