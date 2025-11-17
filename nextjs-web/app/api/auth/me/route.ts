import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-middleware';
import { createLogger } from '@/lib/logger';
import { R } from '@/lib/R';
const log = createLogger('MeController');

export async function GET(request: NextRequest) {
  try {
    const { user: authUser, error } = getUserFromRequest(request);
    if (!authUser) return R.error('UNAUTHORIZED', error || 'Unauthorized');
    const user = await prisma.user.findUnique({ where: { id: authUser.userId } });
    if (!user) return R.error('USER_NOT_FOUND', 'User not found');
    return R.ok({ user });
  } catch (error) {
    log.error('Get user info error:', error);
    return R.error('INTERNAL_ERROR', 'Internal server error');
  }
}
