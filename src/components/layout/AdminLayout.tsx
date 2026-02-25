import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Mic, Video, Users, Settings, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: "داشبورد", href: "/admin", icon: LayoutDashboard },
    { name: "مقالات", href: "/admin/articles", icon: FileText },
    { name: "پادکست‌ها", href: "/admin/podcasts", icon: Mic },
    { name: "ویدیوها", href: "/admin/videos", icon: Video },
    { name: "لیدها", href: "/admin/leads", icon: Users },
    { name: "تنظیمات", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 right-0 z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/admin" className="text-xl font-bold text-white">
            پنل مدیریت
          </Link>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} />
            بازگشت به سایت
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800">
            {navItems.find((item) => item.href === location.pathname)?.name || "مدیریت"}
          </h1>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
