import cron, { ScheduledTask } from 'node-cron';
import { createLogger } from '@/lib/logger';

export interface CronTask {
  name: string;
  schedule: string;
  run: () => void | Promise<void>;
  options?: Parameters<typeof cron.schedule>[2];
}

const log = createLogger('Cron');
const runningTask: Record<string, ScheduledTask> = {};

// 全局单例守卫，避免重复注册（dev 热重载或多次调用）
declare global {
  var __CRON_INITIALIZED__: boolean | undefined;
}

// 你可以在这里集中配置多个定时任务：添加/删除/修改即可生效
// 提示：Next.js 开发模式下会热更新，已做单例守卫避免重复调度
export const cronTasks: CronTask[] = [
  {
    name: 'health-check1',
    schedule: '*/5 * * * * *',
    run: async () => {
      log.debug('Health check tick 1');
    }
  },
  {
    name: 'health-check2',
    schedule: '*/10 * * * * *',
    run: async () => {
      log.debug('Health check tick 2');
    }
  }
];

// 注册所有定时任务
export function registerCrons(extraTasks: CronTask[] = []): void {
  if (globalThis.__CRON_INITIALIZED__) {
    log.debug('Cron already initialized, skip scheduling.');
    return;
  }

  const tasks = [...cronTasks, ...extraTasks];
  tasks.forEach((t) => {
    try {
      const runTask = cron.schedule(t.schedule, t.run, t.options);
      runningTask[t.name] = runTask;
      runTask.start();
      log.info(`Cron scheduled: ${t.name} (${t.schedule})`);
    } catch (e: any) {
      log.error(`Failed to schedule cron: ${t.name}`, e);
    }
  });

  globalThis.__CRON_INITIALIZED__ = true;
}

// 停止所有定时任务
export function stopCrons(): void {
  Object.entries(runningTask).forEach(([name, task]) => {
    task.stop();
    log.info(`Cron stopped: ${name}`);
  });
  globalThis.__CRON_INITIALIZED__ = false;
  log.info('All crons stopped.');
}

// 停止指定定时任务
export function stopCron(name: string): void {
  const task = runningTask[name];
  if (!task) {
    log.warn(`Cron not found: ${name}`);
    return;
  }

  task.stop();
  log.info(`Cron stopped: ${name}`);
}
