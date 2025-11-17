import { NextRequest } from 'next/server';
import { createLogger } from '@/lib/logger';
import { R } from '@/lib/R';

const log = createLogger('LogoutController');

export async function POST(request: NextRequest) {
  try {
    // 由于我们使用 JWT，登出主要是客户端删除 token
    // 这里可以添加服务端的登出逻辑，比如将 token 加入黑名单

    log.info('User logged out');
    return R.ok({ message: 'Logout successful' });
  } catch (error) {
    log.error('Logout error:', error);
    return R.error('LOGOUT_FAILED', 'Logout failed');
  }
}
