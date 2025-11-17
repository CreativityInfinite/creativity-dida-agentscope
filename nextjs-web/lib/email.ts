import nodemailer from 'nodemailer';
import { createLogger } from './logger';

const log = createLogger('EmailService');

// 邮件配置
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// 创建邮件传输器
const transporter = nodemailer.createTransport(emailConfig);

// 验证邮件配置
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    log.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    log.error('Email configuration verification failed:', error);
    return false;
  }
}

// 发送验证码邮件
export async function sendVerificationCode(email: string, code: string, type: 'signup' | 'signin' | 'reset' = 'signup'): Promise<boolean> {
  try {
    const subject = getEmailSubject(type);
    const html = getEmailTemplate(code, type);
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Creativity Hunt'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html
    };
    const result = await transporter.sendMail(mailOptions);
    log.info(`Verification email sent to ${email}`, { messageId: result.messageId });
    return true;
  } catch (error) {
    log.error(`Failed to send verification email to ${email}:`, error);
    return false;
  }
}

// 获取邮件主题
function getEmailSubject(type: 'signup' | 'signin' | 'reset'): string {
  switch (type) {
    case 'signup':
      return '欢迎加入 Creativity Hunt - 验证您的邮箱';
    case 'signin':
      return 'Creativity Hunt - 登录验证码';
    case 'reset':
      return 'Creativity Hunt - 重置密码验证码';
    default:
      return 'Creativity Hunt - 验证码';
  }
}

// 获取邮件模板
function getEmailTemplate(code: string, type: 'signup' | 'signin' | 'reset'): string {
  const baseTemplate = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creativity Hunt - 验证码</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 10px;
        }
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
        }
        .code-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            color: white;
            letter-spacing: 4px;
            font-family: 'Courier New', monospace;
        }
        .description {
            color: #6b7280;
            margin-bottom: 20px;
        }
        .warning {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            color: #92400e;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background: #6366f1;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚀 Creativity Hunt</div>
            <h1 class="title">${getEmailTitle(type)}</h1>
        </div>
        
        <div class="description">
            ${getEmailDescription(type)}
        </div>
        
        <div class="code-container">
            <div class="code">${code}</div>
        </div>
        
        <div class="warning">
            <strong>安全提醒：</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>验证码有效期为 10 分钟</li>
                <li>请勿将验证码告诉他人</li>
                <li>如非本人操作，请忽略此邮件</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>此邮件由系统自动发送，请勿回复</p>
            <p>© 2025 Creativity Hunt. All rights reserved.</p>
            <p>如有疑问，请联系我们：support@creativityinfinite.com</p>
        </div>
    </div>
</body>
</html>`;

  return baseTemplate;
}

function getEmailTitle(type: 'signup' | 'signin' | 'reset'): string {
  switch (type) {
    case 'signup':
      return '欢迎加入 Creativity Hunt！';
    case 'signin':
      return '登录验证码';
    case 'reset':
      return '重置密码';
    default:
      return '验证码';
  }
}

function getEmailDescription(type: 'signup' | 'signin' | 'reset'): string {
  switch (type) {
    case 'signup':
      return '感谢您注册 Creativity Hunt！请使用以下验证码完成邮箱验证：';
    case 'signin':
      return '您正在登录 Creativity Hunt，请使用以下验证码完成登录：';
    case 'reset':
      return '您正在重置 Creativity Hunt 账户密码，请使用以下验证码：';
    default:
      return '请使用以下验证码：';
  }
}
