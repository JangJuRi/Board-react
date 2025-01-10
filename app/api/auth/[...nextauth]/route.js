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

                if (user) {
                    // Redis에 사용자 세션 저장
                    const sessionId = await customFetch('/auth/save', {
                        method: 'POST',
                        body: {
                            memberId: user.memberId,
                        }
                    });

                    return {...user, sessionId};

                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        // JWT에 sessionId와 memberId 저장
        async jwt({ token, user }) {
            if (user) {
                token.sessionId = user.sessionId;
                token.memberId = user.memberId;
            }
            return token;
        },
        // NextAuth 세션에 sessionId와 memberId 포함
        async session({ session, token }) {
            session.sessionId = token.sessionId;
            session.memberId = token.memberId;
            return session;
        },
    },
    jwt: {
        maxAge: 60 * 60 * 24 // 1일
    },
})

export { handler as GET, handler as POST }