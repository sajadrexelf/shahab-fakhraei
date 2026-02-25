import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getDB, Article } from "../../lib/db";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    const db = await getDB();
    const all = await db.getAll("articles");
    setArticles(all.sort((a, b) => b.publishedAt - a.publishedAt));
  }

  async function handleDelete(id: string) {
    if (window.confirm("آیا از حذف این مقاله اطمینان دارید؟")) {
      const db = await getDB();
      await db.delete("articles", id);
      loadArticles();
    }
  }

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.pillar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>مدیریت مقالات | آکادمی رشد</title>
      </Helmet>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">مدیریت مقالات</h1>
          <p className="text-slate-500">لیست تمامی مقالات آموزشی آکادمی.</p>
        </div>
        <Link to="/admin/articles/new" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
          <Plus size={18} />
          مقاله جدید
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="جستجو در عنوان یا ستون محتوایی..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">عنوان مقاله</th>
                <th className="px-6 py-4 font-semibold">ستون محتوایی</th>
                <th className="px-6 py-4 font-semibold">وضعیت</th>
                <th className="px-6 py-4 font-semibold">تاریخ انتشار</th>
                <th className="px-6 py-4 font-semibold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 line-clamp-1">{article.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{article.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{article.pillar}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {article.status === 'published' ? 'منتشر شده' : 'پیشنویس'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(article.publishedAt).toLocaleDateString('fa-IR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <Link to={`/admin/articles/${article.id}`} className="text-blue-600 hover:text-blue-800 transition-colors" title="ویرایش">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 transition-colors" title="حذف">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    مقاله‌ای یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
