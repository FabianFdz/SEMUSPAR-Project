import NextAuth, { Awaitable, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (profile)
        return (
          profile.email?.endsWith("@emuspar.com") ||
          profile.email === "fdzfabian@gmail.com"
        );
      return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
});

export { handler as GET, handler as POST };
