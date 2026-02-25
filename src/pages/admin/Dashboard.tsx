import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getDB } from "../../lib/db";
import { FileText, Mic, Video, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    podcasts: 0,
    videos: 0,
    leads: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const db = await getDB();
      const articlesCount = await db.count("articles");
      const podcastsCount = await db.count("podcasts");
      const videosCount = await db.count("videos");
      const leadsCount = await db.count("leads");

      setStats({
        articles: articlesCount,
        podcasts: podcastsCount,
        videos: videosCount,
        leads: leadsCount,
      });
    }
    loadStats();
  }, []);

  const statCards = [
    { title: "مقالات منتشر شده", value: stats.articles, icon: FileText, color: "bg-blue-100 text-blue-600", link: "/admin/articles" },
    { title: "اپیزودهای پادکست", value: stats.podcasts, icon: Mic, color: "bg-purple-100 text-purple-600", link: "/admin/podcasts" },
    { title: "ویدیوهای آموزشی", value: stats.videos, icon: Video, color: "bg-emerald-100 text-emerald-600", link: "/admin/videos" },
    { title: "لیدهای جمع‌آوری شده", value: stats.leads, icon: Users, color: "bg-amber-100 text-amber-600", link: "/admin/leads" },
  ];

  return (
    <div>
      <Helmet>
        <title>داشبورد مدیریت | آکادمی رشد</title>
      </Helmet>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">خوش آمدید، مدیر</h1>
          <p className="text-slate-500">خلاصه‌ای از وضعیت آکادمی شما.</p>
        </div>
        <Link to="/admin/articles/new" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
          <FileText size={18} />
          مقاله جدید
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <Link key={idx} to={stat.link} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">روند رشد لیدها</h2>
            <TrendingUp className="text-slate-400" size={20} />
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
            <p className="text-slate-400 text-sm">نمودار در اینجا قرار می‌گیرد (نیاز به کتابخانه چارت)</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">آخرین فعالیت‌ها</h2>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">مقاله جدید منتشر شد</p>
                  <p className="text-xs text-slate-500">۲ ساعت پیش</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
