import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Mic, Video, TrendingUp, Target, Users, Settings } from "lucide-react";
import { getDB, Article, Podcast, SiteSettings } from "../../lib/db";

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [latestPodcasts, setLatestPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    async function loadData() {
      const db = await getDB();
      const s = await db.get("settings", "global");
      if (s) setSettings(s);

      const allArticles = await db.getAllFromIndex("articles", "by-status", "published");
      setLatestArticles(allArticles.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 3));

      const allPodcasts = await db.getAllFromIndex("podcasts", "by-status", "published");
      setLatestPodcasts(allPodcasts.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 2));
    }
    loadData();
  }, []);

  const pillars = [
    { title: "طراحی مدل کسب‌وکار", icon: Target, desc: "اعتبارسنجی ایده و ساخت مدل‌های درآمدی مقیاس‌پذیر", color: "bg-blue-50 text-blue-600" },
    { title: "سیستم‌های رشد و بازاریابی", icon: TrendingUp, desc: "استراتژی‌های جذب مشتری و بهینه‌سازی قیف فروش", color: "bg-emerald-50 text-emerald-600" },
    { title: "مقياس‌پذیری و سیستم‌سازی", icon: Settings, desc: "خودکارسازی فرآیندها و رهایی از عملیات روزمره", color: "bg-purple-50 text-purple-600" },
    { title: "رهبری و تصمیم‌گیری استراتژیک", icon: Users, desc: "مدیریت تیم، هوش هیجانی و تصمیم‌گیری داده‌محور", color: "bg-amber-50 text-amber-600" },
  ];

  if (!settings) return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;

  return (
    <div className="w-full">
      <Helmet>
        <title>{settings.heroTitle} | آکادمی رشد</title>
        <meta name="description" content={settings.heroSubtitle} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero/1920/1080')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            {settings.heroTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
          >
            {settings.heroSubtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/blog" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              شروع یادگیری <ArrowLeft size={18} />
            </Link>
            <Link to="/newsletter" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors border border-slate-700">
              عضویت در خبرنامه
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">ستون‌های محتوایی آکادمی</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">ما در چهار حوزه کلیدی به شما کمک می‌کنیم تا کسب‌وکار خود را از یک ایده خام به یک سازمان سیستم‌سازی شده تبدیل کنید.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${pillar.color}`}>
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">تازه‌ترین مقالات تحلیلی</h2>
              <p className="text-slate-600">چارچوب‌های اجرایی و راهنمای گام‌به‌گام</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
              مشاهده همه <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Link key={article.id} to={`/blog/${article.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
                <div className="aspect-video overflow-hidden relative">
                  <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800">
                    {article.pillar}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-xs text-slate-500 gap-4">
                    <span>{new Date(article.publishedAt).toLocaleDateString('fa-IR')}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-900 font-medium bg-white px-6 py-3 rounded-lg border border-slate-200">
              مشاهده همه مقالات <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-700/50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 border border-blue-500/30">
            <div className="flex-1 text-center md:text-right">
              <h2 className="text-3xl font-bold mb-4">چک‌لیست جامع رشد کسب‌وکار</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                ۱۰۰ اقدام کلیدی که هر کسب‌وکار برای رسیدن به رشد پایدار و مقیاس‌پذیری باید انجام دهد. این چک‌لیست حاصل تحلیل صدها استارتاپ موفق است.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="ایمیل کاری شما..." className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button type="submit" className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap">
                  دانلود رایگان
                </button>
              </form>
              <p className="text-xs text-blue-200 mt-3">بدون اسپم. لغو عضویت در هر زمان.</p>
            </div>
            <div className="w-full md:w-1/3 aspect-[3/4] bg-blue-800 rounded-xl shadow-2xl flex items-center justify-center border border-blue-600/50 transform rotate-3">
              <div className="text-center p-6">
                <BookOpen size={48} className="mx-auto mb-4 text-blue-300" />
                <div className="text-xl font-bold">Growth Checklist</div>
                <div className="text-sm text-blue-300 mt-2">2024 Edition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Podcasts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">پادکست توسعه کسب‌وکار</h2>
              <p className="text-slate-600">گفتگو با مدیران و کارآفرینان موفق</p>
            </div>
            <Link to="/podcast" className="hidden md:flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
              آرشیو پادکست‌ها <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPodcasts.map((podcast) => (
              <div key={podcast.id} className="flex flex-col sm:flex-row gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-300 transition-colors">
                <div className="w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden relative">
                  <img src={podcast.featuredImage} alt={podcast.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg">
                      <Mic size={20} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-xs font-semibold text-blue-600 mb-2">{podcast.duration} دقیقه</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{podcast.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">{podcast.description}</p>
                  <Link to={`/podcast/${podcast.slug}`} className="text-sm font-medium text-slate-900 flex items-center gap-1 hover:text-blue-600 transition-colors mt-auto">
                    گوش دادن <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {settings.showTestimonials && (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">نظرات دانشجویان و مدیران</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">داستان موفقیت کسانی که با استفاده از چارچوب‌های آکادمی رشد، کسب‌وکار خود را متحول کردند.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "علی رضایی", role: "مدیرعامل استارتاپ فین‌تک", text: "آموزش‌های آکادمی رشد به ما کمک کرد تا در کمتر از ۶ ماه، نرخ تبدیل خود را ۳۰۰٪ افزایش دهیم. چارچوب‌های ارائه شده کاملاً اجرایی هستند." },
                { name: "سارا محمدی", role: "هم‌بنیان‌گذار آژانس دیجیتال", text: "بهترین منبع برای یادگیری سیستم‌سازی. من توانستم با پیاده‌سازی این اصول، وابستگی کسب‌وکار به خودم را به حداقل برسانم." },
                { name: "محمد کریمی", role: "مدیر مارکتینگ", text: "پادکست‌ها و مقالات آکادمی رشد، دیدگاه من را نسبت به بازاریابی B2B کاملاً تغییر داد. محتوایی عمیق و به دور از کلیشه‌ها." }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                  <div className="absolute top-8 right-8 text-6xl text-blue-100 font-serif leading-none">"</div>
                  <p className="text-slate-700 leading-relaxed mb-8 relative z-10">{t.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {settings.showFAQ && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">سوالات متداول</h2>
              <p className="text-slate-600">پاسخ به پرتکرارترین سوالات شما درباره آکادمی رشد.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "آیا محتوای آکادمی برای کسب‌وکارهای سنتی هم مناسب است؟", a: "بله، اصول سیستم‌سازی و رهبری که در آکادمی آموزش داده می‌شود، برای تمامی کسب‌وکارها (سنتی و آنلاین) قابل اجرا است." },
                { q: "چگونه می‌توانم به دوره‌های تخصصی دسترسی پیدا کنم؟", a: "در حال حاضر تمرکز ما بر روی مقالات، پادکست‌ها و ویدیوهای رایگان است. دوره‌های تخصصی به زودی در بخش مجزایی ارائه خواهند شد." },
                { q: "آیا امکان مشاوره اختصاصی وجود دارد؟", a: "بله، شما می‌توانید از طریق صفحه تماس با ما، درخواست مشاوره اختصاصی خود را ثبت کنید تا همکاران ما با شما تماس بگیرند." },
                { q: "چگونه می‌توانم از جدیدترین مطالب مطلع شوم؟", a: "بهترین راه، عضویت در خبرنامه ایمیلی آکادمی است. ما هر هفته جدیدترین مقالات و پادکست‌ها را برای اعضا ارسال می‌کنیم." }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
