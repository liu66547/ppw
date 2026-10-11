// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// 站点地址：部署绑定域名后改这里，然后重新部署即可
export const SITE_URL = 'https://liudelin.vercel.app';

export default defineConfig({
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],

    resolve: {
      /**
       * 为什么开这个（只影响本机构建，不影响线上产物）：
       * Vite 6 在 Windows 上会调 `exec("net use")` 探测网络映射盘，再决定用哪种 realpath 实现。
       * 这个子进程调用在受限环境里会直接失败（spawn EPERM），导致构建中断。
       * 跳过符号链接解析即可绕开——本项目没有用 pnpm 的软链接结构，关掉没有任何副作用。
       */
      preserveSymlinks: true,
    },
  },

  markdown: {
    shikiConfig: {
      // 深色科技风代码高亮主题
      theme: 'github-dark-default',
      wrap: true,
    },
  },
});
