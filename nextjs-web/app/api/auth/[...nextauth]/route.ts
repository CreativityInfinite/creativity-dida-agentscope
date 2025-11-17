import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { randomString } from '@/lib/tool';

const handler = NextAuth({
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: { params: { prompt: 'select_account consent' } }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: { params: { scope: 'read:user user:email' } }
    }),
    CredentialsProvider({
      name: 'Email Code',
      credentials: {
        email: { label: 'Email', type: 'email' },
        token: { label: 'Token', type: 'text' }
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const token = credentials?.token as string;
        if (!email || !token) return null;
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any;
          if (!decoded?.email || decoded.email !== email) return null;
          let user = await prisma.user.findUnique({ where: { email } });
          const name = 'User_' + randomString(6);
          if (!user) user = await prisma.user.create({ data: { email, name } });
          return { id: user.id, name: user.name ?? null, email: user.email, image: user.avatarUrl ?? undefined };
        } catch {
          return null;
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        const email = (profile as any)?.email ?? user?.email;
        // 仅在有邮箱时落库（Google 一般都会返回邮箱）
        if (!email) return true;

        await prisma.user.upsert({
          where: { email },
          update: {
            name: (profile as any)?.name ?? user?.name ?? undefined,
            provider: account?.provider ?? undefined,
            providerAccountId: (account as any)?.providerAccountId ?? undefined,
            avatarUrl: (profile as any)?.picture ?? (profile as any)?.image ?? (profile as any)?.avatar_url ?? undefined,
            lastLoginAt: new Date()
          },
          create: {
            email,
            name: (profile as any)?.name ?? user?.name ?? undefined,
            provider: account?.provider ?? undefined,
            providerAccountId: (account as any)?.providerAccountId ?? undefined,
            avatarUrl: (profile as any)?.picture ?? (profile as any)?.image ?? (profile as any)?.avatar_url ?? undefined,
            lastLoginAt: new Date()
          }
        });

        return true;
      } catch (err) {
        // 发生错误时允许登录，但你也可以选择返回 false 阻止登录
        console.error('[NextAuth signIn] upsert user failed:', err);
        return true;
      }
    },
    async jwt({ token, account, profile, user }) {
      // OAuth 登录时合并基本信息
      if (account && profile) {
        token.provider = account.provider;
        token.name = profile.name as string | undefined;
        token.email = profile.email as string | undefined;
        token.picture = ((profile as any).picture ?? (profile as any).image ?? (profile as any).avatar_url) as string | undefined;
      }
      // 邮箱验证码（credentials）登录时使用 authorize 返回的用户
      if (user) {
        token.provider = token.provider ?? 'credentials';
        token.name = (user as any).name ?? token.name;
        token.email = (user as any).email ?? token.email;
        token.picture = ((user as any).image ?? (user as any).avatarUrl ?? token.picture) as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 token 中的信息暴露到 session，前端更易读取
      if (session.user) {
        session.user.name = (token as any).name ?? session.user.name;
        session.user.email = (token as any).email ?? session.user.email;
        (session.user as any).picture = (token as any).picture;
        (session as any).provider = (token as any).provider;
      }
      return session;
    }
  }
  // 你可以按需定制 pages.signIn 指向自定义登录页，这里留默认即可
});

export { handler as GET, handler as POST };
