'use client';
import { useState } from 'react';
import { TodoProvider } from '@/app/context/TodoContext';
import TodoList from '@/app/components/TodoList';
import TodoForm from '@/app/components/TodoForm';
import MainHeader from '@/app/components/MainHeader';

export default function Home() {
  // State to store the id of the todo being edited
  const [editId, setEditId] = useState<number | null>(null);

  return (
    <TodoProvider>
      <main className="flex flex-col items-center justify-center p-24 h-screen">
        <MainHeader />
        <div className="flex flex-col w-full max-w-5xl items-center justify-between font-mono text-sm">
          <TodoForm editId={editId} onClearEdit={() => setEditId(null)} />
          <TodoList onEdit={(id: number) => setEditId(id)} />
        </div>
      </main>
    </TodoProvider>
  );
}
