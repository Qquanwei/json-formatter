import Link from "next/link";
import ComingSoon from "../../../components/ComingSoon";

const th =
  "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";
const td = "px-3 py-2 text-sm text-slate-700 dark:text-slate-300";

function Flow() {
  const box =
    "flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-center text-xs font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300";
  return (
    <figure className="my-6">
      <div className="flex flex-wrap items-center gap-1.5">
        <div className={box}>抖音内容数据</div>
        <span className="text-slate-400">→</span>
        <div className={box}>找趋势·定选题</div>
        <span className="text-slate-400">→</span>
        <div className={box}>拆爆款结构</div>
        <span className="text-slate-400">→</span>
        <div className={box}>聚合成 JSON 结构化数据</div>
        <span className="text-slate-400">→</span>
        <div className={box}>agent 直接使用</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
        数据从抖音流向 agent 的完整链路
      </figcaption>
    </figure>
  );
}

export default function DouyinViralMcp() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        做内容的都知道，最难的不是“拍”，是“拍什么”和“怎么拍才火”。
      </p>

      <p>
        做 SEO 的人有个成熟打法：先找关键词（写什么），再分析排名靠前的页面（怎么写才能排上去）。数据驱动，不靠拍脑袋。但做短视频的人大多还在靠“刷到啥拍啥”、“感觉这能火”。缺的就是这套“找词 + 拆结构”的工具。
      </p>

      <p>
        所以我们做了一个 <strong>抖音爆款内容 MCP</strong>——把“选题”和“拆爆款”这两件事，都做成数据驱动的流程。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        为什么现在需要这个东西
      </h2>

      <p>先说说创作者圈子的现状，你就明白这个工具的出发点。</p>

      <p>
        短视频的红利期过去了。前两年随便拍点东西都有人看，现在流量变贵、竞争变卷，真正拉开差距的不再是“能不能拍”，而是<strong>选题和结构</strong>。同样一个话题，选题角度不同、开头钩子不同，数据能差一个量级。
      </p>

      <p>
        而选题这件事，大多数人还在靠三种原始方法：
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>刷榜单</strong>：花一两个小时翻热榜、翻对标账号，凭感觉记几个话题；
        </li>
        <li>
          <strong>跟风</strong>：看到谁爆了就跟谁，但往往追的时候热度已经过了；
        </li>
        <li>
          <strong>拍脑袋</strong>：开会头脑风暴，讨论出来的选题往往同质化严重。
        </li>
      </ul>

      <p>
        这三种方法都缺一样东西——<strong>数据</strong>。没有数据，选题就是玄学。SEO 圈早就把这件事做成了流水线，内容圈却还停留在手工业阶段。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        它解决什么问题
      </h2>

      <p>
        SEO 里，一套完整流程是两段：<strong>找词</strong> +{" "}
        <strong>分析竞品</strong>。抖音内容其实也一样：
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
        <table className="w-full min-w-[480px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/60 dark:bg-slate-800/50">
              <th className={th}>SEO</th>
              <th className={th}>抖音创作</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className={td}>关键词搜索量</td>
              <td className={td}>话题 / 标签的热度</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className={td}>搜索趋势（涨还是跌）</td>
              <td className={td}>内容趋势（起量还是过气）</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className={td}>竞品页面结构分析</td>
              <td className={td}>爆款视频的创作结构拆解</td>
            </tr>
            <tr>
              <td className={td}>竞争度</td>
              <td className={td}>同题材竞争激烈程度</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        这个 MCP 就是让 AI agent 能拿到这些信号，回答创作者最常卡住的两个问题：<strong>“我现在该拍什么”</strong> 和{" "}
        <strong>“这条爆款到底做对了什么”</strong>。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        它做什么
      </h2>

      <p>
        一句话：把抖音的内容趋势数据 + 爆款结构数据接进 AI，让 agent 帮你做<strong>选题调研</strong>和
        <strong>爆款拆解</strong>。
      </p>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        第一块：找趋势、定选题（像 SEO 找词）
      </h3>

      <ul className="list-disc space-y-2 pl-5">
        <li>当前正在起量的<strong>话题、标签、BGM</strong></li>
        <li>某个题材的<strong>热度趋势</strong>（上升期还是衰退期）</li>
        <li>同类爆款内容的<strong>共性特征</strong>（时长、题材、人群）</li>
        <li>结合你的账号定位，给出<strong>可执行的选题建议</strong></li>
      </ul>

      <p>
        你不需要手动翻榜单，直接问 agent：“最近一周美妆赛道在起什么量？给我 5
        个适合我账号的选题方向。” 它就能基于数据回答。
      </p>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        第二块：拆爆款结构（像 SEO 分析竞品页面）
      </h3>

      <p>把一条爆款视频交出去，agent 能拆出它“为什么火”：</p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>开头钩子</strong>：前 3 秒是怎么留人的（抛冲突？制造悬念？反常识？）
        </li>
        <li>
          <strong>叙事结构</strong>：冲突—发展—反转—收尾的节奏是怎么铺的
        </li>
        <li>
          <strong>节奏</strong>：镜头切换频率、信息密度、情绪起伏点在哪
        </li>
        <li>
          <strong>结尾引导</strong>：怎么诱导关注、评论、转发
        </li>
        <li>
          <strong>可复用模板</strong>：把上面这些抽象成“钩子公式 + 结构模板”，下次照着套
        </li>
      </ul>

      <p>
        这一步把“看完一百条爆款，自己悟规律”的过程，压缩成“让 agent 直接给你拆好的结构”。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        一个具体例子
      </h2>

      <p>为了说清楚它到底怎么用，举个美妆赛道的例子。</p>

      <p>
        你是一个美妆垂类账号，最近不知道拍什么。你直接在 Claude 里问：
      </p>

      <blockquote className="border-l-2 border-indigo-300 pl-4 text-slate-600 dark:border-indigo-700 dark:text-slate-400">
        “最近美妆赛道在起什么量？结合我账号（平价国货测评）给我 3 个选题，再拆一条对标爆款的结构。”
      </blockquote>

      <p>agent 会先查趋势，给你类似这样的结论：</p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          正在起量的标签：<strong>#早八伪素颜</strong>、<strong>#百元以内国货</strong>；
        </li>
        <li>
          上升期的话题：平价国货 vs 大牌平替（近一周互动量上涨明显）；
        </li>
        <li>
          建议选题：①“3 款百元国货，实测能不能平替大牌”；②“早八 5 分钟伪素颜，全程用国货”；③“国货里被低估的 3 个单品”。
        </li>
      </ul>

      <p>
        接着你让它拆那条对标爆款，它会给出一套结构：开头用“我花了 X 元把某大牌全部换成了国货”制造反差，中间三段实测对比，结尾抛一个争议点引导评论。你就照着这个框架去写脚本，而不是从零开始想。
      </p>

      <p>
        这就是这个 MCP 的价值：<strong>把”选题 + 结构“从玄学变成可复用的流水线</strong>。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        为什么做成 MCP，而不是又一个数据后台
      </h2>

      <p>
        数据后台的问题在于：你得自己会看、会分析。MCP 的价值是<strong>让 AI 来做分析这一步</strong>。
      </p>

      <Flow />

      <p>接成 MCP 之后，agent 能串起一整条工作流：</p>

      <ul className="list-disc space-y-2 pl-5">
        <li>查趋势，找到正在起量的话题；</li>
        <li>结合你的账号定位，筛出适合你的选题；</li>
        <li>拉同类爆款，拆出它们的开头钩子和叙事结构；</li>
        <li>直接产出选题 + 钩子 + 脚本框架。</li>
      </ul>

      <p>
        等于把一个”懂数据的内容策划 + 爆款分析师“装进了你的 AI
        工作流。跟 SEO 工具链思路完全一致——一个服务写文章的人，一个服务做短视频的人。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        和现有做法比，差在哪
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/60 dark:bg-slate-800/50">
              <th className={th}>方式</th>
              <th className={th}>效率</th>
              <th className={th}>数据支撑</th>
              <th className={th}>可复制性</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className={td}>手动刷榜单</td>
              <td className={td}>慢</td>
              <td className={td}>靠感觉</td>
              <td className={td}>差</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className={td}>数据后台</td>
              <td className={td}>中</td>
              <td className={td}>有数据，但得自己分析</td>
              <td className={td}>中</td>
            </tr>
            <tr>
              <td className={td}>抖音爆款内容 MCP</td>
              <td className={td}>快</td>
              <td className={td}>数据 + AI 分析</td>
              <td className={td}>好（模板化）</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        适合谁
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>MCN / 内容策划</strong>：批量产出数据支撑的选题，并拆解爆款结构给团队复用，降低对”灵感“的依赖。
        </li>
        <li>
          <strong>个人创作者</strong>：不知道拍什么、拍了不火的时候，让 agent 给方向和拆解。
        </li>
        <li>
          <strong>矩阵号团队</strong>：快速判断哪些赛道值得进，哪些已经退潮，并把已验证的爆款结构复制到新账号。
        </li>
        <li>
          <strong>代运营 / 服务商</strong>：把”选题 + 结构“作为标准化交付物，提高客单和交付效率。
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        常见问题
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>数据从哪来？</strong>{" "}
          接的是抖音公开的内容与趋势数据，做清洗和结构化后交给 agent，不采集任何个人隐私信息。
        </li>
        <li>
          <strong>怎么接入？</strong> 它是个标准的 MCP 服务，接 Claude Desktop、Cursor、Codex、Workbuddy
          等任意支持 MCP 的客户端即可，无需额外开发。
        </li>
        <li>
          <strong>和写文章用 AI 有什么区别？</strong>{" "}
          写文章是让 AI 直接产出内容；这个 MCP 是给 AI 喂”选题和结构“的数据，让产出有数据支撑，而不是空想。
        </li>
        <li>
          <strong>收费吗？</strong> 上线初期会提供免费额度，具体以正式发布为准。
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        现状与展望
      </h2>

      <p>
        目前聚焦两件事：<strong>找趋势定选题</strong> + <strong>拆爆款结构</strong>。后续会延伸到”内容复盘“（这条为什么爆/为什么不爆）和”标题脚本直接优化“（让
        agent 直接改），形成”选题 → 拆解 → 生产 → 复盘“的闭环。
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        数据落地：用 JSONGuy 把内容聚合成 JSON 结构化数据给 agent 用
      </h2>

      <p>
        上面这些趋势数据和爆款拆解，本质都是一堆结构化数据。要让 agent
        真正用起来，得先把它们整理成干净、可解析的 JSON——这里我们直接用{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy
        </Link>{" "}
        来做落地。
      </p>

      <p>
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy
        </Link>{" "}
        是个纯前端的 JSON 格式化、校验、修复工具，正好接在这个 MCP 后面当”数据整理层“：
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>把抖音趋势、爆款结构这些原始输出，格式化成规范 JSON，agent 直接消费；</li>
        <li>数据里经常混着 Python dict、JSON5，甚至是残缺的 JSON，JSONGuy 都能归一化成标准 JSON；</li>
        <li>自带 JSON 修复能力，脏数据不会再把 agent 的工作流卡住。</li>
      </ul>

      <p>
        整条链路串起来就是：<strong>抖音内容 → 聚合成 JSON 结构化数据 → 接入 Workbuddy / Codex / Cursor / Claude
        直接使用</strong>。选题、拆结构、看趋势，全都变成 agent 一句话的事。
      </p>

      <p>
        如果你已经在用这些客户端做内容策划，不妨把{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy
        </Link>{" "}
        和这个 MCP 一起接进工作流试试。
      </p>

      <ComingSoon
        title="抖音爆款内容 MCP · Coming Soon"
        description="这个 MCP 即将上线。如果你感兴趣，点下面的按钮告诉我们。"
        eventParams={{ product: "douyin_mcp" }}
      />
    </article>
  );
}
