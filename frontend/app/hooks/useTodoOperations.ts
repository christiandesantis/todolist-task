import { useTodos } from '@/app/context/TodoContext';
import { Todo } from '@/app/types/todo';
import { useSession } from 'next-auth/react';

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_HOST || 'http://localhost'}:${process.env.NEXT_PUBLIC_SERVER_PORT || '3000'}`;

const useTodoOperations = () => {
  const { todos, setTodos } = useTodos();
  const { data: session } = useSession();
  const authorization = `Bearer ${session?.accessToken}`;
  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(`${BASE_URL}/todo`, {
      method: 'GET',
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    
    });
    return response.json();
  };

  const loadTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'GET',
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      
      });
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = async (todo: { title: string, description?: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/todo`, {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      setTodos(prevTodos => [data, ...prevTodos]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(`${BASE_URL}/todo/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          Authorization: authorization,
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
      await fetch(`${BASE_URL}/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorization,
        }
      });
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return { todos, fetchTodos, loadTodos, createTodo, updateTodo, deleteTodo };
};

export default useTodoOperations;