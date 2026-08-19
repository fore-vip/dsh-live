// dsh-live — client bundle（静态形态，__ModuleLoader__ 契约）
// 生成自 src/client.js（动态形态）+ scripts/build-client.js 静态化变换：
//   host.call → fetch('/plugins/dsh-live/*')；ctx.timer → window 定时器；
//   ctx.slots 注册 shell.overlay；React 经 require('react') 注入。
window.__ModuleLoader__.load({
  id: 'dsh-live',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    const React = require('react');
    const STYLES = "\n.lmp-root{position:fixed;top:16px;right:16px;min-width:320px;min-height:420px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(180deg,#171b22,#0e1116);border:1px solid rgba(255,255,255,0.08);border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.45);padding:12px;box-sizing:border-box;pointer-events:auto;font-family:system-ui,-apple-system,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei',sans-serif;color:#e6e8ec;z-index:1200;overflow:hidden;}\n.lmp-body{flex:1;min-height:0;display:flex;flex-direction:column;gap:10px;overflow:hidden auto;}\n.lmp-head{display:flex;align-items:center;justify-content:space-between;cursor:move;flex:none;}\n.lmp-head:active{cursor:grabbing;}\n.lmp-dragging{user-select:none;}\n.lmp-title{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;pointer-events:none;}\n.lmp-dot{width:8px;height:8px;border-radius:50%;background:#5a6270;display:inline-block;}\n.lmp-dot-live{background:#ff4d4f;box-shadow:0 0 8px rgba(255,77,79,0.8);animation:lmp-pulse 1.4s ease-in-out infinite;}\n@keyframes lmp-pulse{0%,100%{opacity:1}50%{opacity:0.35}}\n.lmp-min{border:none;background:rgba(255,255,255,0.06);color:#9aa3b2;width:26px;height:24px;border-radius:6px;cursor:pointer;font-size:14px;line-height:1;}\n.lmp-min:hover{background:rgba(255,255,255,0.14);color:#fff;}\n.lmp-addr{display:flex;flex-direction:column;gap:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:8px 10px;}\n.lmp-tabs{display:flex;gap:4px;flex-wrap:wrap;}\n.lmp-tab{border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.05);color:#9aa3b2;border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:5px;}\n.lmp-tab:hover{background:rgba(255,255,255,0.12);color:#fff;}\n.lmp-tab-on{background:rgba(22,119,255,0.18);border-color:rgba(22,119,255,0.5);color:#7cc0ff;font-weight:600;}\n.lmp-tab-live{background:rgba(255,77,79,0.18);border-color:rgba(255,77,79,0.55);color:#ff8a8c;font-weight:600;}\n.lmp-tab-dot{width:6px;height:6px;border-radius:50%;background:#ff4d4f;animation:lmp-pulse 1.4s ease-in-out infinite;}\n.lmp-addr-label{font-size:11px;color:#8b93a3;letter-spacing:0.5px;}\n.lmp-addr-name{flex:none;font-size:11px;font-weight:600;color:#7cc0ff;}\n.lmp-addr-row{display:flex;gap:6px;align-items:center;}\n.lmp-addr-input{flex:1;min-width:0;background:#0a0d12;border:1px solid rgba(255,255,255,0.1);color:#7ee787;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;border-radius:6px;padding:6px 8px;outline:none;}\n.lmp-addr-input:focus{border-color:rgba(126,231,135,0.5);}\n.lmp-copy{background:rgba(126,231,135,0.14);border:1px solid rgba(126,231,135,0.35);color:#7ee787;border-radius:6px;padding:6px 10px;font-size:12px;cursor:pointer;white-space:nowrap;}\n.lmp-copy:hover{background:rgba(126,231,135,0.24);}\n.lmp-addr-empty{font-size:11px;color:#6b7280;}\n.lmp-pushok{flex:none;color:#7ee787;font-size:10px;}\n.lmp-pusherr{flex:none;color:#ff7a7c;font-size:10px;}\n.lmp-preview{position:relative;border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:#000;aspect-ratio:16/9;flex:none;}\n.lmp-video{display:block;width:100%;height:100%;object-fit:cover;}\n.lmp-preview-canvas{display:block;width:100%;height:auto;background:#000;}\n.lmp-pip{position:absolute;right:10px;bottom:10px;width:104px;height:104px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.55);box-shadow:0 3px 12px rgba(0,0,0,0.6);cursor:pointer;z-index:5;background:#000;}\n.lmp-pip:hover{border-color:#ff4d4f;}\n.lmp-overlay{position:absolute;top:8px;left:8px;right:8px;display:flex;justify-content:space-between;align-items:center;pointer-events:none;}\n.lmp-overlay-time{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;color:#fff;background:rgba(0,0,0,0.55);padding:2px 8px;border-radius:6px;}\n.lmp-vol{position:absolute;left:8px;bottom:8px;z-index:4;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,0.22);background:rgba(0,0,0,0.55);color:#fff;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;}\n.lmp-vol:hover{background:rgba(255,255,255,0.22);}\n.lmp-vol-off{color:#ff8a8c;}\n.lmp-nosignal{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;background:linear-gradient(180deg,#101418,#05070a);}\n.lmp-nosignal-main{font-weight:700;font-size:16px;color:rgba(255,255,255,0.75);letter-spacing:1px;}\n.lmp-nosignal-sub{font-size:12px;color:rgba(255,255,255,0.4);text-align:center;padding:0 12px;}\n.lmp-status{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:#b7beca;}\n.lmp-badge{padding:3px 8px;border-radius:999px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#8b93a3;}\n.lmp-badge-live{background:rgba(255,77,79,0.16);color:#ff7a7c;}\n.lmp-chip{padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.06);color:#8b93a3;}\n.lmp-chip-on{background:rgba(82,196,26,0.16);color:#7ee787;}\n.lmp-stat{color:#b7beca;}\n.lmp-foot{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}\n.lmp-btn{flex:none;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;color:#fff;}\n.lmp-btn-go{background:#ff4d4f;}\n.lmp-btn-go:hover{background:#ff5d5f;}\n.lmp-btn-blue{background:#1677ff;}\n.lmp-btn-blue:hover{background:#3c8bff;}\n.lmp-btn-stop{background:rgba(255,255,255,0.12);}\n.lmp-btn-stop:hover{background:rgba(255,255,255,0.2);}\n.lmp-btn-active{outline:2px solid rgba(255,255,255,0.4);outline-offset:1px;}\n.lmp-btn:disabled{opacity:0.5;cursor:not-allowed;}\n.lmp-gear{border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.08);color:#d3d9e2;border-radius:8px;padding:10px 14px;font-size:14px;font-weight:600;cursor:pointer;line-height:1;display:flex;align-items:center;gap:6px;}\n.lmp-gear:hover{background:rgba(255,255,255,0.16);color:#fff;}\n.lmp-micbtn{border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:#b7beca;border-radius:6px;padding:6px 12px;font-size:12px;cursor:pointer;}\n.lmp-micbtn:hover{background:rgba(255,255,255,0.12);}\n.lmp-micbtn-off{color:#ff7a7c;border-color:rgba(255,77,79,0.4);}\n.lmp-pipbtn{border:1px solid rgba(22,119,255,0.45);background:rgba(22,119,255,0.12);color:#7cc0ff;border-radius:6px;padding:6px 12px;font-size:12px;cursor:pointer;}\n.lmp-pipbtn:hover{background:rgba(22,119,255,0.22);}\n.lmp-pipbtn-off{color:#8b93a3;border-color:rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);}\n.lmp-hint{font-size:11px;color:#6b7280;}\n.lmp-pill{position:fixed;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:8px;background:#171b22;border:1px solid rgba(255,255,255,0.1);border-right:none;border-radius:10px 0 0 10px;padding:10px 14px 10px 12px;cursor:pointer;pointer-events:auto;z-index:1200;font-size:13px;color:#e6e8ec;box-shadow:-4px 4px 18px rgba(0,0,0,0.35);}\n.lmp-pill:hover{background:#1f2530;}\n.lmp-hidden{position:fixed;left:-10px;top:-10px;width:2px;height:2px;opacity:0;pointer-events:none;}\n.lmp-selmask{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.78);cursor:crosshair;pointer-events:auto;}\n.lmp-selvideo{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none;}\n.lmp-selrect{position:absolute;border:2px solid #ff4d4f;background:rgba(255,77,79,0.12);pointer-events:none;box-shadow:0 0 0 9999px rgba(0,0,0,0.35);}\n.lmp-selbar{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);display:flex;align-items:center;gap:10px;background:#171b22;border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:10px 14px;z-index:2003;}\n.lmp-sel-hint{font-size:12px;color:#b7beca;}\n.lmp-setmask{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0.45);pointer-events:auto;}\n.lmp-setcard{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:360px;max-height:calc(100vh - 40px);overflow:auto;background:#1b212b;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px;z-index:2004;box-shadow:0 12px 40px rgba(0,0,0,0.5);}\n.lmp-set-title{font-size:14px;font-weight:600;margin-bottom:4px;}\n.lmp-set-engine{display:flex;gap:6px;align-items:center;flex-wrap:wrap;}\n.lmp-enginebtn{border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:#b7beca;border-radius:6px;padding:5px 10px;font-size:12px;cursor:pointer;}\n.lmp-enginebtn:hover{background:rgba(255,255,255,0.12);color:#fff;}\n.lmp-enginebtn-on{border-color:rgba(22,119,255,0.6);background:rgba(22,119,255,0.14);color:#7cc0ff;}\n.lmp-set-ffmpeg{display:flex;gap:8px;align-items:center;flex-wrap:wrap;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 10px;}\n.lmp-ff-status{font-size:12px;color:#7ee787;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;}\n.lmp-ff-msg{font-size:11px;color:#8b93a3;width:100%;}\n.lmp-set-plats{display:flex;flex-direction:column;gap:6px;}\n.lmp-set-plat{border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);border-radius:8px;padding:8px 10px;cursor:pointer;display:flex;align-items:center;gap:8px;}\n.lmp-set-plat:hover{background:rgba(255,255,255,0.08);}\n.lmp-set-plat-on{border-color:rgba(22,119,255,0.6);background:rgba(22,119,255,0.12);}\n.lmp-set-plat-name{font-size:13px;font-weight:600;color:#e6e8ec;flex:none;}\n.lmp-set-plat-srv{font-size:11px;color:#8b93a3;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;}\n.lmp-set-label{font-size:11px;color:#8b93a3;}\n.lmp-set-input{background:#0a0d12;border:1px solid rgba(255,255,255,0.1);color:#e6e8ec;border-radius:6px;padding:8px 10px;font-size:12px;outline:none;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;}\n.lmp-set-input:focus{border-color:rgba(22,119,255,0.6);}\n.lmp-set-preview{font-size:11px;color:#7ee787;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;word-break:break-all;background:rgba(126,231,135,0.08);border-radius:6px;padding:6px 8px;}\n.lmp-set-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:6px;}\n.lmp-resize{position:absolute;right:0;bottom:0;width:20px;height:20px;cursor:nwse-resize;z-index:6;}\n.lmp-resize::after{content:'';position:absolute;right:5px;bottom:5px;width:8px;height:8px;border-right:2px solid rgba(255,255,255,0.4);border-bottom:2px solid rgba(255,255,255,0.4);}\n";
    const API = '/plugins/dsh-live';
    const apiGet = (p) => fetch(API + p).then((r) => r.json());
    const apiPost = (p, body) => fetch(API + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body || {}) }).then((r) => r.json());
    
    const PLATFORMS = [
      { id: 'custom', name: '自定义', server: 'rtmp://push.live.example.com/live', hint: '手动填写服务器与推流码' },
      { id: 'wechat', name: '视频号', server: 'rtmp://push.weixin.qq.com/live', hint: '微信视频号助手 → 直播 → 推流地址' },
      { id: 'douyin', name: '抖音', server: 'rtmp://push-douyin-pub.douyinstatic.com/live', hint: '抖音直播伴侣 → 设置 → 推流地址' },
      { id: 'kuaishou', name: '快手', server: 'rtmp://rtmp-push.kuaishou.com/live', hint: '快手直播伴侣 → 推流地址' },
      { id: 'douyu', name: '斗鱼', server: 'rtmp://send.douyu.com/live', hint: '斗鱼开播工具 → 推流地址' },
      { id: 'bili', name: 'B站', server: 'rtmp://txy.live-send.acg.tv/live', hint: 'B站直播姬 → 设置 → 推流地址' },
      { id: 'yy', name: 'YY', server: 'rtmp://rtmp.yy.com/live', hint: 'YY开播 → 推流地址' },
      { id: 'huya', name: '虎牙', server: 'rtmp://open.live.huya.com/live', hint: '虎牙直播伴侣 → 推流地址' },
      { id: 'cc', name: 'CC', server: 'rtmp://push.cc.163.com/live', hint: '网易CC开播工具 → 推流地址' },
    ]
    
    let latestSnap = null
    
    const formatDuration = (sec) => {
      const s = Math.max(0, Math.floor(sec || 0))
      const m = Math.floor(s / 60)
      const r = s % 60
      return (m < 10 ? '0' + m : '' + m) + ':' + (r < 10 ? '0' + r : '' + r)
    }
    
    const mediaErrorMessage = (err) => {
      if (!err || !err.name) return '无法访问摄像头/麦克风（可能被权限策略拦截）'
      const map = {
        NotAllowedError: '权限被拒绝：请在浏览器地址栏允许此页面使用摄像头和麦克风；若页面运行在 iframe 中，需父页面在 iframe 标签上添加 allow="camera; microphone" 授权',
        PermissionDeniedError: '权限被拒绝：请允许此页面访问摄像头和麦克风',
        NotFoundError: '未找到可用的摄像头或麦克风设备，请检查设备连接',
        NotReadableError: '摄像头/麦克风正被其他程序占用，请关闭占用后重试',
        OverconstrainedError: '摄像头不支持当前分辨率要求，请更换设备或降低分辨率',
        SecurityError: '当前页面上下文不允许访问媒体设备（需要 HTTPS 或 localhost）',
      }
      return map[err.name] || (err.message ? err.message : '无法访问摄像头/麦克风')
    }
    
    const LiveWindow = () => {
      const [snap, setSnap] = React.useState(null)
      const [minimized, setMinimized] = React.useState(false)
      const [copied, setCopied] = React.useState('')
      const [micEnabled, setMicEnabled] = React.useState(false)
      const [mediaError, setMediaError] = React.useState(null)
      const [dragging, setDragging] = React.useState(false)
      const [mode, setMode] = React.useState('camera')
      const [screenOn, setScreenOn] = React.useState(false)
      const [selecting, setSelecting] = React.useState(false)
      const [rect, setRect] = React.useState(null)
      const [canvasSize, setCanvasSize] = React.useState(null)
      const [settingsOpen, setSettingsOpen] = React.useState(false)
      const [selPlatform, setSelPlatform] = React.useState('custom')
      const [activeIds, setActiveIds] = React.useState([])
      const [previewSound, setPreviewSound] = React.useState(false)
      const [pipOn, setPipOn] = React.useState(false)
      const [camReady, setCamReady] = React.useState(false)
      const [engine, setEngine] = React.useState('sim')
      const [ffInfo, setFfInfo] = React.useState(null)
      const [installingFfmpeg, setInstallingFfmpeg] = React.useState(false)
      const [srvText, setSrvText] = React.useState('')
      const [keyText, setKeyText] = React.useState('')
      const [pos, setPos] = React.useState(() => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1280
        return { x: w - 416, y: 16 }
      })
      const [winSize, setWinSize] = React.useState(() => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1280
        const h = typeof window !== 'undefined' ? window.innerHeight : 800
        return { w: Math.min(400, w - 32), h: Math.min(600, h - 32) }
      })
      const videoRef = React.useRef(null)
      const pipVideoRef = React.useRef(null)
      const screenVideoRef = React.useRef(null)
      const screenCanvasRef = React.useRef(null)
      const selVideoRef = React.useRef(null)
      const selWrapRef = React.useRef(null)
      const streamRef = React.useRef(null)
      const screenStreamRef = React.useRef(null)
      const screenMicStreamRef = React.useRef(null)
      const micRef = React.useRef(false)
      const previewSoundRef = React.useRef(false)
      const pipOnRef = React.useRef(false)
      const posRef = React.useRef(pos)
      const winSizeRef = React.useRef(winSize)
      const mountedRef = React.useRef(true)
      const modeRef = React.useRef('camera')
      const cropRef = React.useRef(null)
      const activeIdsRef = React.useRef([])
    
      const setPosBoth = (p) => { posRef.current = p; setPos(p) }
      const setWinSizeBoth = (s) => { winSizeRef.current = s; setWinSize(s) }
      const setModeBoth = (m) => { modeRef.current = m; setMode(m) }
      const setActiveIdsBoth = (ids) => { activeIdsRef.current = ids; setActiveIds(ids) }
      const setPreviewSoundBoth = (v) => { previewSoundRef.current = v; setPreviewSound(v) }
      const setPipOnBoth = (v) => { pipOnRef.current = v; setPipOn(v) }
    
      // 派生常量：必须在所有 useEffect 之前声明（避免 TDZ）
      const live = !!(snap && snap.activeCount > 0)
      const micOn = live && micEnabled
      const screenMode = mode === 'screen'
      const selectedPlats = snap && Array.isArray(snap.platforms) ? snap.platforms.filter((p) => p.active) : []
    
      const clampPos = (x, y) => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1280
        const h = typeof window !== 'undefined' ? window.innerHeight : 800
        const W = winSizeRef.current.w
        const maxX = Math.max(40, w - 40)
        const maxY = Math.max(40, h - 40)
        return { x: Math.min(Math.max(x, 40 - W), maxX), y: Math.min(Math.max(y, 0), maxY) }
      }
    
      const onDragStart = (e) => {
        if (e.button !== 0) return
        if (typeof e.target.closest === 'function' && e.target.closest('.lmp-min, .lmp-copy, .lmp-btn, .lmp-micbtn, .lmp-pipbtn, .lmp-gear, .lmp-resize, .lmp-tab, .lmp-vol, .lmp-pip')) return
        e.preventDefault()
        setDragging(true)
        const startX = e.clientX
        const startY = e.clientY
        const startPos = posRef.current
        const onMove = (ev) => {
          if (!mountedRef.current) return
          setPosBoth(clampPos(startPos.x + (ev.clientX - startX), startPos.y + (ev.clientY - startY)))
        }
        const onUp = () => {
          setDragging(false)
          if (typeof document !== 'undefined') {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
          }
        }
        if (typeof document !== 'undefined') {
          document.addEventListener('mousemove', onMove)
          document.addEventListener('mouseup', onUp)
        }
      }
    
      const onResizeStart = (e) => {
        if (e.button !== 0) return
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
        const startX = e.clientX
        const startY = e.clientY
        const startSize = winSizeRef.current
        const onMove = (ev) => {
          if (!mountedRef.current) return
          const vw = typeof window !== 'undefined' ? window.innerWidth : 1280
          const vh = typeof window !== 'undefined' ? window.innerHeight : 800
          const px = posRef.current.x
          const py = posRef.current.y
          const maxW = Math.max(320, vw - px - 16)
          const maxH = Math.max(420, vh - py - 16)
          const w = Math.min(Math.max(320, startSize.w + (ev.clientX - startX)), maxW)
          const h = Math.min(Math.max(420, startSize.h + (ev.clientY - startY)), maxH)
          setWinSizeBoth({ w: Math.round(w), h: Math.round(h) })
        }
        const onUp = () => {
          setDragging(false)
          if (typeof document !== 'undefined') {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
          }
        }
        if (typeof document !== 'undefined') {
          document.addEventListener('mousemove', onMove)
          document.addEventListener('mouseup', onUp)
        }
      }
    
      const onHeadDoubleClick = () => {
        const w = typeof window !== 'undefined' ? window.innerWidth : 1280
        setPosBoth({ x: w - winSizeRef.current.w - 16, y: 16 })
      }
    
      const setMicState = (v) => {
        micRef.current = v
        setMicEnabled(v)
      }
    
      const applySnap = (res) => {
        if (res && typeof res === 'object') {
          latestSnap = res
          setSnap(res)
          if (res.pushMode) setEngine(res.pushMode)
          if (Array.isArray(res.platforms)) {
            const ids = res.platforms.filter((p) => p.active).map((p) => p.id)
            activeIdsRef.current = ids
            setActiveIds(ids)
          }
        }
      }
    
      const syncPreviewMute = () => {
        const muted = !previewSoundRef.current
        const v = videoRef.current
        if (v) v.muted = muted
        const p = pipVideoRef.current
        if (p) p.muted = muted
      }
    
      const attachCameraVideo = (video, stream) => {
        if (!video || !stream) return
        if (video.srcObject === stream) return
        video.muted = true
        video.srcObject = stream
        const p = video.play()
        if (p && typeof p.then === 'function') {
          p.then(() => syncPreviewMute()).catch(() => {})
        }
      }
    
      const ensureAttached = () => {
        const stream = streamRef.current
        const video = videoRef.current
        if (!stream || !video) return
        attachCameraVideo(video, stream)
      }
    
      const releaseMedia = () => {
        const stream = streamRef.current
        if (stream) {
          stream.getTracks().forEach((t) => t.stop())
          streamRef.current = null
        }
        setCamReady(false)
        const video = videoRef.current
        if (video) video.srcObject = null
        const pip = pipVideoRef.current
        if (pip) pip.srcObject = null
      }
    
      const stopScreenStream = () => {
        const s = screenStreamRef.current
        if (s) {
          s.getTracks().forEach((t) => t.stop())
          screenStreamRef.current = null
        }
        const m = screenMicStreamRef.current
        if (m) {
          m.getTracks().forEach((t) => t.stop())
          screenMicStreamRef.current = null
        }
      }
    
      React.useEffect(() => {
        ensureAttached()
      }, [snap ? snap.status : null, camReady])
    
      React.useEffect(() => {
        const video = screenVideoRef.current
        const stream = screenStreamRef.current
        if (screenOn && video && stream && video.srcObject !== stream) {
          video.srcObject = stream
          video.muted = true
          video.play().catch(() => {})
        }
      }, [screenOn])
    
      React.useEffect(() => {
        if (selecting) {
          const video = selVideoRef.current
          const stream = screenStreamRef.current
          if (video && stream) {
            video.srcObject = stream
            video.muted = true
            video.play().catch(() => {})
          }
        }
      }, [selecting])
    
      // 画中画：屏幕模式下把摄像头流绑定到圆形小窗
      React.useEffect(() => {
        if (screenMode && pipOn && camReady) {
          attachCameraVideo(pipVideoRef.current, streamRef.current)
        }
      }, [screenMode, pipOn, camReady, snap ? snap.status : null])
    
      React.useEffect(() => {
        const disposer = window.setInterval(() => {
          const video = screenVideoRef.current
          const canvas = screenCanvasRef.current
          const cr = cropRef.current
          if (!video || !canvas || !cr) return
          if (video.paused && video.srcObject) video.play().catch(() => {})
          if (video.readyState < 2 || !video.videoWidth) return
          const c = canvas.getContext('2d')
          c.drawImage(video, cr.sx, cr.sy, cr.sw, cr.sh, 0, 0, canvas.width, canvas.height)
        }, 40)
        return () => clearInterval(disposer)
      }, [])
    
      React.useEffect(() => {
        let alive = true
        mountedRef.current = true
        const refresh = async () => {
          try {
            const res = await apiGet('/status')
            if (!alive) return
            applySnap(res)
            if (res && res.activeCount > 0 && !streamRef.current && (modeRef.current === 'camera' || pipOnRef.current)) {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
                  audio: true,
                })
                if (alive) {
                  streamRef.current = stream
                  setMicState(true)
                  setCamReady(true)
                  ensureAttached()
                }
              } catch (e) {}
            }
          } catch (e) {}
        }
        refresh()
        const disposer = window.setInterval(refresh, 1000)
        return () => { alive = false; mountedRef.current = false; clearInterval(disposer); releaseMedia(); stopScreenStream() }
      }, [])
    
      const ensureCameraMedia = async () => {
        if (streamRef.current) return
        setMediaError(null)
        if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setMediaError('当前环境不支持摄像头/麦克风访问')
          return
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
            audio: true,
          })
          streamRef.current = stream
          setMicState(true)
          setCamReady(true)
        } catch (e) {
          setMediaError(mediaErrorMessage(e))
        }
      }
    
      const setTargetsAndSync = async (ids) => {
        const hadActive = !!(latestSnap && latestSnap.activeCount > 0)
        let res = null
        try {
          res = await apiPost('/targets', { ids })
        } catch (e) { return }
        applySnap(res)
        const hasActive = ids.length > 0
        if (hasActive && !hadActive) {
          if (modeRef.current === 'screen') {
            if (!screenStreamRef.current || !cropRef.current) openSelector()
          } else {
            await ensureCameraMedia()
          }
        } else if (!hasActive && hadActive) {
          if (modeRef.current === 'screen') {
            stopScreenStream()
            setScreenOn(false)
            setSelecting(false)
            setModeBoth('camera')
            cropRef.current = null
            setCanvasSize(null)
          } else {
            releaseMedia()
          }
          setMicState(false)
          setPipOnBoth(false)
        }
      }
    
      const onTabClick = async (id) => {
        const cur = activeIdsRef.current
        const next = cur.indexOf(id) !== -1 ? cur.filter((x) => x !== id) : cur.concat(id)
        await setTargetsAndSync(next)
      }
    
      const goCamera = async () => {
        if (modeRef.current === 'camera' && latestSnap && latestSnap.activeCount > 0) return
        if (modeRef.current === 'screen') {
          stopScreenStream()
          setScreenOn(false)
          setSelecting(false)
          cropRef.current = null
          setCanvasSize(null)
          setModeBoth('camera')
          setPipOnBoth(false)
        }
        if (activeIdsRef.current.length === 0) {
          await setTargetsAndSync(['custom'])
        } else {
          await setTargetsAndSync(activeIdsRef.current)
          await ensureCameraMedia()
        }
      }
    
      const togglePip = async () => {
        if (pipOnRef.current) {
          releaseMedia()
          setPipOnBoth(false)
        } else {
          await ensureCameraMedia()
          setPipOnBoth(true)
        }
      }
    
      const onScreenClick = () => {
        if (latestSnap && latestSnap.activeCount > 0 && modeRef.current === 'screen') reselectRegion()
        else openSelector()
      }
    
      const stopAll = async () => {
        await setTargetsAndSync([])
      }
    
      const openSelector = async () => {
        setMediaError(null)
        if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          setMediaError('当前环境不支持屏幕捕获')
          return
        }
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true })
          let micStream = null
          try {
            if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
            }
          } catch (e) {}
          screenMicStreamRef.current = micStream
          const videoTrack = stream.getVideoTracks()[0]
          const audioTracks = stream.getAudioTracks().concat(micStream ? micStream.getAudioTracks() : []).filter(Boolean)
          const combined = new MediaStream([videoTrack].concat(audioTracks).filter(Boolean))
          screenStreamRef.current = combined
          setMicState(!!micStream)
          setScreenOn(true)
          setSelecting(true)
          setRect(null)
          if (videoTrack) {
            videoTrack.addEventListener('ended', () => {
              if (screenStreamRef.current !== combined) return
              screenStreamRef.current = null
              if (screenMicStreamRef.current) {
                screenMicStreamRef.current.getTracks().forEach((t) => t.stop())
                screenMicStreamRef.current = null
              }
              setMicState(false)
              setScreenOn(false)
              setSelecting(false)
              if (modeRef.current === 'screen' && latestSnap && latestSnap.activeCount > 0) {
                setModeBoth('camera')
                cropRef.current = null
                setPipOnBoth(false)
                apiPost('/targets', { ids: [] }).then(applySnap).catch(() => {})
              }
            })
          }
        } catch (e) {
          setMediaError('无法捕获屏幕：' + (e && e.name ? e.name : '未知错误') + '（需要浏览器授权屏幕共享与麦克风；若在 iframe 中需 allow="display-capture; microphone"）')
        }
      }
    
      const selStart = (e) => {
        if (e.button !== 0) return
        if (typeof e.target.closest === 'function' && e.target.closest('.lmp-selbar')) return
        e.preventDefault()
        const sx = e.clientX
        const sy = e.clientY
        setRect({ x: sx, y: sy, w: 0, h: 0 })
        const onMove = (ev) => {
          if (!mountedRef.current) return
          setRect({
            x: Math.min(sx, ev.clientX),
            y: Math.min(sy, ev.clientY),
            w: Math.abs(ev.clientX - sx),
            h: Math.abs(ev.clientY - sy),
          })
        }
        const onUp = () => {
          if (typeof document !== 'undefined') {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup', onUp)
          }
        }
        if (typeof document !== 'undefined') {
          document.addEventListener('mousemove', onMove)
          document.addEventListener('mouseup', onUp)
        }
      }
    
      const cancelRegion = () => {
        setSelecting(false)
        setRect(null)
        const isLiveScreen = !!(latestSnap && latestSnap.activeCount > 0 && modeRef.current === 'screen')
        if (!isLiveScreen) {
          stopScreenStream()
          setScreenOn(false)
          setMicState(false)
        }
      }
    
      const confirmRegion = async () => {
        if (!rect || rect.w < 10 || rect.h < 10) return
        const video = selVideoRef.current
        const wrap = selWrapRef.current
        if (!video || !wrap || !video.videoWidth) return
        const vw = video.videoWidth
        const vh = video.videoHeight
        const cw = wrap.clientWidth
        const ch = wrap.clientHeight
        const scale = Math.min(cw / vw, ch / vh)
        const ox = (cw - vw * scale) / 2
        const oy = (ch - vh * scale) / 2
        const sx = Math.max(0, (rect.x - ox) / scale)
        const sy = Math.max(0, (rect.y - oy) / scale)
        const sw = Math.min(vw - sx, rect.w / scale)
        const sh = Math.min(vh - sy, rect.h / scale)
        if (sw < 16 || sh < 16) return
        const crop = { sx, sy, sw, sh }
        const aspect = sh / sw
        let cw2 = 640
        let ch2 = Math.round(640 * aspect)
        if (ch2 > 360) { ch2 = 360; cw2 = Math.round(360 / aspect) }
        cropRef.current = crop
        setCanvasSize({ w: cw2, h: ch2 })
        setSelecting(false)
        setRect(null)
        setModeBoth('screen')
        // 屏幕模式保留摄像头，作为右下角圆形画中画
        setPipOnBoth(true)
        await ensureCameraMedia()
        if (activeIdsRef.current.length === 0) {
          await setTargetsAndSync(['custom'])
        } else {
          await setTargetsAndSync(activeIdsRef.current)
        }
      }
    
      const reselectRegion = () => {
        if (screenStreamRef.current) {
          setSelecting(true)
          setRect(null)
        } else {
          openSelector()
        }
      }
    
      const setEngineMode = async (m) => {
        try {
          const res = await apiPost('/pushmode', { mode: m })
          applySnap(res)
        } catch (e) {}
      }
    
      const installFfmpeg = async () => {
        setInstallingFfmpeg(true)
        try {
          const res = await apiPost('/ffmpeg/install')
          setFfInfo(res)
        } catch (e) {}
        setInstallingFfmpeg(false)
        try {
          const res = await apiGet('/ffmpeg')
          setFfInfo(res)
        } catch (e) {}
      }
    
      const openSettings = async () => {
        const first = activeIdsRef.current[0] || 'custom'
        setSelPlatform(first)
        const list = latestSnap && Array.isArray(latestSnap.platforms) ? latestSnap.platforms : []
        const p = list.find((x) => x.id === first)
        setSrvText(p ? p.server : '')
        setKeyText(p ? p.streamKey : '')
        setSettingsOpen(true)
        try {
          const res = await apiGet('/ffmpeg')
          setFfInfo(res)
        } catch (e) {}
      }
    
      const pickPlatform = (id) => {
        setSelPlatform(id)
        const list = latestSnap && Array.isArray(latestSnap.platforms) ? latestSnap.platforms : []
        const p = list.find((x) => x.id === id)
        setSrvText(p ? p.server : '')
        setKeyText(p ? p.streamKey : '')
      }
    
      const computedEndpoint = () => {
        const s = (srvText || '').trim().replace(/\/+$/, '')
        const k = (keyText || '').trim()
        return s && k ? s + '/' + k : '填写服务器与推流码后自动生成'
      }
    
      const saveSettings = async () => {
        const server = (srvText || '').trim().replace(/\/+$/, '')
        const streamKey = (keyText || '').trim()
        if (!server || !streamKey) return
        try {
          const res = await apiPost('/config', { id: selPlatform, server, streamKey })
          applySnap(res)
          setSettingsOpen(false)
        } catch (e) {}
      }
    
      const toggleMic = () => {
        const stream = modeRef.current === 'screen' ? screenMicStreamRef.current : streamRef.current
        if (!stream) return
        const tracks = stream.getAudioTracks()
        if (!tracks.length) return
        const next = !tracks[0].enabled
        tracks[0].enabled = next
        setMicState(next)
      }
    
      const toggleSound = () => {
        const next = !previewSoundRef.current
        setPreviewSoundBoth(next)
        syncPreviewMute()
      }
    
      const copyAddress = async (ep) => {
        if (!ep) return
        try {
          if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(ep)
            setCopied(ep)
            window.setTimeout(() => setCopied(''), 1500)
          }
        } catch (e) {}
      }
    
      const mainWindow = React.createElement('div', {
        className: 'lmp-root' + (dragging ? ' lmp-dragging' : ''),
        style: { left: pos.x + 'px', top: pos.y + 'px', right: 'auto', width: winSize.w + 'px', height: winSize.h + 'px' },
      },
        React.createElement('div', {
          className: 'lmp-head',
          onMouseDown: onDragStart,
          onDoubleClick: onHeadDoubleClick,
          title: '按住拖动移动窗口，双击复位到右侧',
        },
          React.createElement('div', { className: 'lmp-title' },
            React.createElement('span', { className: 'lmp-dot' + (live ? ' lmp-dot-live' : '') }),
            React.createElement('span', null, '直播'),
          ),
          React.createElement('button', { className: 'lmp-min', onClick: () => setMinimized(true), title: '最小化' }, '—'),
        ),
        React.createElement('div', { className: 'lmp-body' },
          React.createElement('div', { className: 'lmp-addr' },
            React.createElement('div', { className: 'lmp-tabs' },
              PLATFORMS.map((p) => {
                const on = activeIds.indexOf(p.id) !== -1
                return React.createElement('button', {
                  key: p.id,
                  className: 'lmp-tab' + (on ? ' lmp-tab-on' : '') + (on && live ? ' lmp-tab-live' : ''),
                  onClick: () => onTabClick(p.id),
                  title: (on ? '点击取消推流' : '点击加入推流') + ' · ' + (p.hint || ''),
                },
                  on && live ? React.createElement('span', { className: 'lmp-tab-dot' }) : null,
                  p.name,
                )
              }),
            ),
            React.createElement('div', { className: 'lmp-addr-label' }, '推流服务地址（可多选）'),
            selectedPlats.length ? selectedPlats.map((p) => React.createElement('div', { className: 'lmp-addr-row', key: p.id },
              React.createElement('span', { className: 'lmp-addr-name' }, p.name),
              p.pushState === 'running' ? React.createElement('span', { className: 'lmp-pushok', title: 'ffmpeg 真实推流中' }, '●') : null,
              p.pushState === 'error' ? React.createElement('span', { className: 'lmp-pusherr', title: p.pushError || '推流错误' }, '✕') : null,
              React.createElement('input', {
                className: 'lmp-addr-input',
                readOnly: true,
                value: p.endpoint,
                onFocus: (e) => e.target.select(),
              }),
              React.createElement('button', { className: 'lmp-copy', onClick: () => copyAddress(p.endpoint) }, copied === p.endpoint ? '已复制' : '复制'),
            )) : React.createElement('div', { className: 'lmp-addr-empty' }, '未选择推流平台，点击上方标签加入'),
          ),
          React.createElement('div', { className: 'lmp-preview' },
            live && screenMode && canvasSize ? React.createElement('canvas', {
              ref: screenCanvasRef,
              className: 'lmp-preview-canvas',
              width: canvasSize.w,
              height: canvasSize.h,
            }) : null,
            live && !screenMode ? React.createElement('video', {
              ref: videoRef,
              className: 'lmp-video',
              playsInline: true,
              autoPlay: true,
              muted: !previewSound,
            }) : null,
            live && screenMode && canvasSize && pipOn && camReady ? React.createElement('video', {
              ref: pipVideoRef,
              className: 'lmp-pip',
              playsInline: true,
              autoPlay: true,
              muted: !previewSound,
              onClick: () => setPipOnBoth(false),
              title: '点击关闭画中画摄像头',
            }) : null,
            React.createElement('div', { className: 'lmp-overlay' },
              live ? React.createElement('span', { className: 'lmp-badge lmp-badge-live' }, '● 直播中') : null,
              live ? React.createElement('span', { className: 'lmp-overlay-time' }, formatDuration(snap.duration)) : null,
            ),
            live && (!screenMode || (screenMode && pipOn && camReady)) ? React.createElement('button', {
              className: 'lmp-vol' + (previewSound ? '' : ' lmp-vol-off'),
              onClick: toggleSound,
              title: previewSound ? '关闭预览声音（避免回音）' : '开启预览声音（注意可能产生回音）',
            }, previewSound ? '🔊' : '🔇') : null,
            !live ? React.createElement('div', { className: 'lmp-nosignal' },
              React.createElement('div', { className: 'lmp-nosignal-main' }, mediaError ? '无法访问摄像头/麦克风' : 'NO SIGNAL'),
              React.createElement('div', { className: 'lmp-nosignal-sub' }, mediaError ? mediaError : '点击「摄像头」或「屏幕直播」选择画面，再点上方标签开始推流'),
            ) : null,
          ),
          React.createElement('div', { className: 'lmp-status' },
            React.createElement('span', { className: 'lmp-badge' + (live ? ' lmp-badge-live' : '') }, live ? '● 直播中' : '○ 未开播'),
            React.createElement('span', { className: 'lmp-chip' + (live ? ' lmp-chip-on' : '') }, '目标 ' + (snap ? snap.activeCount : 0)),
            React.createElement('span', { className: 'lmp-chip' + (engine === 'ffmpeg' ? ' lmp-chip-on' : '') }, '引擎 ' + (engine === 'ffmpeg' ? 'FFMPEG' : '模拟')),
            React.createElement('span', { className: 'lmp-chip' + (live ? ' lmp-chip-on' : '') }, (screenMode ? 'SCREEN ' : 'CAM ') + (live ? 'ON' : 'OFF')),
            React.createElement('span', { className: 'lmp-chip' + (pipOn && camReady ? ' lmp-chip-on' : '') }, 'PIP ' + (pipOn && camReady ? 'ON' : 'OFF')),
            React.createElement('span', { className: 'lmp-chip' + (micOn ? ' lmp-chip-on' : '') }, 'MIC ' + (micOn ? 'ON' : 'OFF')),
            React.createElement('span', { className: 'lmp-stat' }, '码率 ' + (snap ? Math.round(snap.bitrate) : 0) + ' Kbps'),
            React.createElement('span', { className: 'lmp-stat' }, '观看 ' + (snap ? Math.round(snap.viewers) : 0)),
          ),
          React.createElement('div', { className: 'lmp-foot' },
            React.createElement('button', { className: 'lmp-gear', onClick: openSettings, title: '推流设置' }, '⚙ 设置'),
            React.createElement('button', {
              className: 'lmp-btn lmp-btn-go' + (live && !screenMode ? ' lmp-btn-active' : ''),
              onClick: goCamera,
              title: '使用摄像头作为直播画面',
            }, '摄像头'),
            React.createElement('button', {
              className: 'lmp-btn lmp-btn-blue' + (live && screenMode ? ' lmp-btn-active' : ''),
              onClick: onScreenClick,
              title: live && screenMode ? '重新框选屏幕区域' : '使用屏幕选区作为直播画面',
            }, '屏幕直播'),
            live && screenMode ? React.createElement('button', {
              className: 'lmp-pipbtn' + (pipOn && camReady ? '' : ' lmp-pipbtn-off'),
              onClick: togglePip,
              title: pipOn && camReady ? '关闭右下角画中画摄像头' : '开启右下角画中画摄像头',
            }, pipOn && camReady ? '画中画 开' : '画中画 关') : null,
            live ? React.createElement('button', { className: 'lmp-micbtn' + (micOn ? '' : ' lmp-micbtn-off'), onClick: toggleMic },
              micOn ? '麦克风 开' : '麦克风 关') : null,
            live ? React.createElement('button', { className: 'lmp-btn lmp-btn-stop', onClick: stopAll, title: '停止所有平台的推流' }, '停止') : null,
            React.createElement('span', { className: 'lmp-hint' }, engine === 'ffmpeg' ? 'ffmpeg 真实推流引擎（设置面板可切换/安装）' : '模拟推流引擎（设置面板可切换为 ffmpeg 真实推流）'),
          ),
        ),
        React.createElement('div', { className: 'lmp-resize', onMouseDown: onResizeStart, title: '拖动调整窗口大小' }),
      )
    
      if (minimized) {
        return React.createElement(React.Fragment, null,
          React.createElement('div', {
            className: 'lmp-pill',
            onClick: () => setMinimized(false),
            title: '展开直播窗口',
          },
            React.createElement('span', { className: 'lmp-dot' + (live ? ' lmp-dot-live' : '') }),
            React.createElement('span', null, '直播'),
          ),
          screenOn ? React.createElement('video', { ref: screenVideoRef, className: 'lmp-hidden', muted: true, playsInline: true, autoPlay: true }) : null,
        )
      }
    
      return React.createElement(React.Fragment, null,
        mainWindow,
        screenOn ? React.createElement('video', { ref: screenVideoRef, className: 'lmp-hidden', muted: true, playsInline: true, autoPlay: true }) : null,
        selecting ? React.createElement('div', { ref: selWrapRef, className: 'lmp-selmask', onMouseDown: selStart, title: '拖拽选择直播区域' },
          React.createElement('video', { ref: selVideoRef, className: 'lmp-selvideo', muted: true, playsInline: true, autoPlay: true }),
          rect ? React.createElement('div', { className: 'lmp-selrect', style: { left: rect.x + 'px', top: rect.y + 'px', width: rect.w + 'px', height: rect.h + 'px' } }) : null,
          React.createElement('div', { className: 'lmp-selbar' },
            React.createElement('span', { className: 'lmp-sel-hint' }, '在画面上拖拽框选直播区域，然后确认'),
            React.createElement('button', { className: 'lmp-btn lmp-btn-go', onClick: confirmRegion }, '确认选区开始推流'),
            React.createElement('button', { className: 'lmp-btn lmp-btn-stop', onClick: cancelRegion }, '取消'),
          ),
        ) : null,
        settingsOpen ? React.createElement('div', { className: 'lmp-setmask', onClick: (e) => { if (e.target === e.currentTarget) setSettingsOpen(false) } },
          React.createElement('div', { className: 'lmp-setcard', onClick: (e) => e.stopPropagation() },
            React.createElement('div', { className: 'lmp-set-title' }, '推流设置'),
            React.createElement('div', { className: 'lmp-set-engine' },
              React.createElement('span', { className: 'lmp-set-label' }, '推流引擎'),
              React.createElement('button', { className: 'lmp-enginebtn' + (engine === 'sim' ? ' lmp-enginebtn-on' : ''), onClick: () => setEngineMode('sim') }, '模拟（演示）'),
              React.createElement('button', { className: 'lmp-enginebtn' + (engine === 'ffmpeg' ? ' lmp-enginebtn-on' : ''), onClick: () => setEngineMode('ffmpeg') }, 'ffmpeg 真实推流'),
            ),
            React.createElement('div', { className: 'lmp-set-ffmpeg' },
              React.createElement('span', { className: 'lmp-set-label' }, 'ffmpeg 引擎'),
              React.createElement('span', { className: 'lmp-ff-status' }, ffInfo ? (ffInfo.available ? '已安装 ' + (ffInfo.version || '') : '未安装') : '检测中…'),
              ffInfo && ffInfo.available ? React.createElement('span', { className: 'lmp-ff-msg' }, ffInfo.path || '') : null,
              ffInfo && !ffInfo.available ? React.createElement('button', { className: 'lmp-btn lmp-btn-blue', onClick: installFfmpeg, disabled: installingFfmpeg }, installingFfmpeg ? '安装中…' : '安装 ffmpeg') : null,
              ffInfo && ffInfo.message ? React.createElement('span', { className: 'lmp-ff-msg' }, ffInfo.message) : null,
            ),
            React.createElement('div', { className: 'lmp-set-title' }, '推流地址（每个平台独立配置）'),
            React.createElement('div', { className: 'lmp-set-plats' },
              PLATFORMS.map((p) => React.createElement('div', {
                key: p.id,
                className: 'lmp-set-plat' + (selPlatform === p.id ? ' lmp-set-plat-on' : ''),
                onClick: () => pickPlatform(p.id),
                title: p.hint || '',
              },
                React.createElement('span', { className: 'lmp-set-plat-name' }, p.name),
                React.createElement('span', { className: 'lmp-set-plat-srv' }, p.server || '手动填写服务器地址'),
              )),
            ),
            React.createElement('label', { className: 'lmp-set-label' }, '服务器地址（' + selPlatform + '）'),
            React.createElement('input', {
              className: 'lmp-set-input',
              value: srvText,
              onChange: (e) => setSrvText(e.target.value),
              placeholder: 'rtmp://push.example.com/live',
            }),
            React.createElement('label', { className: 'lmp-set-label' }, '推流码 (Stream Key)'),
            React.createElement('input', {
              className: 'lmp-set-input',
              value: keyText,
              onChange: (e) => setKeyText(e.target.value),
              placeholder: 'your-stream-key',
            }),
            React.createElement('div', { className: 'lmp-set-preview' }, '推流地址: ' + computedEndpoint()),
            React.createElement('div', { className: 'lmp-set-actions' },
              React.createElement('button', { className: 'lmp-btn lmp-btn-go', onClick: saveSettings }, '保存'),
              React.createElement('button', { className: 'lmp-btn lmp-btn-stop', onClick: () => setSettingsOpen(false) }, '取消'),
            ),
          ),
        ) : null,
      )
    }
    
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
