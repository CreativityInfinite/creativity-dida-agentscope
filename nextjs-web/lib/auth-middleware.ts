import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { createLogger } from './logger';

const log = createLogger('AuthMiddleware');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface AuthUser {
  userId: string;
  email: string;
}

// 验证 JWT token
export function verifyAuthToken(token: string): { valid: boolean; user?: AuthUser; error?: string } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return { valid: true, user: decoded };
  } catch (error) {
    log.error('Token verification failed:', error);
    return { valid: false, error: 'Invalid token' };
  }
}

// 从请求中提取用户信息
export function getUserFromRequest(request: NextRequest): { user?: AuthUser; error?: string } {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No authorization header' };
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  const verification = verifyAuthToken(token);

  if (!verification.valid) {
    return { error: verification.error };
  }

  return { user: verification.user };
}

// 生成新的 JWT token
export function generateAuthToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
}
