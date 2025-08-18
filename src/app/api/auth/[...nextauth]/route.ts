import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers as needed
  ],
  callbacks: {
    async session({ session, token }) {
      // Customize session object
      console.log("Customize session object", session);

      return session;
    },
    async jwt({ token, user }) {
      // Customize JWT token
      console.log("Customize JWT token", token);

      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Optional: custom sign-in page
  },
});

export { handler as GET, handler as POST };
