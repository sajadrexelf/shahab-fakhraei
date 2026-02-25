import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { getDB, Article } from "../../lib/db";
import { ArrowRight, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      const db = await getDB();
      const a = await db.getFromIndex("articles", "by-slug", slug);
      if (a) {
        setArticle(a);
        const all = await db.getAllFromIndex("articles", "by-pillar", a.pillar);
        setRelatedArticles(all.filter(x => x.id !== a.id && x.status === 'published').slice(0, 3));
      }
    }
    loadArticle();
  }, [slug]);

  if (!article) return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.seoTitle,
    "image": [article.featuredImage],
    "datePublished": new Date(article.publishedAt).toISOString(),
    "author": [{
      "@type": "Person",
      "name": article.author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "آکادمی رشد",
      "logo": {
        "@type": "ImageObject",
        "url": "https://picsum.photos/seed/logo/100/100"
      }
    },
    "description": article.seoDescription
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>{article.seoTitle} | آکادمی رشد</title>
        <meta name="description" content={article.seoDescription} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 gap-2">
          <Link to="/" className="hover:text-slate-900 transition-colors">خانه</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-slate-900 transition-colors">مقالات</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
            {article.pillar}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-slate-200 py-4">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(article.publishedAt).toLocaleDateString('fa-IR')}</span>
            </div>
            <div className="flex items-center gap-4 mr-auto">
              <span className="font-medium text-slate-700">اشتراک‌گذاری:</span>
              <button className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={18} /></button>
              <button className="text-slate-400 hover:text-blue-400 transition-colors"><Twitter size={18} /></button>
              <button className="text-slate-400 hover:text-blue-800 transition-colors"><Facebook size={18} /></button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-16">
          <div className="prose prose-slate prose-lg max-w-none rtl:prose-p:text-right rtl:prose-headings:text-right prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl prose-img:shadow-md">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
            <Tag size={20} className="text-slate-400 ml-2" />
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-slate-200 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Lead Magnet Inline */}
        <div className="bg-blue-600 text-white rounded-3xl p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">دانلود چک‌لیست مرتبط با این مقاله</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">برای پیاده‌سازی مفاهیم این مقاله، چک‌لیست اجرایی ما را به صورت رایگان دریافت کنید.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="ایمیل شما..." className="flex-1 px-4 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button type="submit" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                ارسال لینک دانلود
              </button>
            </form>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">مقالات مرتبط</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link key={rel.id} to={`/blog/${rel.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden relative">
                    <img src={rel.featuredImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{rel.title}</h4>
                    <p className="text-slate-600 text-sm line-clamp-2">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
