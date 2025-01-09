import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import customFetch from "@/api/customFetch";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                accountId: { label: "accountId", type: "text", placeholder: "아이디를 입력해주세요." },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await customFetch('/member/login', {
                    method: 'POST',
                    body: {
                        accountId: credentials.accountId,
                        password: credentials.password
                    }
                })

                console.log(user)

                if (user) {
                    return user;

                } else {
                    return null;
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }