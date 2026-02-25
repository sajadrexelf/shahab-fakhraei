import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getDB, Article } from "../../lib/db";
import { ArrowLeft, Search, Filter } from "lucide-react";

export default function BlogHub() {
  const { pillar: urlPillar } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPillar, setSelectedPillar] = useState<string>("all");

  const pillars = [
    'طراحی مدل کسب‌وکار',
    'سیستم‌های رشد و بازاریابی',
    'مقياس‌پذیری و سیستم‌سازی',
    'رهبری و تصمیم‌گیری استراتژیک'
  ];

  const pillarMap: Record<string, string> = {
    'business-model': 'طراحی مدل کسب‌وکار',
    'marketing': 'سیستم‌های رشد و بازاریابی',
    'systemization': 'مقياس‌پذیری و سیستم‌سازی',
    'leadership': 'رهبری و تصمیم‌گیری استراتژیک'
  };

  useEffect(() => {
    if (urlPillar && pillarMap[urlPillar]) {
      setSelectedPillar(pillarMap[urlPillar]);
    } else {
      setSelectedPillar("all");
    }
  }, [urlPillar]);

  useEffect(() => {
    async function loadArticles() {
      const db = await getDB();
      const all = await db.getAllFromIndex("articles", "by-status", "published");
      const sorted = all.sort((a, b) => b.publishedAt - a.publishedAt);
      setArticles(sorted);
      setFilteredArticles(sorted);
    }
    loadArticles();
  }, []);

  useEffect(() => {
    let result = articles;
    if (selectedPillar !== "all") {
      result = result.filter(a => a.pillar === selectedPillar);
    }
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(lowerTerm) || 
        a.excerpt.toLowerCase().includes(lowerTerm) ||
        a.tags.some(t => t.toLowerCase().includes(lowerTerm))
      );
    }
    setFilteredArticles(result);
  }, [searchTerm, selectedPillar, articles]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>مقالات آموزشی | آکادمی رشد</title>
        <meta name="description" content="جدیدترین مقالات و تحلیل‌های حوزه توسعه کسب‌وکار، بازاریابی، سیستم‌سازی و رهبری." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">پایگاه دانش توسعه کسب‌وکار</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            مقالاتی عمیق، داده‌محور و کاربردی برای مدیران و کارآفرینانی که به دنبال رشد پایدار هستند.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button
              onClick={() => setSelectedPillar("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedPillar === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              همه مقالات
            </button>
            {pillars.map(pillar => (
              <button
                key={pillar}
                onClick={() => setSelectedPillar(pillar)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedPillar === pillar ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {pillar}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link key={article.id} to={`/blog/${article.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800">
                    {article.pillar}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center text-xs text-slate-500 gap-3">
                      <span>{new Date(article.publishedAt).toLocaleDateString('fa-IR')}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>
                    <ArrowLeft size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Filter className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">مقاله‌ای یافت نشد</h3>
            <p className="text-slate-500">با کلمات کلیدی دیگر جستجو کنید یا فیلترها را تغییر دهید.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedPillar("all"); }}
              className="mt-6 px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
