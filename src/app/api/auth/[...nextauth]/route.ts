import NextAuth, { AuthOptions, Awaitable, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  callbacks: {
    async signIn({ profile }) {
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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
