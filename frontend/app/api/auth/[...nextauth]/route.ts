import { NextAuthOptions, RequestInternal, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// For making http requests from server components, the backend's docker container name needs to be used as URL along with its inner port number
const DOCKER_BACKEND_URL = process.env.NEXT_PUBLIC_APP_DOCKER_BACKEND_URL || "http://todolist_backend_dev:3000"

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${DOCKER_BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
}

// Export the NextAuth options for using in server components
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_APP_AUTH_SECRET || "secret123",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req)  {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        try {
          const res = await fetch(`${DOCKER_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          if (res.status === 401) {
            console.log(res.statusText);
            return null;
          }
          const user = await res.json();
          return user;
        } catch (err) {
          console.error(`Fetch error: ${err}`);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.expiresIn)
        return token;
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresIn = token.expiresIn;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
