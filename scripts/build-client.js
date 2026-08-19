// 生成 lib/client.js：把动态形态 src/client.js 变换为静态 client bundle（__ModuleLoader__ 契约）
// 用法：node scripts/build-client.js
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(ROOT, 'src/client.js'), 'utf8')
  .replace(/^\/\/[^\n]*\n/gm, '')

// 1) 抽取 CSS（styles.insert(`...`) → STYLES 常量）
const cssMatch = src.match(/styles\.insert\(`([\s\S]*?)`\)\n/)
if (!cssMatch) throw new Error('未找到 styles.insert CSS 块')
const css = cssMatch[1]
let body = src.replace(/styles\.insert\(`[\s\S]*?`\)\n/, '')

// 2) host.call → fetch API
body = body
  .replace(/host\.call\('stream\/status'\)/g, "apiGet('/status')")
  .replace(/host\.call\('stream\/setTargets', \{ ids \}\)/g, "apiPost('/targets', { ids })")
  .replace(/host\.call\('stream\/setTargets', \{ ids: \[\] \}\)/g, "apiPost('/targets', { ids: [] })")
  .replace(/host\.call\('stream\/setConfig', \{ id: selPlatform, server, streamKey \}\)/g, "apiPost('/config', { id: selPlatform, server, streamKey })")
  .replace(/host\.call\('stream\/setPushMode', \{ mode: m \}\)/g, "apiPost('/pushmode', { mode: m })")
  .replace(/host\.call\('ffmpeg\/status'\)/g, "apiGet('/ffmpeg')")
  .replace(/host\.call\('ffmpeg\/install'\)/g, "apiPost('/ffmpeg/install')")

// 3) ctx.timer → window 定时器
body = body
  .replace(/ctx\.timer\.interval\(/g, 'window.setInterval(')
  .replace(/ctx\.timer\.timeout\(/g, 'window.setTimeout(')
// 定时器清理：interval 返回的是 number id
body = body.replace(/return disposer\n/g, 'return () => clearInterval(disposer)\n')
body = body.replace(/disposer\(\); releaseMedia\(\); stopScreenStream\(\)/g, 'clearInterval(disposer); releaseMedia(); stopScreenStream()')

// 4) 移除动态 apply 的 slots 注册尾部（改由 module.exports.apply 注册）
const tail = `    const slots = ctx.get('slots')\n    if (slots === undefined) return\n    slots.inject('shell.overlay', () => slots.register(\n      { name: 'shell.overlay', id: 'live-stream-monitor', order: 100 },\n      () => React.createElement(LiveWindow),\n    ))\n`
if (!body.includes(tail)) throw new Error('未找到 slots 注册尾部')
body = body.replace(tail, '')

// 5) 剥掉动态插件对象外壳：正则捕获 apply(ctx) { ... } 的完整函数体
const applyMatch = body.match(/apply\(ctx\) \{\n([\s\S]*)\n  \},\n\}\s*$/)
if (!applyMatch) throw new Error('未匹配到 apply(ctx) 外壳')
body = applyMatch[1]

const out = `// dsh-live — client bundle（静态形态，__ModuleLoader__ 契约）
// 生成自 src/client.js（动态形态）+ scripts/build-client.js 静态化变换：
//   host.call → fetch('/plugins/dsh-live/*')；ctx.timer → window 定时器；
//   ctx.slots 注册 shell.overlay；React 经 require('react') 注入。
window.__ModuleLoader__.load({
  id: 'dsh-live',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    const React = require('react');
    const STYLES = ${JSON.stringify(css)};
    const API = '/plugins/dsh-live';
    const apiGet = (p) => fetch(API + p).then((r) => r.json());
    const apiPost = (p, body) => fetch(API + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}) }).then((r) => r.json());
${body
  .split('\n')
  .map((line) => (line.startsWith('    ') ? line : '    ' + line))
  .join('\n')}
    module.exports = {
      name: 'dsh-live',
      inject: ['slots'],
      apply(ctx) {
        if (typeof document !== 'undefined' && !document.getElementById('dsh-live-styles')) {
          const el = document.createElement('style');
          el.id = 'dsh-live-styles';
          el.textContent = STYLES;
          document.head.appendChild(el);
        }
        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register({ name: 'shell.overlay', id: 'dsh-live', order: 100 }, () => React.createElement(LiveWindow)));
      },
    };
    return module.exports;
  },
});
`
writeFileSync(join(ROOT, 'lib/client.js'), out)
console.log('lib/client.js 已生成,', out.length, 'bytes')
