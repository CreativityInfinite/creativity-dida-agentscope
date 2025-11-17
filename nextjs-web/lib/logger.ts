import winston, { format, transports } from 'winston';

const isNode = typeof process !== 'undefined' && !!(process as any)?.versions?.node;

const LOG_LEVEL = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');
const MAX_SIZE = process.env.LOG_MAX_SIZE ? parseInt(process.env.LOG_MAX_SIZE, 10) : 5 * 1024 * 1024;
const MAX_FILES = process.env.LOG_MAX_FILES ? parseInt(process.env.LOG_MAX_FILES, 10) : 5;

function safePid(): string {
  try {
    const pid = typeof process !== 'undefined' && (process as any)?.pid ? String((process as any).pid) : '-';
    return pid;
  } catch {
    return '-';
  }
}

function padLevel(lvl: string) {
  return (lvl + '     ').slice(0, 5);
}

// 无色输出（NestJS 风格）
const baseFormat = (label?: string) =>
  format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    format.splat(),
    // 统一规范化：保留 timestamp/level/message/label/stack，其余汇总到 extras
    format((info) => {
      const { timestamp, level, message, label, stack, ...rest } = info as any;
      (info as any).timestamp = timestamp;
      (info as any).level = level;
      (info as any).message = message;
      (info as any).label = label;
      (info as any).stack = stack;
      (info as any).extras = Object.keys(rest).length ? rest : undefined;
      Object.keys(rest).forEach((k) => delete (info as any)[k]);
      return info;
    })(),
    format.printf((info) => {
      const ts = (info as any).timestamp as string | undefined;
      const lvl = ((info as any).level as string | undefined)?.toUpperCase() || 'INFO';
      const msg = (info as any).message as string | undefined;
      const ilabel = (info as any).label as string | undefined;
      const extras = (info as any).extras as Record<string, unknown> | undefined;
      const stack = (info as any).stack as string | undefined;

      const pid = safePid();
      const appTag = '[App]';
      const ctx = label || ilabel;
      const levelPadded = padLevel(lvl);
      const left = `${appTag} ${pid} - ${ts}`;
      const right = `${levelPadded} ${ctx ? `[${ctx}] ` : ''}${msg ?? ''}`;
      const metaStr = extras && Object.keys(extras).length ? ' ' + JSON.stringify(extras) : '';
      const stackStr = stack ? `\n${stack}` : '';
      return `${left}  ${right}${metaStr}${stackStr}`;
    })
  );

export type Logger = winston.Logger;

// Edge/浏览器仅 Console；Node 额外文件写入（动态导入避免 Edge 解析）
export function createLogger(title?: string): Logger {
  if (!isNode) {
    return winston.createLogger({
      level: LOG_LEVEL,
      format: format.combine(),
      transports: [new transports.Console()]
    });
  }

  return winston.createLogger({
    level: LOG_LEVEL,
    format: baseFormat(title),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'logs/app.log',
        maxsize: MAX_SIZE,
        maxFiles: MAX_FILES,
        tailable: true
      }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: MAX_SIZE,
        maxFiles: MAX_FILES,
        tailable: true
      })
    ],
    exitOnError: false
  });
}

export const logger = createLogger('App');
