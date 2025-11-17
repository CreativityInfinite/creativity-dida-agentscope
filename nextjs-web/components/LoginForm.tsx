'use client';

import AppleSvg from '@asset/icons/apple.svg';
import GoogleSvg from '@asset/icons/google.svg';
import GithubSvg from '@asset/icons/github.svg';
import WechatSvg from '@asset/icons/wechat.svg';

import * as React from 'react';
import { cn } from '@component/lib/utils';
import { defaultLogo } from '@constant/base.constant';
import { Button } from '@component/ui/button';
import { Input } from '@component/ui/input';
import { Label } from '@component/ui/label';
import { getMessages } from '@i18n/index';
import { signIn } from 'next-auth/react';

export function LoginForm({ className, locale, ...props }: React.ComponentPropsWithoutRef<'div'> & { locale: string }) {
  const messages = getMessages(locale);
  const t = messages.auth?.signin;
  const brand = messages.brand || defaultLogo.title;

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<'send-code' | 'verify-and-login'>('send-code');
  const [verificationToken, setVerificationToken] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      // 发送验证码
      if (step === 'send-code') {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, loginMethod: 'code' })
        });
        const data = await res.json();
        if (res.ok && data.Code === 0 && data?.Data?.verificationToken) {
          setVerificationToken(data?.Data?.verificationToken);
          setStep('verify-and-login');
          setMessage('验证码已发送到您的邮箱，请输入验证码完成登录。');
        } else {
          setMessage(data?.error || data?.Message || '验证码发送失败，请稍后重试');
        }
      }

      // 验证验证码
      else {
        if (!verificationToken) {
          setMessage('验证码令牌缺失，请重新发送验证码');
        } else {
          const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, verificationCode: code, verificationToken, loginMethod: 'code' })
          });
          const data = await res.json();
          if (res.ok && data.Code === 0 && data?.Data?.token) {
            setMessage('登录成功，正在跳转...');
            await handleCredentialSignIn(email, data.Data.token);
          } else {
            setMessage(data?.error || data?.Message || '登录失败，请稍后重试');
          }
        }
      }
    } catch {
      setMessage('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => signIn('google', { callbackUrl: `/` });
  const handleGithubSignIn = () => signIn('github', { callbackUrl: `/` });
  const handleCredentialSignIn = (email: string, token: string) => signIn('credentials', { email, token, callbackUrl: `/` });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">{t?.title?.replace('{brand}', brand) || `Welcome to ${brand}`}</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">{t?.emailLabel || 'Email'}</Label>
              <Input id="email" name="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required disabled={!!verificationToken} />
            </div>
            {step === 'verify-and-login' && (
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input id="code" name="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-digit code" required />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (step === 'send-code' ? 'Sending...' : 'Logging in...') : step === 'send-code' ? 'Send verification code' : t?.login || 'Login'}
            </Button>
            {message && <div className="text-center text-xs text-muted-foreground">{message}</div>}
          </div>
        </div>
      </form>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">{t?.or || 'Or'}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" className="w-full" onClick={handleGithubSignIn}>
          <GithubSvg className="size-4" />
          {t?.github || 'Continue with Github'}
        </Button>
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
          <GoogleSvg className="size-3" />
          {t?.google || 'Continue with Google'}
        </Button>
      </div>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
        {t?.terms || 'By clicking continue, you agree to our'}
        <a className="mx-1 hover:text-primary" href="/legal/terms">
          {t?.tos || 'Terms of Service'}
        </a>
        {t?.and || 'and'}
        <a className="mx-1 hover:text-primary" href="/legal/privacy">
          {t?.privacy || 'Privacy Policy'}
        </a>
      </div>
    </div>
  );
}
