// =====================================================================
// Host 半区（推流状态 / ffmpeg 引擎 / 真实推流）
// 插件: live（直播） — Cordis 动态插件源码快照
// 来源: live-1/pkg-19 (run-18) — 含 ffmpeg 真实推流引擎
// 说明: 本文件内容为返回 Cordis 插件的纯 JS 函数体（无 import/JSX），
//       与动态运行器 evaluateClientHalf/evaluateHostHalf 中执行的代码一致。
//       加载方式见 README.md「如何加载」。
// =====================================================================

return {
  inject: ['timer'],
  apply(ctx) {
    const subprocess = ctx.get('subprocess')
    const shell = ctx.get('shell')

    const DEFS = [
      { id: 'custom', name: '自定义', server: 'rtmp://push.live.example.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'wechat', name: '视频号', server: 'rtmp://push.weixin.qq.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'douyin', name: '抖音', server: 'rtmp://push-douyin-pub.douyinstatic.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'kuaishou', name: '快手', server: 'rtmp://rtmp-push.kuaishou.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'douyu', name: '斗鱼', server: 'rtmp://send.douyu.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'bili', name: 'B站', server: 'rtmp://txy.live-send.acg.tv/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'yy', name: 'YY', server: 'rtmp://rtmp.yy.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'huya', name: '虎牙', server: 'rtmp://open.live.huya.com/live', streamKey: 'dsh-2f9a-4c7e' },
      { id: 'cc', name: 'CC', server: 'rtmp://push.cc.163.com/live', streamKey: 'dsh-2f9a-4c7e' },
    ]
    const platforms = DEFS.map((d) => ({
      id: d.id, name: d.name, server: d.server, streamKey: d.streamKey,
      endpoint: d.server + '/' + d.streamKey,
      active: false, duration: 0, bitrate: 0, viewers: 0,
      pushState: 'idle', pushError: null,
    }))
    const children = {}
    let pushMode = 'sim'
    const ff = { available: false, path: '', version: '', source: 'missing', installing: false, message: '' }

    const outOf = (res) => {
      if (!res) return ''
      if (typeof res === 'string') return res
      const s = res.stdout !== undefined ? res.stdout : (res.output !== undefined ? res.output : (res.data !== undefined ? res.data : ''))
      return s === undefined || s === null ? '' : String(s)
    }
    const codeOf = (res) => {
      if (!res) return -1
      if (typeof res === 'object' && res.exitCode !== undefined) return res.exitCode
      return 0
    }

    const runShell = async (command) => {
      if (!shell) throw new Error('宿主缺少 shell 服务')
      let err1 = null
      try { return await shell.run({ command, timeout: 120000 }) } catch (e) { err1 = e }
      try { return await shell.run({ argv: ['sh', '-lc', command], timeout: 120000 }) } catch (e) { throw err1 || e }
    }

    const startShell = (command, argv) => {
      if (!shell) throw new Error('宿主缺少 shell 服务')
      try { return shell.start({ command }) } catch (e) {
        try { return shell.start({ argv: argv || ['sh', '-lc', command] }) } catch (e2) { throw e2 }
      }
    }

    const shq = (s) => "'" + String(s).replace(/'/g, "'\\''") + "'"

    const detect = async () => {
      ff.available = false; ff.path = ''; ff.version = ''; ff.source = 'missing'; ff.message = ''
      let path = ''
      try {
        if (subprocess && typeof subprocess.resolveExecutable === 'function') {
          path = await subprocess.resolveExecutable('ffmpeg')
        } else if (shell) {
          path = String(outOf(await runShell('command -v ffmpeg 2>/dev/null || true'))).trim()
        }
      } catch (e) { path = '' }
      if (!path) {
        ff.message = '未检测到 ffmpeg，可点击「安装 ffmpeg」自动安装（Homebrew 或静态包）'
        return
      }
      ff.available = true
      ff.path = path
      ff.source = 'system'
      try {
        const r = await runShell(shq(path) + ' -version 2>&1 | head -n 1')
        ff.version = String(outOf(r)).split('\n')[0].trim()
      } catch (e) { ff.version = '' }
    }

    const ffmpegArgv = (bin, endpoint) => [bin, '-hide_banner', '-loglevel', 'warning', '-re', '-f', 'lavfi', '-i', 'testsrc2=size=640x360:rate=25', '-f', 'lavfi', '-i', 'sine=frequency=440', '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-f', 'flv', endpoint]
    const ffmpegCmd = (bin, endpoint) => ffmpegArgv(bin, endpoint).map(shq).join(' ')

    const spawnPush = (p) => {
      killPush(p.id)
      if (!ff.available || !ff.path) {
        p.pushState = 'error'; p.pushError = 'ffmpeg 未安装'
        return
      }
      const argv = ffmpegArgv(ff.path, p.endpoint)
      let handle = null
      try { handle = startShell(ffmpegCmd(ff.path, p.endpoint), argv) } catch (e) {
        p.pushState = 'error'; p.pushError = '启动 ffmpeg 失败: ' + (e && e.message ? e.message : String(e))
        return
      }
      children[p.id] = { handle }
      p.pushState = 'running'; p.pushError = null
      if (handle && handle.done && typeof handle.done.then === 'function') {
        handle.done.then(() => {
          if (children[p.id]) {
            p.pushState = 'error'; p.pushError = 'ffmpeg 已退出（目标可能拒绝连接或推流被中断）'
            delete children[p.id]
          }
        }).catch(() => {})
      }
    }

    const killPush = (id) => {
      const c = children[id]
      if (c) {
        try { if (c.handle && typeof c.handle.kill === 'function') c.handle.kill() } catch (e) {}
        delete children[id]
      }
      const p = platforms.find((x) => x.id === id)
      if (p) { p.pushState = 'idle'; p.pushError = null }
    }

    const reconcile = (ids) => {
      platforms.forEach((p) => {
        const active = ids.indexOf(p.id) !== -1
        p.active = active
        if (active) {
          if (pushMode === 'ffmpeg' && ff.available && !children[p.id]) spawnPush(p)
          else if (pushMode === 'ffmpeg' && !ff.available) { p.pushState = 'error'; p.pushError = 'ffmpeg 未安装' }
        } else {
          killPush(p.id)
        }
      })
    }

    const killAll = () => { Object.keys(children).forEach(killPush) }

    const snapshot = () => {
      const list = platforms.map((p) => ({
        id: p.id, name: p.name, server: p.server, streamKey: p.streamKey, endpoint: p.endpoint,
        active: p.active, duration: p.duration, bitrate: Math.round(p.bitrate), viewers: Math.round(p.viewers),
        pushState: p.pushState, pushError: p.pushError,
      }))
      const act = list.filter((p) => p.active)
      return {
        status: act.length ? 'live' : 'offline',
        activeCount: act.length,
        pushMode: pushMode,
        ffmpeg: { available: ff.available, path: ff.path, version: ff.version, source: ff.source, installing: ff.installing, message: ff.message },
        platforms: list,
        bitrate: act.reduce((s, p) => s + p.bitrate, 0),
        viewers: act.reduce((s, p) => s + p.viewers, 0),
        duration: act.length ? Math.max.apply(null, act.map((p) => p.duration)) : 0,
      }
    }

    const tick = ctx.timer.interval(() => {
      platforms.forEach((p) => {
        if (!p.active) return
        p.duration += 1
        p.bitrate = 2500 + Math.random() * 3500
        p.viewers = Math.max(0, Math.round(p.viewers + (Math.random() * 40 - 17)))
        if (p.viewers === 0 && Math.random() > 0.4) p.viewers = Math.round(1 + Math.random() * 30)
      })
    }, 1000)

    detect()

    harness.handle('ffmpeg/status', () => snapshot().ffmpeg)
    harness.handle('ffmpeg/install', async () => {
      if (ff.available) return { ok: true, ...snapshot().ffmpeg }
      if (ff.installing) return { ok: false, ...snapshot().ffmpeg, message: '正在安装中，请稍候' }
      ff.installing = true
      try {
        if (!shell) {
          ff.message = '宿主缺少 shell 服务，无法自动安装；请手动安装 ffmpeg'
          return { ok: false, ...snapshot().ffmpeg }
        }
        const hasBrew = String(outOf(await runShell('command -v brew >/dev/null 2>&1 && echo yes || echo no'))).trim() === 'yes'
        if (hasBrew) {
          await runShell('brew install ffmpeg')
        } else {
          const home = String(outOf(await runShell('echo $HOME'))).trim()
          const dir = home + '/.dsh/live-ffmpeg'
          await runShell('mkdir -p ' + shq(dir))
          await runShell('curl -L -s -o ' + shq(dir + '/ffmpeg.zip') + ' https://evermeet.cx/ffmpeg/getrelease/zip')
          await runShell('cd ' + shq(dir) + ' && unzip -o -q ffmpeg.zip && chmod +x ffmpeg ffprobe')
        }
        await detect()
        return { ok: ff.available, ...snapshot().ffmpeg }
      } catch (e) {
        ff.message = '安装失败: ' + (e && e.message ? e.message : String(e))
        return { ok: false, ...snapshot().ffmpeg }
      } finally {
        ff.installing = false
      }
    })
    harness.handle('stream/setPushMode', async (args) => {
      const m = args && args.mode === 'ffmpeg' ? 'ffmpeg' : 'sim'
      pushMode = m
      if (m === 'sim') { killAll() }
      else {
        if (!ff.available) await detect()
        if (!ff.available) ff.message = '请先安装 ffmpeg 再启用真实推流'
      }
      reconcile(platforms.filter((p) => p.active).map((p) => p.id))
      return snapshot()
    })
    harness.handle('stream/status', () => snapshot())
    harness.handle('stream/setTargets', (args) => {
      const ids = args && Array.isArray(args.ids) ? args.ids.filter((x) => typeof x === 'string') : []
      reconcile(ids)
      return snapshot()
    })
    harness.handle('stream/setConfig', (args) => {
      if (args && typeof args === 'object' && typeof args.id === 'string' && typeof args.server === 'string' && typeof args.streamKey === 'string') {
        const p = platforms.find((x) => x.id === args.id)
        if (p) {
          const server = args.server.replace(/\/+$/, '')
          const streamKey = args.streamKey
          if (server && streamKey) {
            p.server = server
            p.streamKey = streamKey
            p.endpoint = server + '/' + streamKey
            if (children[p.id]) { spawnPush(p) }
          }
        }
      }
      return snapshot()
    })

    ctx.effect(() => () => killAll())
    ctx.effect(() => tick)
  },
}
