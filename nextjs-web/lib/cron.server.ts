// 仅服务器端使用的 cron
import cron, { ScheduledTask } from 'node-cron';
import { createLogger } from '@/lib/logger.server';

export interface CronTask {
  name: string;
  schedule: string;
  run: () => void | Promise<void>;
  options?: Parameters<typeof cron.schedule>[2];
}

const log = createLogger('Cron');
const runningTask: Record<string, ScheduledTask> = {};

declare global {
  var __CRON_INITIALIZED__: boolean | undefined;
}

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

export function stopCrons(): void {
  Object.entries(runningTask).forEach(([name, task]) => {
    task.stop();
    log.info(`Cron stopped: ${name}`);
  });
  globalThis.__CRON_INITIALIZED__ = false;
  log.info('All crons stopped.');
}

export function stopCron(name: string): void {
  const task = runningTask[name];
  if (!task) {
    log.warn(`Cron not found: ${name}`);
    return;
  }

  task.stop();
  log.info(`Cron stopped: ${name}`);
}
