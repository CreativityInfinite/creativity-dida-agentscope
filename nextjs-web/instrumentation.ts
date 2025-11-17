export const runtime = 'nodejs';

export async function register() {
  // 只在 Node.js 环境中运行
  if (typeof window !== 'undefined') return;
  if (typeof process === 'undefined') return;
  if (!(process as any).versions?.node) return;

  try {
    const { registerCrons, stopCrons } = await import('@/lib/cron.server');

    // 在应用启动时注册所有 cron 任务
    registerCrons();
    setTimeout(async () => {
      stopCrons();
    }, 10000);
  } catch (error) {
    console.error('Failed to register cron tasks:', error);
  }
}
