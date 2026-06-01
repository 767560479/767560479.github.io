import{_ as n,o as a,c as l,a as e}from"./app.c6a2a1a4.js";const d=JSON.parse('{"title":"如何让 Cursor 扫描当前 Java 项目，并生成全局可复用的代码 Rules？","description":"","frontmatter":{},"headers":[{"level":2,"title":"一、先说本质：Cursor Rules 是给 AI 的长期开发规范","slug":"一、先说本质-cursor-rules-是给-ai-的长期开发规范","link":"#一、先说本质-cursor-rules-是给-ai-的长期开发规范","children":[]},{"level":2,"title":"二、Cursor Rules 分为两类","slug":"二、cursor-rules-分为两类","link":"#二、cursor-rules-分为两类","children":[{"level":3,"title":"1. 项目级 Rules","slug":"_1-项目级-rules","link":"#_1-项目级-rules","children":[]},{"level":3,"title":"2. 全局 User Rules","slug":"_2-全局-user-rules","link":"#_2-全局-user-rules","children":[]}]},{"level":2,"title":"三、为什么不建议直接把当前项目规范放进全局 Rules？","slug":"三、为什么不建议直接把当前项目规范放进全局-rules","link":"#三、为什么不建议直接把当前项目规范放进全局-rules","children":[]},{"level":2,"title":"四、第一步：让 Cursor 扫描当前 Java 项目","slug":"四、第一步-让-cursor-扫描当前-java-项目","link":"#四、第一步-让-cursor-扫描当前-java-项目","children":[]},{"level":2,"title":"五、第二步：生成项目级 Cursor Rules 文件","slug":"五、第二步-生成项目级-cursor-rules-文件","link":"#五、第二步-生成项目级-cursor-rules-文件","children":[]},{"level":2,"title":"六、第三步：提炼全局 Java Rules","slug":"六、第三步-提炼全局-java-rules","link":"#六、第三步-提炼全局-java-rules","children":[]},{"level":2,"title":"七、第四步：把全局 Rules 放到 Cursor User Rules","slug":"七、第四步-把全局-rules-放到-cursor-user-rules","link":"#七、第四步-把全局-rules-放到-cursor-user-rules","children":[]},{"level":2,"title":"八、一份可直接使用的 Java 全局 Rules 模板","slug":"八、一份可直接使用的-java-全局-rules-模板","link":"#八、一份可直接使用的-java-全局-rules-模板","children":[]},{"level":2,"title":"九、一个“一键生成 Rules”的 Cursor 提示词","slug":"九、一个-一键生成-rules-的-cursor-提示词","link":"#九、一个-一键生成-rules-的-cursor-提示词","children":[]},{"level":2,"title":"十、常见误区","slug":"十、常见误区","link":"#十、常见误区","children":[{"level":3,"title":"误区一：以为 Cursor 会自动长期记住项目风格","slug":"误区一-以为-cursor-会自动长期记住项目风格","link":"#误区一-以为-cursor-会自动长期记住项目风格","children":[]},{"level":3,"title":"误区二：把项目特有规则放进全局 Rules","slug":"误区二-把项目特有规则放进全局-rules","link":"#误区二-把项目特有规则放进全局-rules","children":[]},{"level":3,"title":"误区三：Rules 写得太抽象","slug":"误区三-rules-写得太抽象","link":"#误区三-rules-写得太抽象","children":[]},{"level":3,"title":"误区四：Rules 写成一篇长文章","slug":"误区四-rules-写成一篇长文章","link":"#误区四-rules-写成一篇长文章","children":[]}]},{"level":2,"title":"十一、推荐工作流","slug":"十一、推荐工作流","link":"#十一、推荐工作流","children":[]},{"level":2,"title":"十二、总结","slug":"十二、总结","link":"#十二、总结","children":[]},{"level":2,"title":"知识卡片","slug":"知识卡片","link":"#知识卡片","children":[]},{"level":2,"title":".md 导出建议","slug":"md-导出建议","link":"#md-导出建议","children":[]}],"relativePath":"Java/如何让Cursor扫描当前Java项目，并生成全局可复用的代码Rules.md","lastUpdated":1780317536019}'),p={name:"Java/如何让Cursor扫描当前Java项目，并生成全局可复用的代码Rules.md"};function r(c,s,o,i,b,t){return a(),l("div",{"data-pagefind-body":!0},[...s[0]||(s[0]=[e(`<h1 id="如何让-cursor-扫描当前-java-项目-并生成全局可复用的代码-rules" tabindex="-1">如何让 Cursor 扫描当前 Java 项目，并生成全局可复用的代码 Rules？ <a class="header-anchor" href="#如何让-cursor-扫描当前-java-项目-并生成全局可复用的代码-rules" aria-hidden="true">#</a></h1><p>很多人在使用 Cursor 写 Java 项目时，都会遇到一个问题：</p><blockquote><p>Cursor 写出来的代码能跑，但不一定符合我当前项目的代码风格。</p></blockquote><p>比如你的项目里明明有统一返回对象，Cursor 却自己新建了一个返回结构；你的项目里 Controller 只负责接收请求，Cursor 却把业务逻辑写进了 Controller；你的项目里异常都是统一抛 <code>BusinessException</code>，Cursor 却随手写了一个 <code>RuntimeException</code>。</p><p>这不是 Cursor 不聪明，而是它缺少一份明确的“项目开发规范”。</p><p>Cursor Rules 的作用，就是告诉 Cursor：</p><blockquote><p>以后写代码时，请按这些规则来。</p></blockquote><p>本文会讲清楚：</p><ol><li>Cursor Rules 是什么</li><li>如何让 Cursor 扫描当前项目代码风格</li><li>如何生成项目级 Rules</li><li>如何提炼成全局 Java Rules</li><li>一份可直接使用的 Java 全局 Rules 模板</li><li>常见误区和推荐工作流</li></ol><hr><h2 id="一、先说本质-cursor-rules-是给-ai-的长期开发规范" tabindex="-1">一、先说本质：Cursor Rules 是给 AI 的长期开发规范 <a class="header-anchor" href="#一、先说本质-cursor-rules-是给-ai-的长期开发规范" aria-hidden="true">#</a></h2><p>Cursor Rules 可以理解成：</p><blockquote><p>写给 Cursor 的团队开发规范。</p></blockquote><p>就像一个新同事刚加入项目，你不会只跟他说：</p><blockquote><p>你看着项目风格写吧。</p></blockquote><p>这样他大概率会模仿一部分，但不稳定。</p><p>更好的方式是给他一份明确规范：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Controller 只负责接收请求和调用 Service</span></span>
<span class="line"><span style="color:#babed8;">Service 负责业务逻辑</span></span>
<span class="line"><span style="color:#babed8;">Mapper 只负责数据库访问</span></span>
<span class="line"><span style="color:#babed8;">异常统一使用 BusinessException</span></span>
<span class="line"><span style="color:#babed8;">日志统一使用 Slf4j</span></span>
<span class="line"><span style="color:#babed8;">接口返回统一使用 Result&lt;T&gt;</span></span>
<span class="line"><span style="color:#babed8;">Entity 不要直接返回给前端</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Cursor Rules 的作用也是一样。</p><p>它不会真正“训练模型”，而是把这些规则作为上下文指令，让 Cursor 在生成代码、修改代码、重构代码时优先遵守。</p><hr><h2 id="二、cursor-rules-分为两类" tabindex="-1">二、Cursor Rules 分为两类 <a class="header-anchor" href="#二、cursor-rules-分为两类" aria-hidden="true">#</a></h2><p>Cursor 中常见的 Rules 有两类：项目级 Rules 和全局 User Rules。</p><h3 id="_1-项目级-rules" tabindex="-1">1. 项目级 Rules <a class="header-anchor" href="#_1-项目级-rules" aria-hidden="true">#</a></h3><p>项目级 Rules 只对当前项目生效。</p><p>一般放在项目根目录下：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">.cursor/rules/</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>例如：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">.cursor/rules/java-project-style.mdc</span></span>
<span class="line"><span style="color:#babed8;">.cursor/rules/spring-boot-style.mdc</span></span>
<span class="line"><span style="color:#babed8;">.cursor/rules/mybatis-style.mdc</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>项目级 Rules 适合写当前项目特有的东西，比如：</p><ul><li>当前项目目录结构</li><li>当前项目模块划分</li><li>当前项目统一返回对象</li><li>当前项目异常处理方式</li><li>当前项目日志风格</li><li>当前项目 DTO / VO / Entity 使用规范</li><li>当前项目 Mapper / Repository 写法</li><li>当前项目权限、租户、审计字段等特殊规范</li></ul><h3 id="_2-全局-user-rules" tabindex="-1">2. 全局 User Rules <a class="header-anchor" href="#_2-全局-user-rules" aria-hidden="true">#</a></h3><p>全局 Rules 对你在 Cursor 中打开的所有项目都生效。</p><p>一般入口是：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Cursor Settings</span></span>
<span class="line"><span style="color:#babed8;">→ Rules</span></span>
<span class="line"><span style="color:#babed8;">→ User Rules</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>不同版本 Cursor 的菜单名称可能略有差异，但你可以在设置里搜索：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Rules</span></span>
<span class="line"><span style="color:#babed8;">User Rules</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>全局 Rules 适合写通用 Java 规范，比如：</p><ul><li>Java 命名规范</li><li>Spring Boot 分层规范</li><li>Controller / Service / Mapper 职责</li><li>异常处理规范</li><li>日志规范</li><li>参数校验规范</li><li>单元测试规范</li><li>禁止使用 <code>System.out.println()</code></li><li>禁止把 Entity 直接返回给前端</li></ul><hr><h2 id="三、为什么不建议直接把当前项目规范放进全局-rules" tabindex="-1">三、为什么不建议直接把当前项目规范放进全局 Rules？ <a class="header-anchor" href="#三、为什么不建议直接把当前项目规范放进全局-rules" aria-hidden="true">#</a></h2><p>这是很多人容易犯的错误。</p><p>假设你当前项目里有这样的规则：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">所有后台接口都放在 com.company.admin.controller 包下</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这条规则只适合当前项目。</p><p>如果你把它放到全局 User Rules，后面打开其他 Java 项目时，Cursor 也可能参考这条规则，反而造成干扰。</p><p>所以正确做法是：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">当前项目代码风格</span></span>
<span class="line"><span style="color:#babed8;">        ↓</span></span>
<span class="line"><span style="color:#babed8;">生成项目级 Rules</span></span>
<span class="line"><span style="color:#babed8;">        ↓</span></span>
<span class="line"><span style="color:#babed8;">提炼通用规则</span></span>
<span class="line"><span style="color:#babed8;">        ↓</span></span>
<span class="line"><span style="color:#babed8;">放入全局 User Rules</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>简单说：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">项目级 Rules = 当前项目的特殊规范</span></span>
<span class="line"><span style="color:#babed8;">全局 Rules = 你个人长期使用的 Java 编码底线</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><hr><h2 id="四、第一步-让-cursor-扫描当前-java-项目" tabindex="-1">四、第一步：让 Cursor 扫描当前 Java 项目 <a class="header-anchor" href="#四、第一步-让-cursor-扫描当前-java-项目" aria-hidden="true">#</a></h2><p>在 Cursor 中打开当前项目，然后打开 Chat，建议使用 Agent 模式。</p><p>输入下面这段提示词：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">请你扫描并分析当前 Java 项目的代码风格和开发规范。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">请重点阅读以下内容：</span></span>
<span class="line"><span style="color:#babed8;">1. 项目目录结构</span></span>
<span class="line"><span style="color:#babed8;">2. Controller 层代码</span></span>
<span class="line"><span style="color:#babed8;">3. Service / ServiceImpl 层代码</span></span>
<span class="line"><span style="color:#babed8;">4. Mapper / Repository 层代码</span></span>
<span class="line"><span style="color:#babed8;">5. Entity / DTO / VO / BO 等对象定义</span></span>
<span class="line"><span style="color:#babed8;">6. 统一返回结果类</span></span>
<span class="line"><span style="color:#babed8;">7. 异常处理类</span></span>
<span class="line"><span style="color:#babed8;">8. 日志使用方式</span></span>
<span class="line"><span style="color:#babed8;">9. 注释风格</span></span>
<span class="line"><span style="color:#babed8;">10. 单元测试写法</span></span>
<span class="line"><span style="color:#babed8;">11. 配置文件风格</span></span>
<span class="line"><span style="color:#babed8;">12. 常用工具类和公共方法</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">请不要只总结表面现象，而是分析这个项目真实遵循的编码习惯。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">最后请输出一份适合 Cursor 使用的项目级 Rules，要求：</span></span>
<span class="line"><span style="color:#babed8;">- 使用 Markdown 格式</span></span>
<span class="line"><span style="color:#babed8;">- 内容清晰、可执行</span></span>
<span class="line"><span style="color:#babed8;">- 每条规则都要明确 Cursor 应该怎么写代码</span></span>
<span class="line"><span style="color:#babed8;">- 区分“必须遵守”和“建议遵守”</span></span>
<span class="line"><span style="color:#babed8;">- 不要写空泛原则</span></span>
<span class="line"><span style="color:#babed8;">- 尽量结合当前项目已有代码风格</span></span>
<span class="line"><span style="color:#babed8;">- 输出内容可以直接保存为 \`.cursor/rules/java-project-style.mdc\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>这一步的目的不是让 Cursor 马上改代码，而是先让它理解当前项目。</p><p>它需要观察：</p><ul><li>你的代码分层方式</li><li>类命名习惯</li><li>方法命名习惯</li><li>返回结构</li><li>异常类型</li><li>日志格式</li><li>DTO / VO / Entity 的边界</li><li>数据库访问方式</li><li>事务放在哪里</li><li>测试怎么写</li></ul><hr><h2 id="五、第二步-生成项目级-cursor-rules-文件" tabindex="-1">五、第二步：生成项目级 Cursor Rules 文件 <a class="header-anchor" href="#五、第二步-生成项目级-cursor-rules-文件" aria-hidden="true">#</a></h2><p>等 Cursor 分析完之后，继续输入：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">请根据刚才总结的项目代码风格，在当前项目根目录创建：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.cursor/rules/java-project-style.mdc</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">并把完整 Rules 内容写入该文件。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">要求：</span></span>
<span class="line"><span style="color:#babed8;">1. 规则必须适用于当前项目</span></span>
<span class="line"><span style="color:#babed8;">2. 不要包含无关解释</span></span>
<span class="line"><span style="color:#babed8;">3. 使用 Cursor Rules 适合的 Markdown 结构</span></span>
<span class="line"><span style="color:#babed8;">4. 规则要尽量具体，例如命名、分层、异常、日志、返回值、DTO/VO 使用方式</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>生成后，你的项目结构大概会变成：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">your-project/</span></span>
<span class="line"><span style="color:#babed8;">  src/</span></span>
<span class="line"><span style="color:#babed8;">  pom.xml</span></span>
<span class="line"><span style="color:#babed8;">  .cursor/</span></span>
<span class="line"><span style="color:#babed8;">    rules/</span></span>
<span class="line"><span style="color:#babed8;">      java-project-style.mdc</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这样 Cursor 在当前项目里写代码时，就会参考这份规则。</p><hr><h2 id="六、第三步-提炼全局-java-rules" tabindex="-1">六、第三步：提炼全局 Java Rules <a class="header-anchor" href="#六、第三步-提炼全局-java-rules" aria-hidden="true">#</a></h2><p>项目级 Rules 生成后，不要直接复制到全局 User Rules。</p><p>因为里面可能有很多当前项目特有的内容，比如：</p><ul><li>具体包名</li><li>具体模块名</li><li>具体业务名</li><li>具体表名</li><li>具体枚举值</li><li>具体工具类名</li></ul><p>你应该让 Cursor 再提炼一份通用规则。</p><p>继续输入：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">请基于当前项目的 \`.cursor/rules/java-project-style.mdc\`，提炼一份适合放到 Cursor User Rules 的全局 Java 编码规范。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">要求：</span></span>
<span class="line"><span style="color:#babed8;">1. 只保留适用于大多数 Java / Spring Boot 项目的通用规则</span></span>
<span class="line"><span style="color:#babed8;">2. 删除当前项目特有的包名、模块名、业务名、数据库表名</span></span>
<span class="line"><span style="color:#babed8;">3. 保留通用的分层规范、命名规范、异常规范、日志规范、DTO/VO/Entity 使用规范</span></span>
<span class="line"><span style="color:#babed8;">4. 输出一份可以直接粘贴到 Cursor User Rules 的内容</span></span>
<span class="line"><span style="color:#babed8;">5. 内容要简洁但具体</span></span>
<span class="line"><span style="color:#babed8;">6. 不要写“根据项目情况而定”这种模糊表达</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><hr><h2 id="七、第四步-把全局-rules-放到-cursor-user-rules" tabindex="-1">七、第四步：把全局 Rules 放到 Cursor User Rules <a class="header-anchor" href="#七、第四步-把全局-rules-放到-cursor-user-rules" aria-hidden="true">#</a></h2><p>打开 Cursor 设置：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Cursor Settings</span></span>
<span class="line"><span style="color:#babed8;">→ Rules</span></span>
<span class="line"><span style="color:#babed8;">→ User Rules</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后把刚才生成的全局 Java Rules 粘贴进去。</p><p>之后你在 Cursor 中打开其他 Java 项目时，这些全局规则也会生效。</p><hr><h2 id="八、一份可直接使用的-java-全局-rules-模板" tabindex="-1">八、一份可直接使用的 Java 全局 Rules 模板 <a class="header-anchor" href="#八、一份可直接使用的-java-全局-rules-模板" aria-hidden="true">#</a></h2><p>如果你不想从零开始，可以先使用下面这份模板。</p><div class="language-markdown line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;"># </span><span style="color:#FFCB6B;">Global Java Coding Rules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">你是一个资深 Java / Spring Boot 工程师。生成、修改、重构 Java 代码时，必须遵守以下规则。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">1. 基本原则</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 代码必须清晰、可维护、可测试。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 优先使用简单直接的实现方式，不要为了炫技使用复杂写法。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 修改代码时，必须尽量保持当前项目已有风格一致。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要随意引入新的框架、依赖或设计模式，除非用户明确要求。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要生成无用代码、重复代码、过度封装代码。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">2. 分层规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">Controller 层</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Controller 只负责接收请求、参数校验、调用 Service、返回结果。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Controller 中禁止编写复杂业务逻辑。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Controller 中禁止直接访问数据库。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 请求参数应优先使用 DTO 或 Request 对象承载。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 返回数据应优先使用 VO 或 Response 对象承载。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">Service 层</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Service 负责业务逻辑编排。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 涉及多个数据库操作的一致性逻辑，应放在 Service 层。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 事务注解应优先放在 Service 层方法上。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Service 方法命名必须表达业务含义，而不是数据库操作细节。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要让 Service 方法变成超长方法，复杂逻辑需要拆分为私有方法。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">### </span><span style="color:#FFCB6B;">Repository / Mapper 层</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Repository / Mapper 只负责数据访问。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 禁止在 Mapper 层写业务判断。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> SQL 查询条件应清晰可读。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 复杂 SQL 必须注意可维护性。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要在数据访问层返回 Controller 专用对象，除非项目已有明确规范。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">3. 对象使用规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Entity / DO 只表示数据库持久化结构。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> DTO 用于接收请求参数或跨层传输。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> VO 用于返回给前端的数据。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要直接把 Entity 返回给前端。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要在 Entity 中写复杂业务逻辑。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 对象转换逻辑应集中处理，避免散落在多个 Controller 中。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 字段命名必须语义清晰，不要使用模糊缩写。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">4. 命名规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 类名使用大驼峰命名，例如 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">UserService</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 方法名使用小驼峰命名，例如 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">getUserById</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 常量使用大写下划线命名，例如 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">MAX_RETRY_COUNT</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 变量名必须表达业务含义。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 布尔变量应使用 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">is</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">has</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">can</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">should</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;"> 等前缀。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要使用 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">data</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">info</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">list1</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">temp</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;"> 这类含义模糊的命名，除非上下文非常明确。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">5. 异常处理规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要吞掉异常。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要只打印异常而不处理。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要使用 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">printStackTrace()</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 业务异常应使用项目统一的业务异常类型。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 异常信息必须能帮助定位问题。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 捕获异常时，应明确说明失败原因。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要把底层异常细节直接暴露给前端。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">6. 日志规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 使用项目统一日志框架，通常为 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Slf4j</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 禁止使用 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">System.out.println()</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;"> 输出日志。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 日志内容必须包含关键上下文，例如用户 ID、订单 ID、请求 ID、业务 ID。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 错误日志必须包含异常堆栈。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要打印敏感信息，例如密码、token、身份证号、银行卡号。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 高频循环中不要打印大量 info 日志。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">7. 参数校验规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 对外接口必须进行必要参数校验。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 简单格式校验优先使用注解，例如 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">@NotNull</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">@NotBlank</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">、</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">@Size</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;">。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 业务规则校验应放在 Service 层。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 校验失败时，应返回清晰错误信息。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要假设前端传入的数据一定正确。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">8. 返回值规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 接口返回值应遵循项目统一响应结构。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要随意返回 Map，除非项目已有明确约定。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 返回给前端的数据字段应清晰、稳定。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要返回无关字段。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 分页接口应返回总数、当前页数据、分页参数等必要信息。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">9. 数据库与事务规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 多个写操作需要保持一致性时，必须考虑事务。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 事务范围应尽量小。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要在事务中执行耗时外部调用，例如 HTTP 请求、远程 RPC、大文件处理。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 查询方法不要加不必要的事务。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 更新和删除操作必须有明确条件，避免误更新全表。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">10. 集合与空值处理</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 返回集合时，优先返回空集合，而不是 null。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 使用对象前必须考虑 null 情况。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要滥用 </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Optional</span><span style="color:#89DDFF;">\`</span><span style="color:#BABED8;"> 作为字段类型或参数类型。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 遍历集合前应确认集合来源是否可能为空。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 对外接口不要返回不稳定的 null 结构。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">11. 代码修改规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 修改已有代码时，优先保持原有代码风格。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要大范围重构与当前任务无关的代码。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要删除用户已有注释，除非注释明显错误。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要改变已有公共方法签名，除非用户明确要求。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 修改逻辑时，要同步检查调用方影响。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 如果新增方法，应考虑是否需要测试。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">12. 注释规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要给显而易见的代码写废话注释。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 复杂业务规则必须写注释说明原因。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 注释应解释“为什么这样做”，而不是简单重复“做了什么”。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 临时方案、兼容逻辑、特殊判断必须写清楚背景。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">13. 测试规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 新增核心业务逻辑时，应优先补充单元测试。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 测试方法名应能表达测试场景。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 测试数据应清晰可读。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 测试应覆盖正常情况、异常情况和边界情况。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不要写没有断言的无效测试。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">14. 生成代码时的行为要求</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 生成代码前，先观察当前项目已有写法。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 如果项目已有统一工具类、统一返回结构、统一异常类型，必须优先复用。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 如果不确定某个类是否存在，应先搜索项目，而不是直接新建。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 如果需要新增类，应放在符合当前项目结构的位置。</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 如果用户要求修改 bug，应尽量给出原因解释和最小修改方案。</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br></div></div><hr><h2 id="九、一个-一键生成-rules-的-cursor-提示词" tabindex="-1">九、一个“一键生成 Rules”的 Cursor 提示词 <a class="header-anchor" href="#九、一个-一键生成-rules-的-cursor-提示词" aria-hidden="true">#</a></h2><p>如果你想省事，可以直接在 Cursor 当前项目中输入下面这段：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">请你作为资深 Java 架构师，完整扫描当前项目代码，并为 Cursor 生成一份可长期使用的代码规范 Rules。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">请分两份输出：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第一份：项目级 Rules</span></span>
<span class="line"><span style="color:#babed8;">- 适合保存为 \`.cursor/rules/java-project-style.mdc\`</span></span>
<span class="line"><span style="color:#babed8;">- 必须结合当前项目的真实代码风格</span></span>
<span class="line"><span style="color:#babed8;">- 包括目录结构、分层规范、命名规范、异常处理、日志规范、DTO/VO/Entity 使用、数据库访问、事务、测试等</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第二份：全局 Java Rules</span></span>
<span class="line"><span style="color:#babed8;">- 适合粘贴到 Cursor Settings → Rules → User Rules</span></span>
<span class="line"><span style="color:#babed8;">- 只保留通用 Java / Spring Boot 规范</span></span>
<span class="line"><span style="color:#babed8;">- 删除当前项目特有的包名、业务名、模块名</span></span>
<span class="line"><span style="color:#babed8;">- 规则必须具体、可执行</span></span>
<span class="line"><span style="color:#babed8;">- 不要输出空泛原则</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">输出格式：</span></span>
<span class="line"><span style="color:#babed8;">1. 先输出项目级 Rules</span></span>
<span class="line"><span style="color:#babed8;">2. 再输出全局 Java Rules</span></span>
<span class="line"><span style="color:#babed8;">3. 每条规则都要使用明确指令句，例如“必须……”、“禁止……”、“优先……”</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><hr><h2 id="十、常见误区" tabindex="-1">十、常见误区 <a class="header-anchor" href="#十、常见误区" aria-hidden="true">#</a></h2><h3 id="误区一-以为-cursor-会自动长期记住项目风格" tabindex="-1">误区一：以为 Cursor 会自动长期记住项目风格 <a class="header-anchor" href="#误区一-以为-cursor-会自动长期记住项目风格" aria-hidden="true">#</a></h3><p>Cursor 能读取当前上下文，但不代表它会永远稳定记住你的项目风格。</p><p>如果你希望 Cursor 长期稳定地按规范写代码，就要把规范写进 Rules。</p><h3 id="误区二-把项目特有规则放进全局-rules" tabindex="-1">误区二：把项目特有规则放进全局 Rules <a class="header-anchor" href="#误区二-把项目特有规则放进全局-rules" aria-hidden="true">#</a></h3><p>比如：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">所有接口必须放到 com.xxx.admin.controller</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这类规则只适合当前项目。</p><p>全局规则应该写成：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Controller 应按业务模块组织，避免所有接口堆在一个类中。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="误区三-rules-写得太抽象" tabindex="-1">误区三：Rules 写得太抽象 <a class="header-anchor" href="#误区三-rules-写得太抽象" aria-hidden="true">#</a></h3><p>不推荐：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">请写高质量代码。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>推荐：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">Controller 中禁止编写复杂业务逻辑，复杂逻辑必须下沉到 Service 层。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Cursor 更容易执行具体规则。</p><h3 id="误区四-rules-写成一篇长文章" tabindex="-1">误区四：Rules 写成一篇长文章 <a class="header-anchor" href="#误区四-rules-写成一篇长文章" aria-hidden="true">#</a></h3><p>Rules 不是论文。</p><p>它应该像团队开发规范，短句、明确、可执行。</p><p>好的规则：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">禁止使用 System.out.println() 输出日志，必须使用 Slf4j。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>差的规则：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">在现代软件开发过程中，日志系统是非常重要的基础设施，我们应该合理使用日志。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><hr><h2 id="十一、推荐工作流" tabindex="-1">十一、推荐工作流 <a class="header-anchor" href="#十一、推荐工作流" aria-hidden="true">#</a></h2><p>最终推荐你这样使用 Cursor Rules：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">第一步：打开当前 Java 项目</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第二步：让 Cursor 扫描 Controller、Service、Mapper、Entity、DTO、VO、异常、日志、返回结构</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第三步：生成项目级 Rules</span></span>
<span class="line"><span style="color:#babed8;">路径：.cursor/rules/java-project-style.mdc</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第四步：从项目级 Rules 中提炼通用 Java Rules</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第五步：把通用 Java Rules 粘贴到 Cursor User Rules</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">第六步：以后每个新项目都保留全局规则，再根据项目生成项目级规则</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>可以总结成一句话：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">全局 Rules 负责你的编码底线，项目 Rules 负责当前项目的特殊风格。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><hr><h2 id="十二、总结" tabindex="-1">十二、总结 <a class="header-anchor" href="#十二、总结" aria-hidden="true">#</a></h2><p>让 Cursor 更懂你的 Java 项目，不是靠反复提醒它：</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#babed8;">你按我项目风格写。</span></span>
<span class="line"><span style="color:#babed8;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>而是要把项目风格变成明确的 Rules。</p><p>最好的方式是：</p><ol><li>让 Cursor 先扫描当前项目</li><li>生成 <code>.cursor/rules/java-project-style.mdc</code></li><li>再提炼出通用 Java 全局规范</li><li>粘贴到 Cursor 的 User Rules</li><li>以后所有 Java 项目都能复用这套规范</li></ol><p>Cursor Rules 的价值不只是“让 AI 听话”，更重要的是把你的开发习惯、团队规范、代码边界沉淀成一套稳定的工程约束。</p><p>当你把这些规则写清楚之后，Cursor 生成的代码会更像你团队里的一个熟练工程师，而不是一个只会补全代码的工具。</p><hr><h2 id="知识卡片" tabindex="-1">知识卡片 <a class="header-anchor" href="#知识卡片" aria-hidden="true">#</a></h2><div class="language-markdown line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;"># </span><span style="color:#FFCB6B;">Cursor Java Rules 使用方法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">核心结论</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">Cursor Rules 是给 Cursor 的长期开发规范。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">推荐做法：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">1.</span><span style="color:#BABED8;"> 当前项目生成项目级 Rules</span></span>
<span class="line"><span style="color:#89DDFF;">2.</span><span style="color:#BABED8;"> 从项目级 Rules 提炼通用 Java Rules</span></span>
<span class="line"><span style="color:#89DDFF;">3.</span><span style="color:#BABED8;"> 把通用 Java Rules 放入 Cursor User Rules</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">项目级 Rules 适合放什么</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 项目目录结构</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 当前项目统一返回对象</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 当前项目异常处理规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 当前项目 DTO / VO / Entity 使用方式</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 当前项目 Mapper / Repository 规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 当前项目日志风格</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 当前项目测试规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">全局 Rules 适合放什么</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Java 命名规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Spring Boot 分层规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Controller / Service / Mapper 职责边界</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 日志规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 异常规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 参数校验规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 返回值规范</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 测试规范</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">一句话记忆</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">全局 Rules 是编码底线，项目 Rules 是项目风格。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">## </span><span style="color:#FFCB6B;">常见错误</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 把项目特有规则放进全局</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> Rules 写得太抽象</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 只写“高质量代码”</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不区分 Controller / Service / Mapper 职责</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> 不让 Cursor 先扫描已有代码</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><hr><h2 id="md-导出建议" tabindex="-1"><code>.md</code> 导出建议 <a class="header-anchor" href="#md-导出建议" aria-hidden="true">#</a></h2><ul><li>使用 UTF-8 编码保存。</li><li>文件名建议使用 kebab-case，例如：<code>cursor-java-rules-guide.md</code>。</li><li>保持一级标题唯一，避免标题层级跳跃。</li><li>检查代码块、列表缩进、引用符号是否规范。</li><li>如果后续要转 Word 或 PDF，建议先检查标题层级和代码块显示效果。</li></ul>`,132)])])}const y=n(p,[["render",r]]);export{d as __pageData,y as default};
