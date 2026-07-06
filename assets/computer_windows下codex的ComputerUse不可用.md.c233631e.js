import{_ as n,o as a,c as e,a as p}from"./app.95079cd6.js";const d=JSON.parse('{"title":"windows 下 codex 的 ComputerUse 不可用","description":"","frontmatter":{"tag":["AI"],"tags":["AI"],"categories":["AI"]},"headers":[],"relativePath":"computer/windows下codex的ComputerUse不可用.md","lastUpdated":1783353947773}'),l={name:"computer/windows下codex的ComputerUse不可用.md"};function o(r,s,c,b,t,i){return a(),e("div",{"data-pagefind-body":!0},[...s[0]||(s[0]=[p(`<h1 id="windows-下-codex-的-computeruse-不可用" tabindex="-1">windows 下 codex 的 ComputerUse 不可用 <a class="header-anchor" href="#windows-下-codex-的-computeruse-不可用" aria-hidden="true">#</a></h1><p>先诊断，确认问题不是配置项，而是 bundled 插件缓存半更新：<code>openai-bundled</code> 的 marketplace 和 <code>chrome</code> / <code>computer-use</code> cache 缺失。然后备份 <code>.codex</code> 关键文件，停止插件进程，从 Codex 安装目录里的 bundled 插件源重新复制 marketplace，重建插件 cache 和 <code>latest</code> junction。中途发现 Windows 目录带了 EFS 加密属性，导致 <code>Copy-Item</code> 报 “The specified file could not be encrypted”，所以改用 <code>robocopy /COPY:DAT</code> 并对新建的 bundled 插件目录移除加密属性。最后验证 <code>marketplace.json</code> 可解析、Chrome/Computer Use 插件文件存在、native host 没有指向 <code>.tmp</code> 或 <code>latest</code> 的坏路径。</p><p>先让 codex 自行修复</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">修复一下codex的computer-use插件无法运行的问题</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>不行再删除 .tmp</p><p>最后</p><p>在 Codex 用，可以直接复制下面这段提示词：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">你现在要在 Windows 本机环境中排查并尽量修复 Codex Desktop 的 bundled 插件异常，重点恢复 Computer Use / Chrome 插件。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">请始终用中文回复，并按“先诊断、再备份、再修复、最后验证”的顺序执行。所有路径必须使用环境变量，例如 \`$env:USERPROFILE\`、\`$env:LOCALAPPDATA\`、\`$env:ProgramFiles\`，不要写死用户名。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">目标症状可能包括：</span></span>
<span class="line"><span style="color:#babed8;">- Computer Use 或 Chrome 插件消失、不可用、图标不加载。</span></span>
<span class="line"><span style="color:#babed8;">- 插件页能看到 \`computer-use@openai-bundled\` / \`chrome@openai-bundled\`，但点进去报：</span></span>
<span class="line"><span style="color:#babed8;">  \`marketplace file &quot;%USERPROFILE%\\.codex\\.tmp\\bundled-marketplaces\\openai-bundled\\.agents\\plugins\\marketplace.json&quot; does not exist\`</span></span>
<span class="line"><span style="color:#babed8;">- Settings 里 Computer Use 显示 unavailable。</span></span>
<span class="line"><span style="color:#babed8;">- 日志里出现 \`EBUSY\`、\`resource busy or locked\`、\`plugin_cache_windows_file_lock\`、\`os error 5\`、\`extension-host.exe\`、\`extension-host\\windows\\x64\` 等关键词。</span></span>
<span class="line"><span style="color:#babed8;">- 复制 WindowsApps 资源时报 \`The specified file could not be encrypted\`。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">请执行以下流程：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1. 初始化变量：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">$CodexHome = Join-Path $env:USERPROFILE &quot;.codex&quot;</span></span>
<span class="line"><span style="color:#babed8;">$BackupRoot = Join-Path $env:USERPROFILE &quot;codex-plugin-backups&quot;</span></span>
<span class="line"><span style="color:#babed8;">$OpenAILocal = Join-Path $env:LOCALAPPDATA &quot;OpenAI&quot;</span></span>
<span class="line"><span style="color:#babed8;">$CodexLocal = Join-Path $OpenAILocal &quot;Codex&quot;</span></span>
<span class="line"><span style="color:#babed8;">$ExtensionManifest = Join-Path $OpenAILocal &quot;extension\\com.openai.codexextension.json&quot;</span></span>
<span class="line"><span style="color:#babed8;">$CodexNativeHosts = Join-Path $CodexHome &quot;chrome-native-hosts.json&quot;</span></span>
<span class="line"><span style="color:#babed8;">$LocalNativeHosts = Join-Path $CodexLocal &quot;chrome-native-hosts.json&quot;</span></span>
<span class="line"><span style="color:#babed8;">$BundledTmpRoot = Join-Path $CodexHome &quot;.tmp\\bundled-marketplaces\\openai-bundled&quot;</span></span>
<span class="line"><span style="color:#babed8;">$BundledMarketplaceJson = Join-Path $BundledTmpRoot &quot;.agents\\plugins\\marketplace.json&quot;</span></span>
<span class="line"><span style="color:#babed8;">$PluginCacheRoot = Join-Path $CodexHome &quot;plugins\\cache\\openai-bundled&quot;</span></span>
<span class="line"><span style="color:#babed8;">$ChromeCacheRoot = Join-Path $PluginCacheRoot &quot;chrome&quot;</span></span>
<span class="line"><span style="color:#babed8;">$ComputerUseCacheRoot = Join-Path $PluginCacheRoot &quot;computer-use&quot;</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">2. 先只读诊断，不要一开始删除目录：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">- 检查 \`$BundledMarketplaceJson\` 是否存在并能否 \`ConvertFrom-Json\`。</span></span>
<span class="line"><span style="color:#babed8;">- 检查 \`$ChromeCacheRoot\\latest\\scripts\`、\`$ChromeCacheRoot\\latest\\extension-host\` 是否存在。</span></span>
<span class="line"><span style="color:#babed8;">- 检查 \`$ComputerUseCacheRoot\\latest\\.codex-plugin\\plugin.json\`、\`$ComputerUseCacheRoot\\latest\\scripts\`、\`$ComputerUseCacheRoot\\latest\\scripts\\computer-use-client.mjs\` 是否存在。</span></span>
<span class="line"><span style="color:#babed8;">- 注意：新版 Computer Use 不一定有 \`extension-host\\windows\\x64\`，不要仅凭这个路径缺失就判断失败。</span></span>
<span class="line"><span style="color:#babed8;">- 检查 native host / extension manifest 是否包含 \`.tmp\`、\`chrome\\latest\`、\`computer-use\\latest\` 坏引用。</span></span>
<span class="line"><span style="color:#babed8;">- 搜索 Codex 日志关键词，但不要输出 token / API key / auth.json 内容。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">3. 修复前必须备份：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">$Stamp = Get-Date -Format &quot;yyyyMMdd-HHmmss&quot;</span></span>
<span class="line"><span style="color:#babed8;">$BackupDir = Join-Path $BackupRoot &quot;openai-bundled-lock-repair-$Stamp&quot;</span></span>
<span class="line"><span style="color:#babed8;">New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">$FilesToBackup = @(</span></span>
<span class="line"><span style="color:#babed8;">  (Join-Path $CodexHome &quot;config.toml&quot;),</span></span>
<span class="line"><span style="color:#babed8;">  (Join-Path $CodexHome &quot;.codex-global-state.json&quot;),</span></span>
<span class="line"><span style="color:#babed8;">  $CodexNativeHosts,</span></span>
<span class="line"><span style="color:#babed8;">  $LocalNativeHosts,</span></span>
<span class="line"><span style="color:#babed8;">  $ExtensionManifest</span></span>
<span class="line"><span style="color:#babed8;">)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">foreach ($file in $FilesToBackup) {</span></span>
<span class="line"><span style="color:#babed8;">  if (Test-Path -LiteralPath $file) {</span></span>
<span class="line"><span style="color:#babed8;">    Copy-Item -LiteralPath $file -Destination $BackupDir -Force</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">4. 停止插件进程：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">Get-Process extension-host -ErrorAction SilentlyContinue | Stop-Process -Force</span></span>
<span class="line"><span style="color:#babed8;">Get-Process codex-computer-use -ErrorAction SilentlyContinue | Stop-Process -Force</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">5. 从 Codex 安装目录查找 bundled 插件源：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">$Source = Get-ChildItem -Path (Join-Path $env:ProgramFiles &quot;WindowsApps&quot;) -Directory -Filter &quot;OpenAI.Codex*&quot; |</span></span>
<span class="line"><span style="color:#babed8;">  ForEach-Object {</span></span>
<span class="line"><span style="color:#babed8;">    $candidate = Join-Path $_.FullName &quot;app\\resources\\plugins\\openai-bundled&quot;</span></span>
<span class="line"><span style="color:#babed8;">    $marketplace = Join-Path $candidate &quot;.agents\\plugins\\marketplace.json&quot;</span></span>
<span class="line"><span style="color:#babed8;">    if (Test-Path -LiteralPath $marketplace) {</span></span>
<span class="line"><span style="color:#babed8;">      [pscustomobject]@{ Path = $candidate; Package = $_.Name; LastWriteTime = $_.LastWriteTime }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  } |</span></span>
<span class="line"><span style="color:#babed8;">  Sort-Object LastWriteTime -Descending |</span></span>
<span class="line"><span style="color:#babed8;">  Select-Object -First 1</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">if (-not $Source) {</span></span>
<span class="line"><span style="color:#babed8;">  throw &quot;没有找到 Codex bundled 插件源：\`$env:ProgramFiles\\WindowsApps\\OpenAI.Codex*\\app\\resources\\plugins\\openai-bundled&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">6. 重建 bundled marketplace。优先用 \`robocopy\`，不要用普通 \`Copy-Item\`，因为 WindowsApps 复制时可能触发 EFS 加密错误：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">if (Test-Path -LiteralPath $BundledTmpRoot) {</span></span>
<span class="line"><span style="color:#babed8;">  Remove-Item -LiteralPath $BundledTmpRoot -Recurse -Force</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">New-Item -ItemType Directory -Force -Path $BundledTmpRoot | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">$RoboLog = Join-Path $BackupDir &quot;robocopy-bundled-marketplace.log&quot;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">robocopy $Source.Path $BundledTmpRoot /MIR /COPY:DAT /DCOPY:DAT /R:2 /W:1 /XJ /NP /NFL /NDL /LOG:$RoboLog | Out-Null</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">if ($LASTEXITCODE -ge 8) {</span></span>
<span class="line"><span style="color:#babed8;">  throw &quot;robocopy bundled marketplace failed: $RoboLog&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">7. 重建 plugin cache：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">$SourceChrome = Join-Path $BundledTmpRoot &quot;plugins\\chrome&quot;</span></span>
<span class="line"><span style="color:#babed8;">$SourceComputerUse = Join-Path $BundledTmpRoot &quot;plugins\\computer-use&quot;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">if (-not (Test-Path -LiteralPath $SourceChrome)) {</span></span>
<span class="line"><span style="color:#babed8;">  $SourceChrome = Join-Path $BundledTmpRoot &quot;.agents\\plugins\\chrome&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">if (-not (Test-Path -LiteralPath $SourceComputerUse)) {</span></span>
<span class="line"><span style="color:#babed8;">  $SourceComputerUse = Join-Path $BundledTmpRoot &quot;.agents\\plugins\\computer-use&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">if (-not (Test-Path -LiteralPath $SourceChrome)) {</span></span>
<span class="line"><span style="color:#babed8;">  throw &quot;bundled source missing chrome plugin directory&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">if (-not (Test-Path -LiteralPath $SourceComputerUse)) {</span></span>
<span class="line"><span style="color:#babed8;">  throw &quot;bundled source missing computer-use plugin directory&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">if (Test-Path -LiteralPath $ChromeCacheRoot) {</span></span>
<span class="line"><span style="color:#babed8;">  Remove-Item -LiteralPath $ChromeCacheRoot -Recurse -Force</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">if (Test-Path -LiteralPath $ComputerUseCacheRoot) {</span></span>
<span class="line"><span style="color:#babed8;">  Remove-Item -LiteralPath $ComputerUseCacheRoot -Recurse -Force</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">$ChromeCacheVersion = Join-Path $ChromeCacheRoot &quot;current&quot;</span></span>
<span class="line"><span style="color:#babed8;">$ComputerUseCacheVersion = Join-Path $ComputerUseCacheRoot &quot;current&quot;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">New-Item -ItemType Directory -Force -Path $ChromeCacheVersion | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">New-Item -ItemType Directory -Force -Path $ComputerUseCacheVersion | Out-Null</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">robocopy $SourceChrome $ChromeCacheVersion /MIR /COPY:DAT /DCOPY:DAT /R:2 /W:1 /XJ /NP /NFL /NDL | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">if ($LASTEXITCODE -ge 8) { throw &quot;robocopy chrome cache failed&quot; }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">robocopy $SourceComputerUse $ComputerUseCacheVersion /MIR /COPY:DAT /DCOPY:DAT /R:2 /W:1 /XJ /NP /NFL /NDL | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">if ($LASTEXITCODE -ge 8) { throw &quot;robocopy computer-use cache failed&quot; }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">New-Item -ItemType Junction -Path (Join-Path $ChromeCacheRoot &quot;latest&quot;) -Target $ChromeCacheVersion | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">New-Item -ItemType Junction -Path (Join-Path $ComputerUseCacheRoot &quot;latest&quot;) -Target $ComputerUseCacheVersion | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">8. 如果目录带 \`Encrypted\` 属性，递归移除本次涉及目录的 EFS 加密属性：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`powershell</span></span>
<span class="line"><span style="color:#babed8;">foreach ($p in @($BundledTmpRoot, $PluginCacheRoot)) {</span></span>
<span class="line"><span style="color:#babed8;">  if (Test-Path -LiteralPath $p) {</span></span>
<span class="line"><span style="color:#babed8;">    cipher /d /s:$p | Out-Null</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">9. 不要盲目修改 \`[windows] sandbox\`。除非明确发现配置本身就是根因，否则不要动 config.toml 的 sandbox 配置。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">10. 最终验证：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">- \`$BundledMarketplaceJson\` 存在。</span></span>
<span class="line"><span style="color:#babed8;">- \`$BundledMarketplaceJson\` 可以 \`ConvertFrom-Json\`。</span></span>
<span class="line"><span style="color:#babed8;">- marketplace 内容包含 \`chrome\` 和 \`computer-use\`。</span></span>
<span class="line"><span style="color:#babed8;">- \`$ChromeCacheRoot\\latest\\scripts\` 存在。</span></span>
<span class="line"><span style="color:#babed8;">- \`$ChromeCacheRoot\\latest\\extension-host\` 存在。</span></span>
<span class="line"><span style="color:#babed8;">- \`$ComputerUseCacheRoot\\latest\\.codex-plugin\\plugin.json\` 存在。</span></span>
<span class="line"><span style="color:#babed8;">- \`$ComputerUseCacheRoot\\latest\\scripts\` 存在。</span></span>
<span class="line"><span style="color:#babed8;">- \`$ComputerUseCacheRoot\\latest\\scripts\\computer-use-client.mjs\` 存在。</span></span>
<span class="line"><span style="color:#babed8;">- native host / extension manifest 不再指向 \`.tmp\`、\`chrome\\latest\`、\`computer-use\\latest\`。</span></span>
<span class="line"><span style="color:#babed8;">- 最后提示用户重启 Codex Desktop，再检查 Plugins 和 Settings 里的 Computer Use 状态。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">如果 PowerShell 无法直接执行，请把以上流程生成一个 \`.ps1\` 脚本，并提醒用户用普通 PowerShell 或管理员 PowerShell 执行。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br></div></div>`,8)])])}const m=n(l,[["render",o]]);export{d as __pageData,m as default};
