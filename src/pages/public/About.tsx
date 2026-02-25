import { Helmet } from "react-helmet-async";
import { Users, Target, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white py-12">
      <Helmet>
        <title>درباره آکادمی رشد | آکادمی رشد</title>
        <meta name="description" content="داستان شکل‌گیری آکادمی رشد و ماموریت ما برای کمک به کارآفرینان و مدیران." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            ماموریت ما: ساخت کسب‌وکارهای پایدار
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            آکادمی رشد با هدف ارائه آموزش‌های کاربردی، داده‌محور و اجرایی برای کارآفرینان و مدیران ایرانی تاسیس شده است.
          </p>
        </div>

        {/* Image */}
        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl">
          <img src="https://picsum.photos/seed/about/1200/600" alt="تیم آکادمی رشد" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none rtl:prose-p:text-right rtl:prose-headings:text-right mb-16">
          <h2>داستان ما</h2>
          <p>
            بسیاری از کسب‌وکارها در سال‌های اولیه فعالیت خود با شکست مواجه می‌شوند. نه به خاطر ایده بد، بلکه به دلیل عدم آشنایی با اصول سیستم‌سازی، بازاریابی و مدل‌های درآمدی مقیاس‌پذیر. ما در آکادمی رشد تلاش می‌کنیم تا این خلاء آموزشی را پر کنیم.
          </p>
          <h2>چرا آکادمی رشد؟</h2>
          <p>
            برخلاف بسیاری از دوره‌های آموزشی که صرفاً بر مباحث تئوری یا انگیزشی تمرکز دارند، رویکرد ما کاملاً اجرایی و مبتنی بر چارچوب‌های اثبات شده است. ما معتقدیم که رشد یک کسب‌وکار نیازمند استراتژی، داده و سیستم‌سازی است، نه شانس یا انگیزه صرف.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">تمرکز بر اجرا</h3>
            <p className="text-slate-600 leading-relaxed">آموزش‌های ما شامل چک‌لیست‌ها و ابزارهای عملی برای پیاده‌سازی فوری هستند.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">داده‌محور</h3>
            <p className="text-slate-600 leading-relaxed">تصمیم‌گیری‌ها باید بر اساس داده‌ها باشند، نه حدس و گمان. ما این را آموزش می‌دهیم.</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">جامعه متخصصان</h3>
            <p className="text-slate-600 leading-relaxed">شبکه‌سازی با سایر کارآفرینان و مدیران برای تبادل تجربه و رشد مشترک.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
