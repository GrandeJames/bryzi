import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [github, google],
  callbacks: {
    signIn({ user }) {
      console.log("signIn user:", user);

      const { id, name, email } = user;

      try {
        fetch(`${process.env.API_URL}/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, email }),
        });
      } catch (error) {
        console.error("Error: ", error);
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
