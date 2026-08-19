# dsh-live — DeepSeek Harness 多平台直播推流插件

> **DeepSeek Harness（DSH）生态的 Cordis 直播插件**：摄像头/麦克风采集、屏幕选区直播、画中画（PiP）、多平台多选同步推流（视频号、抖音、快手、斗鱼、B站、YY、虎牙、CC、自定义 RTMP），内置 **ffmpeg 引擎**（自动检测/一键安装/真实 RTMP 推流）。

[![dsh-plugin topic](https://img.shields.io/badge/DSH-dsh--plugin-2F81F7)](https://github.com/topics/dsh-plugin)
[![Cordis](https://img.shields.io/badge/Cordis-plugin-4B8BBE)](https://cordiverse.github.io/cordis/)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-Harness-7ee787)](https://github.com/deepseek-ai/deepseek-harness)
[![RTMP](https://img.shields.io/badge/streaming-RTMP%20%2F%20ffmpeg-ff4d4f)]()

## 安装（Installation）

一行命令安装到 DeepSeek Harness（dsh）：

```sh
# npm 源（`dsh-live` 发布到 npm 后可用）
dsh plugin --profile web add dsh-live

# git 源（当前推荐，仓库产物已入库、无需构建）
dsh plugin --profile web add "github:fore-vip/dsh-live#main"
```

> **本地开发/动态形态**：在 DSH 会话中用 `cordis_define` 新建插件，将 `src/host.js`、`src/client.js` 分别粘贴到 `code.host` / `code.client` 即可运行。
> 安装后启动插件，页面右侧出现「直播」悬浮窗口。

## 功能特性（Features）

- 🎥 **摄像头 / 麦克风**：真实采集预览，麦克风开关与预览音量控制（默认静音防回音）
- 🖥️ **屏幕选区直播**：`getDisplayMedia` 捕获后全屏拖拽框选直播区域
- ⭕ **画中画（PiP）**：屏幕直播时摄像头以圆形小窗显示在预览右下角，可开关
- 📡 **多平台多选同步推流**：视频号 / 抖音 / 快手 / 斗鱼 / B站 / YY / 虎牙 / CC / 自定义，选中即推、取消即停
- ⚙️ **ffmpeg 引擎**：自动检测与一键安装 ffmpeg；真实 RTMP 推流（多路并行），地址行实时显示推流状态
- 🪟 **悬浮窗口**：右侧悬浮、可拖动、可缩放、可最小化

## 快速上手

1. 插件激活后，页面**右侧**出现「直播」悬浮窗口（可按住标题栏拖动、右下角拖柄缩放、`—` 最小化）。
2. 点击底部「**摄像头**」或「**屏幕直播**」选择直播画面源。
3. 点击**顶部平台标签**加入推流（可多选，选中即同步推流，再点取消）。
4. 屏幕直播时摄像头自动以**圆形画中画**显示在预览右下角（「画中画 开/关」控制）。
5. 底部「⚙ 设置」为**每个平台独立配置**服务器地址与推流码，并可切换「模拟 / ffmpeg 真实推流」引擎。

## 目录结构

```
dsh-live/
├── package.json       # npm 包声明：name=dsh-live + dsh.bundle/dsh.client 契约 + keywords
├── cordis.patch.yml   # bundle 组合层：- insert: - id: dsh-live
├── index.mjs          # Node half 入口（bundle 形态 Cordis entry，封装 src/host.js 同一函数体）
├── lib/client.js      # Client bundle（dsh.client 通道，与 src/client.js 同一函数体）
├── src/
│   ├── host.js        # Host 半区：多平台推流状态、ffmpeg 引擎、真实推流 RPC
│   └── client.js      # Client 半区：右侧悬浮直播窗口全部 UI 与媒体采集逻辑
└── README.md          # 使用说明 + 各平台推流配置 + 市场发布
```

## ffmpeg 引擎（真实推流）

插件内置两种推流引擎，在设置面板顶部切换：

| 引擎 | 说明 | 适用 |
| --- | --- | --- |
| 模拟（演示） | Host 只维护推流状态与统计（码率/观看/时长为模拟值），**不产生真实网络推流** | 演示 UI、多选/画中画等功能测试 |
| ffmpeg 真实推流 | Host 调用 **ffmpeg** 将画面编码后**真实推送到所选平台的 RTMP 地址**，每个平台一个独立进程、可并行 | 端到端验证真实推流链路 |

### ffmpeg 检测与自动安装

- 插件启动与打开设置时自动检测本机 ffmpeg（`subprocess.resolveExecutable` / `command -v ffmpeg`），设置面板显示版本与路径。
- 未安装时显示「安装 ffmpeg」按钮，一键自动安装：
  - 检测到 Homebrew → `brew install ffmpeg`；
  - 无 Homebrew（macOS）→ 下载 evermeet.cx 静态编译包解压到 `~/.dsh/live-ffmpeg/`。
- 安装后可再次检测确认。

### 真实推流内容说明

- 当前 ffmpeg 真实推流推送的是 **ffmpeg 生成的测试画面**（`testsrc2` 彩条 + 440Hz 正弦音，640×360 H.264/AAC），用于验证编码 → RTMP 服务器 → 拉流的完整链路；**浏览器预览画面尚未接入 ffmpeg 输入**（浏览器 MediaStream 需经中转才能进入 ffmpeg，属后续增强）。
- 选中平台标签（ffmpeg 引擎下）即启动对应 ffmpeg 进程推送到该平台地址；取消标签或「停止」即终止进程。地址行绿色 ● = 推流中，红色 ✕ = 出错（悬停看原因）。

### 本地端到端测试（推荐）

1. 本机起 RTMP 服务器（如 MediaMTX：`mediamtx` 默认监听 `rtmp://127.0.0.1:1935`）；
2. 设置 → 选「自定义」平台 → 服务器填 `rtmp://127.0.0.1:1935/live`、推流码任意（如 `test`）；
3. 切换引擎为「ffmpeg 真实推流」→ 点「自定义」标签；
4. 用 `ffplay rtmp://127.0.0.1:1935/live/test`（或 VLC 打开同一地址）即可看到推上去的彩条画面。

---

## 各平台推流配置方式

> 通用要点：**服务器地址（推流域名）** + **推流码（Stream Key）** 两者缺一不可，拼接成完整 RTMP 地址 `rtmp://…/streamKey`。推流码是各平台给你的**独有**串（通常含房间号/令牌），不是公开的，请从你的开播工具或创作者后台获取。
> 内置的服务器地址为各平台**公开通用端点模板**；平台可能调整端点或对主播开通状态有要求，正式开播前请以下表「获取方式」里平台的实时数据为准，可在设置中修改后保存。

| 平台 | 标签 | 默认服务器地址 | 推流码获取方式 |
| --- | --- | --- | --- |
| 自定义 | 自定义 | 手动填写 | — |
| 微信视频号 | 视频号 | `rtmp://push.weixin.qq.com/live` | 电脑端「视频号助手」→ 直播管理 → 推流地址 / 推流码 |
| 抖音 | 抖音 | `rtmp://push-douyin-pub.douyinstatic.com/live` | 「抖音直播伴侣」→ 设置 → 推流（登录后生成） |
| 快手 | 快手 | `rtmp://rtmp-push.kuaishou.com/live` | 「快手直播伴侣」→ 推流设置 |
| 斗鱼 | 斗鱼 | `rtmp://send.douyu.com/live` | 「斗鱼开播工具」/ 主播中心 → 直播设置 → 推流地址 |
| B站 | B站 | `rtmp://txy.live-send.acg.tv/live` | 「B站直播姬」→ 设置 → 推流（登录后生成，含房间号+密钥） |
| YY | YY | `rtmp://rtmp.yy.com/live` | YY 开播工具 / 主播后台 → 推流地址 |
| 虎牙 | 虎牙 | `rtmp://open.live.huya.com/live` | 「虎牙直播伴侣」→ 推流设置（含直播间密钥） |
| 网易CC | CC | `rtmp://push.cc.163.com/live` | 「网易CC开播工具」→ 推流地址 |

### 配置步骤（以 B 站为例，其他平台同理）

1. 打开平台开播工具（如「B站直播姬」），登录后进入 **设置 → 推流**；
2. 复制平台给出的**推流地址服务器**（如 `rtmp://txy.live-send.acg.tv/live`）与**推流码**（如 `房间号-密钥`）；
3. 在直播插件点「⚙ 设置」→ 选中平台（如 B站）→ 把两段内容分别填入「服务器地址」与「推流码」→ 保存；
4. 顶部标签点击该平台即开始推流。

### 各平台注意事项

- **视频号**：需在「视频号助手」创建直播计划并开启推流权限；仅支持微信扫码登录后的主播账号。
- **抖音**：推流需通过「抖音直播伴侣」校验主播身份；推流码每次开播会刷新。
- **快手**：开播前需实名认证；推流地址与推流码在「快手直播伴侣」内复制。
- **斗鱼**：推流地址通常含房间号与专属令牌，请整段复制到「推流码」字段。
- **B站**：推流码为「房间号+直播密钥」，直播姬中直接复制即可；需先完成开播前实名与合规提示。
- **YY / 虎牙 / CC**：同样在官方开播工具获取；虎牙/YY 的密钥有时效，开播前重新获取。
- **通用**：以上端点/密钥可能随平台策略变更，**以开播工具内实时显示为准**；多平台同时推流时，请确认各平台开播状态与合规要求。

---

## 媒体采集说明

- **摄像头/麦克风**：浏览器需授予 `camera` / `microphone` 权限（页面需 HTTPS 或 localhost；若运行在 iframe 中，父页面需在 iframe 上加 `allow="camera; microphone; display-capture"`）。
- **屏幕直播**：通过 `getDisplayMedia` 捕获，支持全屏拖拽框选区域；屏幕模式会同时收集系统声音与麦克风。
- **回音处理**：预览默认静音（避免麦克风外放回声），需要监听自己声音时点预览左下角 🔊/🔇 按钮开启。
- **画中画**：屏幕直播时摄像头保留并显示为右下角圆形小窗，可开关。

## 常见问题

| 现象 | 原因 / 处理 |
| --- | --- |
| 摄像头黑屏无画面 | 未授权或 iframe 缺 `allow`；预览区会显示具体错误码与处理提示 |
| 推流无效果 | 推流码过期 / 平台端点变更 / 平台侧未开播校验 —— 重新在开播工具获取并保存 |
| 有回音 | 预览声音开启导致麦克风回声 —— 用 🔊/🔇 关闭预览外放 |
| 标签点了没反应 | 检查该平台服务器地址与推流码是否已配置（设置面板中保存） |

---

## 插件市场发布（Harness 插件市场）

DSH 插件市场 = **npm registry + GitHub 发现性**。插件是独立 npm 包（bundle 形态：包根 = 仓库根），安装命令为 `dsh plugin --profile web add <包名>`。

### 本仓库已对齐的契约

- `package.json#name` = `dsh-live`（社区 `dsh-*` 命名约定）；
- `dsh.bundle.patch` → `cordis.patch.yml`（组合层 `- insert: - id: dsh-live`，声明即 bundle，进 profile 层栈）；
- `dsh.client.platform = web` + `exports["./client"]` → `lib/client.js`（client-modules 只扫描声明该字段的包，进 `__DSH_BOOT__`）；
- `exports["."]` → `index.mjs`（Node half Cordis entry，`name`/`inject`/`apply`）；
- 依赖声明为空是设计：`@deepseek-ai/*` 官方包由 profile 的 pnpm 闭包在挂载时注入，**不要声明官方包依赖**。

### 发布步骤

1. **确认包名可用**：`npm view dsh-live`（404 表示未被占用；如被占用换名并同步改 `package.json#name` 与 `cordis.patch.yml`）。
2. **发布 npm**：
   ```sh
   npm login
   npm publish --access public
   ```
3. **GitHub 发现性**：给仓库打 `dsh-plugin` topic（GitHub → Settings → Topics）。
4. **用户安装**：
   ```sh
   dsh plugin --profile web add dsh-live                     # npm 源
   dsh plugin --profile web add "github:fore-vip/dsh-live#<commit>"   # git 源（产物已入库）
   ```

### 迁移说明（当前为动态形态快照）

- `index.mjs` / `lib/client.js` 直接封装**动态运行器形态**的函数体：`apply` 内依赖运行器注入的 `harness`（`harness.handle` 包私有 RPC）与 client 运行器注入的 `React/styles/host`。
- 静态 bundle 正式接入市场前需两步迁移：① Node half 将 `harness.handle` 替换为官方包私有 RPC 通道；② Client bundle 改用官方 client preset 构建（`__ModuleLoader__` 契约）。迁移完成前，本地验证请用「动态插件方式」加载 `src/` 下的函数体。

