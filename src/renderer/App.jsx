import React, { useState } from "react";
import {
  Headphones,
  Laptop,
  MessageSquare,
  MinusCircle,
  Pause,
  Pencil,
  Play,
  PlayCircle,
  Plus,
  PlusCircle,
  RotateCcw,
  Star,
  ThumbsUp,
  Trash2,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

const filterOptions = ["全部", "运行中", "已停止", "点赞封禁"];
const tabOptions = ["管理", "账号", "任务设置", "联系客服"];

const Header = ({ onShowTutorial }) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        <span className="header-title">炎龙助手1.0.0</span>
        <a className="header-link" href="#">
          官方开户注册链接
        </a>
      </div>
      <div className="header-right">
        <button className="header-guide" type="button" onClick={onShowTutorial}>
          使用教程
        </button>
        <div className="window-controls" aria-label="窗口控制">
          <button className="window-btn" type="button" aria-label="最小化">
            <span className="window-icon">—</span>
          </button>
          <button
            className="window-btn window-close"
            type="button"
            aria-label="关闭"
          >
            <span className="window-icon">×</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const FilterButtons = ({ active, onChange }) => {
  return (
    <div className="filter-group" role="tablist" aria-label="状态过滤">
      {filterOptions.map((label) => (
        <button
          key={label}
          type="button"
          className={`filter-btn ${active === label ? "is-active" : ""}`}
          onClick={() => onChange(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const DataTable = ({ rows, selectedIds, onToggleRow, onToggleAll }) => {
  const selectedSet = new Set(selectedIds);
  const allSelected =
    rows.length > 0 && rows.every((row) => selectedSet.has(row.id));
  const someSelected = rows.some((row) => selectedSet.has(row.id));
  const selectAllRef = React.useRef(null);

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th rowSpan={2} className="col-check">
              <input
                type="checkbox"
                aria-label="全选"
                ref={selectAllRef}
                checked={allSelected}
                onChange={onToggleAll}
              />
            </th>
            <th rowSpan={2}>端口</th>
            <th rowSpan={2}>登录</th>
            <th rowSpan={2}>状态</th>
            <th rowSpan={2}>日志</th>
            <th colSpan={3}>点赞</th>
            <th colSpan={3}>关注</th>
            <th rowSpan={2}>播放</th>
          </tr>
          <tr>
            <th>成功</th>
            <th>失败</th>
            <th>预估解封</th>
            <th>成功</th>
            <th>失败</th>
            <th>预估解封</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={12} className="empty-state">
                暂无数据
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`选择端口${row.port}`}
                    checked={selectedSet.has(row.id)}
                    onChange={() => onToggleRow(row.id)}
                  />
                </td>
                <td>{row.port}</td>
                <td>{row.username || "--"}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === "在线"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td></td>
                <td className="text-green-600">{row.like.success}</td>
                <td className="text-red-500">{row.like.fail}</td>
                <td className="text-red-500 text-xs">{row.like.unban}</td>
                <td className="text-green-600">{row.follow.success}</td>
                <td className="text-red-500">{row.follow.fail}</td>
                <td className="text-red-500 text-xs">{row.follow.unban}</td>
                <td className="text-green-600">{row.play.success}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const SidebarTabs = ({ active, onChange }) => {
  return (
    <div className="sidebar-tabs" role="tablist">
      {tabOptions.map((label) => (
        <button
          key={label}
          type="button"
          className={`tab-item ${active === label ? "is-active" : ""}`}
          onClick={() => onChange(label)}
        >
          <span className="tab-icon" aria-hidden="true"></span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

const ActionButton = ({
  className,
  icon: Icon,
  label,
  badge,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`action-btn ${className} ${disabled ? "is-disabled" : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {Icon ? <Icon size={18} /> : null}
      <span>{label}</span>
      {badge ? (
        <span className="action-badge">
          <Zap size={12} />
        </span>
      ) : null}
    </button>
  );
};

const ManagementContent = ({
  onCreateBrowser,
  onDelete,
  onStart,
  onStop,
  hasSelection,
  canStart,
  canStop,
}) => {
  return (
    <div className="sidebar-scroll">
      <section className="panel-block">
        <div className="panel-title">
          <h2>浏览器操作</h2>
          <span className="title-line"></span>
        </div>

        <div className="group-label">浏览器管理</div>
        <div className="action-group">
          <ActionButton
            className="btn-emerald"
            icon={Plus}
            label="创建浏览器"
            badge
            onClick={onCreateBrowser}
          />
          <ActionButton
            className="btn-red"
            icon={Trash2}
            label="删除浏览器"
            disabled={!hasSelection}
            onClick={onDelete}
          />
          <ActionButton className="btn-blue" label="一键检测是否掉线或未登录" />
        </div>

        <div className="group-label">运行控制</div>
        <div className="action-group">
          <ActionButton
            className="btn-blue"
            icon={Play}
            label="启动浏览器"
            disabled={!canStart}
            onClick={onStart}
          />
          <ActionButton
            className="btn-orange"
            icon={Pause}
            label="停止浏览器"
            disabled={!canStop}
            onClick={onStop}
          />
        </div>

        <div className="group-label">数据管理</div>
        <div className="action-group">
          <ActionButton
            className="btn-blue"
            icon={RotateCcw}
            label="清空数据"
          />
        </div>
      </section>

      <section className="stats-card">
        <div className="panel-title">
          <h3>统计信息</h3>
          <span className="title-line"></span>
        </div>
        <div className="stats-grid">
          <div className="stats-item">
            <ThumbsUp size={20} />
            <div>
              <span>点赞预估总数</span>
              <strong>0</strong>
            </div>
          </div>
          <div className="stats-item">
            <UserPlus size={20} />
            <div>
              <span>关注预估总数</span>
              <strong>0</strong>
            </div>
          </div>
          <div className="stats-item">
            <Star size={20} />
            <div>
              <span>收藏预估总数</span>
              <strong>0</strong>
            </div>
          </div>
          <div className="stats-item">
            <PlayCircle size={20} />
            <div>
              <span>播放预估总数</span>
              <strong>0</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactContent = () => {
  return (
    <div className="sidebar-scroll">
      <section className="bg-gray-50 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col gap-2 pb-3 border-b-2 border-blue-500">
          <h2 className="text-base font-semibold text-gray-900">软件信息</h2>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <Laptop className="text-blue-500" size={22} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">当前版本号</span>
              <strong className="text-sm text-gray-900">1.0.0</strong>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <Headphones className="text-blue-500" size={22} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">平台客服</span>
              <span className="text-sm text-gray-900">
                https://t.me/YL65666
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 flex items-center gap-3">
            <MessageSquare className="text-blue-500" size={22} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">平台通知群</span>
              <span className="text-sm text-gray-900">
                https://t.me/YL65666
              </span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-red-500">
          平台免费开户，软件免费使用，请勿被骗
        </div>
      </section>
    </div>
  );
};

const TaskSettingsContent = () => {
  return (
    <div className="sidebar-scroll">
      <section className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col gap-2 pb-3 border-b-2 border-blue-500 mb-4">
          <h2 className="text-base font-semibold text-gray-900">操作配置</h2>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-3">
          <div className="flex items-center space-x-2 text-sm text-gray-900">
            <input type="checkbox" defaultChecked className="accent-blue-500" />
            <span className="font-medium">点赞</span>
            <span className="text-xs text-gray-500">数量</span>
            <input
              type="text"
              className="h-8 w-16 rounded-md border border-gray-200 bg-white px-2 text-sm"
            />
            <span className="text-xs text-gray-500">失败</span>
            <input
              type="text"
              className="h-8 w-16 rounded-md border border-gray-200 bg-white px-2 text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-900">
            <input type="checkbox" className="accent-blue-500" />
            <span className="font-medium">关注</span>
            <span className="text-xs text-gray-500">数量</span>
            <input
              type="text"
              className="h-8 w-16 rounded-md border border-gray-200 bg-white px-2 text-sm"
            />
            <span className="text-xs text-gray-500">失败</span>
            <input
              type="text"
              className="h-8 w-16 rounded-md border border-gray-200 bg-white px-2 text-sm"
            />
          </div>
          <div className="text-xs text-gray-500 leading-5">
            <p>ps：</p>
            <p>点赞建议设置5000，失败50</p>
            <p>关注建议设置200，失败10</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-2">
          <label className="flex items-center space-x-2 text-sm text-gray-900 font-medium">
            <input type="checkbox" defaultChecked className="accent-blue-500" />
            <span>不加载视频</span>
          </label>
          <p className="text-xs text-gray-500">
            不建议开启，看电脑性能，自行测试
          </p>
        </div>
      </section>
    </div>
  );
};

const CreateBrowserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    port: "0",
    proxyMode: "HTTP",
    proxyIp: "",
    proxyPort: "",
    username: "",
    password: "",
    remark: "",
    ck: "",
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormValues({
        port: "0",
        proxyMode: "HTTP",
        proxyIp: "",
        proxyPort: "",
        username: "",
        password: "",
        remark: "",
        ck: "",
      });
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-[500px] rounded-lg shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 relative">
          <h2 className="text-center text-base font-semibold text-gray-900">
            创建浏览器
          </h2>
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="关闭"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 grid gap-4">
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">端口</span>
            <input
              type="text"
              value={formValues.port}
              onChange={handleChange("port")}
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">代理模式</span>
            <select
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
              value={formValues.proxyMode}
              onChange={handleChange("proxyMode")}
            >
              <option>HTTP</option>
            </select>
          </div>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">代理IP</span>
            <input
              type="text"
              placeholder="例：127.0.0.1"
              value={formValues.proxyIp}
              onChange={handleChange("proxyIp")}
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">代理端口</span>
            <input
              type="text"
              placeholder="例：8080"
              value={formValues.proxyPort}
              onChange={handleChange("proxyPort")}
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">用户名</span>
            <input
              type="text"
              placeholder="认证用户名（可选）"
              value={formValues.username}
              onChange={handleChange("username")}
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">密码</span>
            <input
              type="password"
              placeholder="认证密码（可选）"
              value={formValues.password}
              onChange={handleChange("password")}
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            <span className="text-sm text-gray-600 text-right">备注</span>
            <input
              type="text"
              value={formValues.remark}
              onChange={handleChange("remark")}
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="grid grid-cols-[80px_1fr] items-start gap-3">
            <span className="text-sm text-gray-600 text-right pt-2">CK</span>
            <textarea
              className="bg-gray-100 rounded px-3 py-2 text-sm outline-none h-24 resize-none"
              value={formValues.ck}
              onChange={handleChange("ck")}
            ></textarea>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            className="bg-gray-100 text-gray-800 rounded px-4 py-2 text-sm hover:bg-gray-200"
            onClick={onClose}
          >
            取消
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700"
            onClick={handleSubmit}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

const TUTORIAL_ITEMS = [
  {
    title: "Q1：软件如何使用",
    content:
      "1.在平台设置中登录自己账号 保存配置 2.创建浏览器端口随便写 3.在任务设置勾选要做的任务和数量以及连续失败次数 4.在浏览器列表中选择浏览器 5.点击开始任务",
  },
  {
    title: "Q2：如何管理多个浏览器",
    content:
      "在浏览器管理中创建多个端口配置，保存后即可在列表中批量选择并统一执行任务。",
  },
  {
    title: "Q3：任务执行失败怎么办",
    content:
      "优先检查代理与登录状态，确认任务参数是否合理，必要时降低数量并观察失败次数。",
  },
];

const TutorialModal = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-lg shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-100 relative">
          <h2 className="text-center text-base font-semibold text-gray-900">
            使用教程
          </h2>
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            aria-label="关闭"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {TUTORIAL_ITEMS.map((item) => (
            <article
              key={item.title}
              className="bg-slate-50 border border-slate-100 rounded-md p-4"
            >
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const BrowserRow = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusClasses =
    data.status === "在线"
      ? "bg-green-100 text-green-600"
      : "bg-orange-100 text-orange-600";

  return (
    <div className="grid grid-cols-[48px_48px_80px_110px_120px_80px_repeat(3,80px)_repeat(3,80px)_80px] items-center py-3 border-b border-gray-100 text-sm">
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center text-blue-500"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? "折叠" : "展开"}
      >
        {isExpanded ? <MinusCircle size={20} /> : <PlusCircle size={20} />}
      </button>
      <div className="flex justify-center">
        <input type="checkbox" className="accent-blue-500" />
      </div>
      <span className="text-gray-900">{data.port}</span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses}`}
      >
        {data.status}
      </span>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            data.isRunning ? "bg-emerald-500" : "bg-gray-300"
          }`}
          aria-pressed={data.isRunning}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              data.isRunning ? "translate-x-6" : "translate-x-1"
            }`}
          ></span>
        </button>
      </div>
      <span></span>
      <span className="w-6 h-6 flex items-center justify-center rounded text-xs bg-green-100 text-green-600">
        {data.like.success}
      </span>
      <span className="w-6 h-6 flex items-center justify-center rounded text-xs bg-red-100 text-red-500">
        {data.like.fail}
      </span>
      <span className="text-xs text-red-500">{data.like.unban}</span>
      <span className="w-6 h-6 flex items-center justify-center rounded text-xs bg-green-100 text-green-600">
        {data.follow.success}
      </span>
      <span className="w-6 h-6 flex items-center justify-center rounded text-xs bg-red-100 text-red-500">
        {data.follow.fail}
      </span>
      <span className="text-xs text-red-500">{data.follow.unban}</span>
      <span className="w-6 h-6 flex items-center justify-center rounded text-xs bg-green-100 text-green-600">
        {data.play.success}
      </span>
      {isExpanded ? (
        <div className="col-span-full bg-gray-50">
          <div className="bg-white border border-gray-100 p-3 m-2 rounded flex items-center gap-4">
            <button
              type="button"
              className="bg-orange-500 text-white px-3 py-1.5 rounded text-xs flex items-center gap-2"
            >
              <Pencil size={14} />
              编辑
            </button>
            <button
              type="button"
              className="bg-green-600 text-white px-3 py-1.5 rounded text-xs flex items-center gap-2"
            >
              <Pencil size={14} />
              提CK
            </button>
            <span className="text-xs text-gray-500">备注------</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SidebarPanel = ({
  onCreateBrowser,
  onDelete,
  onStart,
  onStop,
  hasSelection,
  canStart,
  canStop,
}) => {
  const [active, setActive] = useState("管理");

  return (
    <div className="sidebar-card">
      <SidebarTabs active={active} onChange={setActive} />
      <div className="sidebar-content">
        {active === "管理" ? (
          <ManagementContent
            onCreateBrowser={onCreateBrowser}
            hasSelection={hasSelection}
            canStart={canStart}
            canStop={canStop}
            onDelete={onDelete}
            onStart={onStart}
            onStop={onStop}
          />
        ) : active === "任务设置" ? (
          <TaskSettingsContent />
        ) : active === "联系客服" ? (
          <ContactContent />
        ) : (
          <div className="sidebar-scroll">
            <div className="panel-block">暂未开放</div>
          </div>
        )}
        <button className="primary-btn" type="button">
          保存配置
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isCreateBrowserOpen, setIsCreateBrowserOpen] = useState(false);
  const [browsers, setBrowsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState("全部");
  const storageKey = "browserConfigs";
  const canStart = selectedIds.length === 1;
  const hasSelection = selectedIds.length > 0;
  const hasRunningSelection = selectedIds.some(
    (id) => browsers.find((row) => row.id === id)?.status === "在线",
  );
  const filteredBrowsers = browsers.filter((row) => {
    if (activeFilter === "运行中") {
      return row.status === "在线";
    }
    if (activeFilter === "已停止") {
      return row.status !== "在线";
    }
    if (activeFilter === "点赞封禁") {
      return row.status === "点赞封禁";
    }
    return true;
  });

  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBrowsers(parsed);
        }
      } catch (error) {
        console.warn("Failed to parse saved browser configs.", error);
      }
    }
  }, []);

  React.useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => browsers.some((row) => row.id === id)),
    );
  }, [browsers]);

  React.useEffect(() => {
    if (!window.browserApi?.onCount) {
      return undefined;
    }
    return window.browserApi.onCount(({ id, count }) => {
      setBrowsers((prev) =>
        persistBrowsers(
          prev.map((row) =>
            row.id === id
              ? { ...row, status: count > 0 ? "在线" : "未登录" }
              : row,
          ),
        ),
      );
    });
  }, []);

  const persistBrowsers = (next) => {
    localStorage.setItem(storageKey, JSON.stringify(next));
    return next;
  };

  const handleCreateBrowser = (values) => {
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      port: values.port || "0",
      proxyMode: values.proxyMode,
      proxyIp: values.proxyIp,
      proxyPort: values.proxyPort,
      username: values.username,
      password: values.password,
      remark: values.remark,
      ck: values.ck,
      status: "未登录",
      like: { success: 0, fail: 0, unban: "--:--:--" },
      follow: { success: 0, fail: 0, unban: "--:--:--" },
      play: { success: 0 },
    };

    setBrowsers((prev) => persistBrowsers([newEntry, ...prev]));
  };

  const handleToggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === browsers.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(browsers.map((row) => row.id));
  };

  const updateStatus = (ids, status) => {
    setBrowsers((prev) =>
      persistBrowsers(
        prev.map((row) => (ids.includes(row.id) ? { ...row, status } : row)),
      ),
    );
  };

  const handleStart = async () => {
    if (!canStart) {
      return;
    }
    const id = selectedIds[0];
    if (window.browserApi?.start) {
      await window.browserApi.start(id);
    }
    updateStatus([id], "在线");
  };

  const handleStop = async () => {
    if (!hasSelection) {
      return;
    }
    await Promise.all(
      selectedIds.map((id) =>
        window.browserApi?.stop
          ? window.browserApi.stop(id)
          : Promise.resolve(),
      ),
    );
    updateStatus(selectedIds, "未登录");
  };

  const handleDelete = async () => {
    if (!hasSelection) {
      return;
    }
    await Promise.all(
      selectedIds.map((id) =>
        window.browserApi?.stop
          ? window.browserApi.stop(id)
          : Promise.resolve(),
      ),
    );
    setBrowsers((prev) =>
      persistBrowsers(prev.filter((row) => !selectedIds.includes(row.id))),
    );
    setSelectedIds([]);
  };

  return (
    <div className="app-shell">
      <Header onShowTutorial={() => setIsTutorialOpen(true)} />
      <main className="content-area">
        <section className="main-panel" aria-label="浏览器管理">
          <div className="panel-header">
            <h1>浏览器管理</h1>
            <FilterButtons active={activeFilter} onChange={setActiveFilter} />
          </div>
          <DataTable
            rows={filteredBrowsers}
            selectedIds={selectedIds}
            onToggleRow={handleToggleRow}
            onToggleAll={handleToggleAll}
          />
        </section>
        <aside className="sidebar" aria-label="管理面板">
          <SidebarPanel
            onCreateBrowser={() => setIsCreateBrowserOpen(true)}
            hasSelection={hasSelection}
            canStart={canStart}
            canStop={hasRunningSelection}
            onDelete={handleDelete}
            onStart={handleStart}
            onStop={handleStop}
          />
        </aside>
      </main>
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
      <CreateBrowserModal
        isOpen={isCreateBrowserOpen}
        onClose={() => setIsCreateBrowserOpen(false)}
        onSubmit={handleCreateBrowser}
      />
    </div>
  );
};

export default App;
export { BrowserRow, CreateBrowserModal, TutorialModal };
