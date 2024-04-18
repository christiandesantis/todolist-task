'use client';
import { useState } from 'react';
import { TodoProvider } from '@/app/context/TodoContext';
import TodoList from '@/app/components/TodoList';
import TodoForm from '@/app/components/TodoForm';
import MainHeader from '@/app/components/MainHeader';
import AppBar from '@/app/components/AppBar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  // State to store the id of the todo being edited
  const [editId, setEditId] = useState<number | null>(null);
  const { data: session} = useSession();

  return (
    <TodoProvider>
      <AppBar />
      <main className="flex flex-col items-center justify-center px-24 h-screen">
        <MainHeader />
        {
          session && session.user ? (
            <div className="flex flex-col w-full max-w-5xl items-center justify-between font-mono text-sm">
              <TodoForm editId={editId} onClearEdit={() => setEditId(null)} />
              <TodoList onEdit={(id: number) => setEditId(id)} />
            </div>
          ) : (
            <> </>
          )
        }
        
      </main>
    </TodoProvider>
  );
}
