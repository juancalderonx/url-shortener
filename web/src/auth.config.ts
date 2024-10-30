import { type NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    providers: [
        credentials({
            async authorize(credentials) {
                try {
                    if (!credentials.email || !credentials.password) {
                        return null;
                    }

                    const email = credentials.email as string;
                    const password = credentials.password as string;

                    console.log({ email, password });

                    // Here you can make a request to your API to validate the credentials

                    return { id: "1", name: "John Doe", email: "jhon@doe.com" };
                } catch (error) {
                    throw error;
                }
            },
        }),
    ]
}