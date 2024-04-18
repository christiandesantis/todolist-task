'use client';
import { useSession } from 'next-auth/react';
import AppBar from '@/app/components/AppBar';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { data: session} = useSession();

  const router = useRouter();

  if (!session) {
    router.replace('/api/auth/signin');
  }

  return (
    <>
      <AppBar />
      <main className="flex flex-col items-center justify-center px-24 h-screen">
        <h1 className="text-3xl font-bold mb-10">Profile Info</h1>
        {
          session && session.user ? (
            <div className="flex flex-col w-full max-w-5xl items-center justify-between font-mono text-sm">
              <p className="text-lg">Name: {session.user.name}</p>
              <p className="text-lg">Lastname: {session.user.lastname}</p>
              <p className="text-lg">Username: {session.user.username}</p>
              <p className="text-lg">Email: {session.user.email}</p>
            </div>
          ) : (
            <> </>
          )
        }
      </main>
    </>
  );
}
