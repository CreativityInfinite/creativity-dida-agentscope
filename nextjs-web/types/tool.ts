export interface Tool {
  key: string;
  name: string;
  logo: string;
  description: string;
  link: string;
  rating: number;
  tags: string[];
  primaryCategory: string; // 一级分类：图像生成/文本写作/聊天工具/代码助手/语音视频/数据洞察/自动化/其他
  subcategory: string; // 二级分类：各大类下的细分，如"图片插画生成""商业智能"等
}
