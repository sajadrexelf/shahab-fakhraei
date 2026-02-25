import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getDB, Article } from "../../lib/db";
import { generateSlug } from "../../lib/utils";
import { Save, ArrowRight, Image as ImageIcon } from "lucide-react";

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [article, setArticle] = useState<Partial<Article>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    pillar: "طراحی مدل کسب‌وکار",
    tags: [],
    author: "تیم آکادمی",
    status: "draft",
    featuredImage: "",
    seoTitle: "",
    seoDescription: ""
  });

  const [tagsInput, setTagsInput] = useState("");

  const pillars = [
    'طراحی مدل کسب‌وکار',
    'سیستم‌های رشد و بازاریابی',
    'مقياس‌پذیری و سیستم‌سازی',
    'رهبری و تصمیم‌گیری استراتژیک'
  ];

  useEffect(() => {
    if (!isNew) {
      async function loadArticle() {
        const db = await getDB();
        const a = await db.get("articles", id!);
        if (a) {
          setArticle(a);
          setTagsInput(a.tags.join(", "));
        }
      }
      loadArticle();
    }
  }, [id, isNew]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setArticle(prev => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug,
      seoTitle: isNew ? title : prev.seoTitle
    }));
  };

  const handleSave = async () => {
    if (!article.title || !article.content) {
      alert("عنوان و محتوا الزامی است.");
      return;
    }

    const db = await getDB();
    const finalArticle: Article = {
      id: isNew ? `art_${Date.now()}` : id!,
      title: article.title || "",
      slug: article.slug || generateSlug(article.title || ""),
      content: article.content || "",
      excerpt: article.excerpt || "",
      pillar: article.pillar || pillars[0],
      tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      author: article.author || "تیم آکادمی",
      publishedAt: article.publishedAt || Date.now(),
      status: article.status as 'draft' | 'published',
      featuredImage: article.featuredImage || "https://picsum.photos/seed/placeholder/800/600",
      seoTitle: article.seoTitle || article.title || "",
      seoDescription: article.seoDescription || article.excerpt || ""
    };

    await db.put("articles", finalArticle);
    navigate("/admin/articles");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Helmet>
        <title>{isNew ? "مقاله جدید" : "ویرایش مقاله"} | مدیریت آکادمی</title>
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/admin/articles")} className="text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowRight size={24} />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{isNew ? "ایجاد مقاله جدید" : "ویرایش مقاله"}</h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={article.status}
            onChange={(e) => setArticle({ ...article, status: e.target.value as 'draft' | 'published' })}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-slate-900 text-sm"
          >
            <option value="draft">پیشنویس</option>
            <option value="published">منتشر شده</option>
          </select>
          <button onClick={handleSave} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Save size={18} />
            ذخیره
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">عنوان مقاله</label>
            <input
              type="text"
              value={article.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 text-lg font-bold"
              placeholder="عنوان جذاب مقاله..."
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">محتوا (Markdown)</label>
            <textarea
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono text-sm leading-relaxed resize-y"
              placeholder="## مقدمه..."
              dir="rtl"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-medium text-slate-700 mb-2">خلاصه مقاله (Excerpt)</label>
            <textarea
              value={article.excerpt}
              onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 resize-none"
              placeholder="خلاصه‌ای کوتاه برای نمایش در لیست مقالات..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">تنظیمات انتشار</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">ستون محتوایی</label>
                <select
                  value={article.pillar}
                  onChange={(e) => setArticle({ ...article, pillar: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm"
                >
                  {pillars.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">نویسنده</label>
                <input
                  type="text"
                  value={article.author}
                  onChange={(e) => setArticle({ ...article, author: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">برچسب‌ها (با کاما جدا کنید)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="سئو, بازاریابی, رشد"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon size={18} />
              تصویر شاخص
            </h3>
            <div className="space-y-4">
              {article.featuredImage && (
                <div className="aspect-video rounded-lg overflow-hidden border border-slate-200">
                  <img src={article.featuredImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <input
                type="text"
                value={article.featuredImage}
                onChange={(e) => setArticle({ ...article, featuredImage: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm"
                placeholder="آدرس تصویر (URL)"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">تنظیمات سئو (SEO)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">نامک (Slug)</label>
                <input
                  type="text"
                  value={article.slug}
                  onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm text-left"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">عنوان سئو (Meta Title)</label>
                <input
                  type="text"
                  value={article.seoTitle}
                  onChange={(e) => setArticle({ ...article, seoTitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">توضیحات سئو (Meta Description)</label>
                <textarea
                  value={article.seoDescription}
                  onChange={(e) => setArticle({ ...article, seoDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
