import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
                role: credentials?.role,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          return data;
        } catch (error: any) {
          console.error("Auth error:", error);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          role: user.role,
        };
      }

      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
});
