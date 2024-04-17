import React, { createContext, useState, useContext } from 'react';
import { Todo } from '@/app/types/todo';

interface TodoContextProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// Create a context
const TodoContext = createContext<TodoContextProps | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

// Create a provider component
export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

// Create a custom hook to use the context
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}