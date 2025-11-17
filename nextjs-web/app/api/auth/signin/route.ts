import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerificationCode, verifyEmailConfig } from '@/lib/email';
import { generateVerificationCode, createVerificationToken, verifyVerificationToken } from '@/lib/verification';
import { createLogger } from '@/lib/logger';
import { R } from '@/lib/R';
import jwt from 'jsonwebtoken';
import { randomString } from '@/lib/tool';

const log = createLogger('SigninController');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, verificationCode, verificationToken, loginMethod } = body;

    // 验证码登录 - 发送验证码
    if (loginMethod === 'code' && !verificationCode) {
      if (!email) return R.error('INVALID_EMAIL', 'Email address cannot be empty');
      const emailConfigValid = await verifyEmailConfig();
      if (!emailConfigValid) {
        log.error('Email configuration is invalid');
        return R.error('EMAIL_SERVICE_UNAVAILABLE', 'Email service is temporarily unavailable, please try again later');
      }
      const code = generateVerificationCode();
      const token = createVerificationToken(email, code, 'signin');
      const emailSent = await sendVerificationCode(email, code, 'signin');
      if (!emailSent) return R.error('VERIFICATION_SEND_FAILED', 'Verification code sending failed, please try again later');
      log.info(`Login verification code ${code} sent to ${email}`);
      return R.ok({ message: 'Verification code has been sent to your email', verificationToken: token });
    }

    // 验证码登录 - 验证并登录
    if (loginMethod === 'code' && verificationCode) {
      if (!email || !verificationCode || !verificationToken) return R.error('MISSING_PARAMS', 'Missing required parameters');
      const verification = verifyVerificationToken(verificationToken, email, verificationCode);
      if (!verification.valid) return R.error('INVALID_VERIFICATION', 'Invalid or expired verification code');
      let user = await prisma.user.findUnique({ where: { email } });
      const name = 'User_' + randomString(6);
      if (!user) user = await prisma.user.create({ data: { email, name } });
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      log.info(`User signed in with code successfully: ${user.id}`);
      const { passwordHash: _, ...userWithoutPassword } = user;
      return R.ok({ message: 'Sign in successful', user: userWithoutPassword, token });
    }

    return R.error('INVALID_LOGIN_METHOD', 'Invalid login method (only email code and OAuth supported)');
  } catch (error) {
    log.error('Signin error:', error);
    return R.error('SIGNIN_FAILED', 'Sign in failed, please try again later');
  }
}
