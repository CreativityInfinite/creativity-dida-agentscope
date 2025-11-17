import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { createLogger } from './logger';

const log = createLogger('VerificationService');

// 验证码相关配置
const VERIFICATION_CODE_EXPIRY = 10 * 60 * 1000; // 10 minutes
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface VerificationData {
  email: string;
  code: string;
  type: 'signup' | 'signin' | 'reset';
  expiresAt: number;
}

// 生成6位数字验证码
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 创建验证码令牌
export function createVerificationToken(email: string, code: string, type: 'signup' | 'signin' | 'reset' = 'signup'): string {
  const data: VerificationData = { email, code, type, expiresAt: Date.now() + VERIFICATION_CODE_EXPIRY };
  return jwt.sign(data, JWT_SECRET, { expiresIn: '10m' });
}

// 验证验证码令牌
export function verifyVerificationToken(token: string, email: string, code: string): { valid: boolean; data?: VerificationData; error?: string } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as VerificationData;
    // 检查邮箱是否匹配
    if (decoded.email !== email) return { valid: false, error: 'Email mismatch' };
    // 检查验证码是否匹配
    if (decoded.code !== code) return { valid: false, error: 'Invalid verification code' };
    // 检查是否过期
    if (Date.now() > decoded.expiresAt) return { valid: false, error: 'Verification code expired' };
    return { valid: true, data: decoded };
  } catch (error) {
    log.error('Token verification failed:', error);
    return { valid: false, error: 'Invalid token' };
  }
}

// 生成安全的随机字符串
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// 哈希密码
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// 验证密码
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}
