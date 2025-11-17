import { NextResponse } from 'next/server';
import { uuid } from '@/lib/tool';

class R extends Map<string, any> {
  // 基础返回值封装
  constructor() {
    super();
    this.set('Code', 0);
    this.set('Message', 'OK');
    this.set('Data', {});
    this.set('TraceId', uuid());
    this.set('RequestId', uuid());
    this.set('RequestTime', new Date().toISOString());
  }

  // 失败返回值重载封装
  static error(Code?: number | string | undefined, Message?: string | any | undefined) {
    if (typeof Code === 'undefined' && typeof Message === 'undefined') return this.errorFunc(5000, 'Unknown exception, please contact the creativity hunt team.');
    else if (typeof Code === 'undefined' && typeof Message !== 'undefined') return this.errorFunc(5000, Message.message ? Message.message : Message);
    else if (typeof Code !== 'undefined' && typeof Message === 'undefined') return this.errorFunc(Code, '');
    else if (typeof Code !== 'undefined' && typeof Message !== 'undefined') return this.errorFunc(Code, Message.message ? Message.message : Message);
    else return this.errorFunc(5000, 'Unknown exception, please contact the creativity hunt team.');
  }

  // 成功返回值重载封装
  static ok = (Data?: any) => {
    const r: R = new R();
    if (typeof Data !== 'undefined') r.set('Data', Data);
    return NextResponse.json(r.transformHttpReturnResult());
  };

  // 封装失败返回函数
  private static errorFunc = (Code: number | string, Message: string) => {
    const r = new R();
    r.set('Code', Code);
    r.set('Message', Message);
    return NextResponse.json(r.transformHttpReturnResult());
  };

  // 格式化返回值
  public transformHttpReturnResult() {
    return {
      Code: this.get('Code'),
      Message: this.get('Message'),
      Data: this.get('Data'),
      TraceId: this.get('TraceId'),
      RequestId: this.get('RequestId'),
      RequestTime: this.get('RequestTime')
    };
  }

  override set(key: string, value: any): this {
    super.set(key, value);
    return this;
  }
}

export { R };
