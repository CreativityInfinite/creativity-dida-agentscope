import React from 'react';
import { FileCode } from 'lucide-react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiCplusplus,
  SiC,
  SiPhp,
  SiRuby,
  SiGo,
  SiRust,
  SiSwift,
  SiKotlin,
  SiScala,
  SiHtml5,
  SiCss3,
  SiSass,
  SiJson,
  SiYaml,
  SiGnubash,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiNginx,
  SiApache,
  SiMarkdown,
  SiLatex,
  SiR,
  SiPerl,
  SiLua,
  SiVim,
  SiGraphql,
  SiSolidity,
  SiHaskell,
  SiClojure,
  SiErlang,
  SiElixir,
  SiDart,
  SiFlutter,
  SiNodedotjs,
  SiVuedotjs,
  SiAngular,
  SiSvelte
} from 'react-icons/si';
import { DiDatabase } from 'react-icons/di';

/**
 * 编程语言图标映射表
 * 使用 react-icons 中的真实编程语言官方图标
 */
export const CODE_LANGUAGE_ICONS: Record<string, React.ReactNode> = {
  // 主流编程语言
  python: <SiPython className="h-3 w-3 text-[#3776ab]" />, // Python 官方蓝色
  javascript: <SiJavascript className="h-3 w-3 text-[#f7df1e]" />, // JavaScript 黄色
  typescript: <SiTypescript className="h-3 w-3 text-[#3178c6]" />, // TypeScript 蓝色
  jsx: <SiReact className="h-3 w-3 text-[#61dafb]" />, // React 青色
  tsx: <SiReact className="h-3 w-3 text-[#61dafb]" />, // React 青色
  java: <FileCode className="h-3 w-3 text-[#ed8b00]" />, // Java 橙色 (使用通用图标)
  cpp: <SiCplusplus className="h-3 w-3 text-[#00599c]" />, // C++ 蓝色
  'c++': <SiCplusplus className="h-3 w-3 text-[#00599c]" />,
  c: <SiC className="h-3 w-3 text-[#a8b9cc]" />, // C 灰蓝色
  csharp: <FileCode className="h-3 w-3 text-[#239120]" />, // C# 绿色 (使用通用图标)
  'c#': <FileCode className="h-3 w-3 text-[#239120]" />,
  php: <SiPhp className="h-3 w-3 text-[#777bb4]" />, // PHP 紫色
  ruby: <SiRuby className="h-3 w-3 text-[#cc342d]" />, // Ruby 红色
  go: <SiGo className="h-3 w-3 text-[#00add8]" />, // Go 青色
  rust: <SiRust className="h-3 w-3 text-[#000000]" />, // Rust 黑色
  swift: <SiSwift className="h-3 w-3 text-[#fa7343]" />, // Swift 橙色
  kotlin: <SiKotlin className="h-3 w-3 text-[#7f52ff]" />, // Kotlin 紫色
  scala: <SiScala className="h-3 w-3 text-[#dc322f]" />, // Scala 红色

  // Web 技术
  html: <SiHtml5 className="h-3 w-3 text-[#e34f26]" />, // HTML5 橙红色
  css: <SiCss3 className="h-3 w-3 text-[#1572b6]" />, // CSS3 蓝色
  scss: <SiSass className="h-3 w-3 text-[#cc6699]" />, // Sass 粉色
  sass: <SiSass className="h-3 w-3 text-[#cc6699]" />,
  less: <SiCss3 className="h-3 w-3 text-[#1d365d]" />, // Less 深蓝色

  // 数据格式
  json: <SiJson className="h-3 w-3 text-[#000000]" />, // JSON 黑色
  yaml: <SiYaml className="h-3 w-3 text-[#cb171e]" />, // YAML 红色
  yml: <SiYaml className="h-3 w-3 text-[#cb171e]" />,
  xml: <FileCode className="h-3 w-3 text-[#ff6600]" />, // XML 橙色

  // Shell 脚本
  bash: <SiGnubash className="h-3 w-3 text-[#4eaa25]" />, // Bash 绿色
  sh: <SiGnubash className="h-3 w-3 text-[#4eaa25]" />,
  zsh: <SiGnubash className="h-3 w-3 text-[#4eaa25]" />,
  powershell: <FileCode className="h-3 w-3 text-[#5391fe]" />, // PowerShell 蓝色 (使用通用图标)

  // 数据库
  sql: <DiDatabase className="h-3 w-3 text-[#336791]" />, // SQL 蓝色
  mysql: <SiMysql className="h-3 w-3 text-[#4479a1]" />, // MySQL 蓝色
  postgresql: <SiPostgresql className="h-3 w-3 text-[#336791]" />, // PostgreSQL 蓝色
  mongodb: <SiMongodb className="h-3 w-3 text-[#47a248]" />, // MongoDB 绿色
  redis: <SiRedis className="h-3 w-3 text-[#dc382d]" />, // Redis 红色

  // 容器和服务器
  dockerfile: <SiDocker className="h-3 w-3 text-[#2496ed]" />, // Docker 蓝色
  docker: <SiDocker className="h-3 w-3 text-[#2496ed]" />,
  nginx: <SiNginx className="h-3 w-3 text-[#009639]" />, // Nginx 绿色
  apache: <SiApache className="h-3 w-3 text-[#d22128]" />, // Apache 红色

  // 文档和其他
  markdown: <SiMarkdown className="h-3 w-3 text-[#000000]" />, // Markdown 黑色
  md: <SiMarkdown className="h-3 w-3 text-[#000000]" />,
  latex: <SiLatex className="h-3 w-3 text-[#008080]" />, // LaTeX 青色
  tex: <SiLatex className="h-3 w-3 text-[#008080]" />,

  // 科学计算
  r: <SiR className="h-3 w-3 text-[#276dc3]" />, // R 蓝色
  matlab: <FileCode className="h-3 w-3 text-[#0076a8]" />, // MATLAB 蓝色 (使用通用图标)

  // 其他语言
  perl: <SiPerl className="h-3 w-3 text-[#39457e]" />, // Perl 深蓝色
  lua: <SiLua className="h-3 w-3 text-[#2c2d72]" />, // Lua 深蓝色
  vim: <SiVim className="h-3 w-3 text-[#019733]" />, // Vim 绿色

  // 现代技术
  graphql: <SiGraphql className="h-3 w-3 text-[#e10098]" />, // GraphQL 粉色
  solidity: <SiSolidity className="h-3 w-3 text-[#363636]" />, // Solidity 灰色

  // 函数式编程
  haskell: <SiHaskell className="h-3 w-3 text-[#5d4f85]" />, // Haskell 紫色
  clojure: <SiClojure className="h-3 w-3 text-[#5881d8]" />, // Clojure 蓝色
  erlang: <SiErlang className="h-3 w-3 text-[#a90533]" />, // Erlang 红色
  elixir: <SiElixir className="h-3 w-3 text-[#4b275f]" />, // Elixir 紫色

  // 移动开发
  dart: <SiDart className="h-3 w-3 text-[#0175c2]" />, // Dart 蓝色
  flutter: <SiFlutter className="h-3 w-3 text-[#02569b]" />, // Flutter 蓝色

  // 前端框架
  vue: <SiVuedotjs className="h-3 w-3 text-[#4fc08d]" />, // Vue 绿色
  angular: <SiAngular className="h-3 w-3 text-[#dd0031]" />, // Angular 红色
  svelte: <SiSvelte className="h-3 w-3 text-[#ff3e00]" />, // Svelte 橙色

  // 运行时
  nodejs: <SiNodedotjs className="h-3 w-3 text-[#339933]" />, // Node.js 绿色
  node: <SiNodedotjs className="h-3 w-3 text-[#339933]" />
};

/**
 * 编程语言显示名称映射表
 */
export const CODE_LANGUAGE_NAMES: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  go: 'Go',
  rust: 'Rust',
  swift: 'Swift',
  kotlin: 'Kotlin',
  scala: 'Scala',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  less: 'Less',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
  yml: 'YAML',
  toml: 'TOML',
  ini: 'INI',
  bash: 'Bash',
  sh: 'Shell',
  zsh: 'Zsh',
  fish: 'Fish',
  powershell: 'PowerShell',
  sql: 'SQL',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  mongodb: 'MongoDB',
  redis: 'Redis',
  dockerfile: 'Dockerfile',
  docker: 'Docker',
  nginx: 'Nginx',
  apache: 'Apache',
  markdown: 'Markdown',
  md: 'Markdown',
  latex: 'LaTeX',
  tex: 'LaTeX',
  r: 'R',
  matlab: 'MATLAB',
  perl: 'Perl',
  lua: 'Lua',
  vim: 'Vim',
  makefile: 'Makefile',
  cmake: 'CMake',
  graphql: 'GraphQL',
  solidity: 'Solidity',
  haskell: 'Haskell',
  clojure: 'Clojure',
  erlang: 'Erlang',
  elixir: 'Elixir',
  dart: 'Dart',
  flutter: 'Flutter'
};

/**
 * 获取编程语言对应的图标
 * @param language 编程语言名称
 * @returns React 图标组件
 */
export const getLanguageIcon = (language: string): React.ReactNode => {
  return CODE_LANGUAGE_ICONS[language.toLowerCase()] || <FileCode className="h-3 w-3 text-gray-500" />;
};

/**
 * 获取编程语言的显示名称
 * @param language 编程语言名称
 * @returns 格式化的显示名称
 */
export const getLanguageDisplayName = (language: string): string => {
  return CODE_LANGUAGE_NAMES[language.toLowerCase()] || language.toUpperCase();
};
