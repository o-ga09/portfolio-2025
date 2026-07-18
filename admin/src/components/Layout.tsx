import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "概要", end: true },
  { to: "/pages", label: "ページ別" },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:w-56 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 px-2 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">o-ga09</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Dashboard</div>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 -mr-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            aria-label="メニューを閉じる"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            aria-label="メニューを開く"
          >
            <MenuIcon />
          </button>
          <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            View / Uniques ダッシュボード
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
