import { randomUUID } from 'crypto';

// 等待
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 生成UUID
export const uuid = () => randomUUID();

// 生成随机字符串
export const randomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
