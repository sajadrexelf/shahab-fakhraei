import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { getDB } from "../../lib/db";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const db = await getDB();
      await db.put("leads", {
        id: `lead_${Date.now()}`,
        name: "کاربر خبرنامه",
        email: email,
        source: "newsletter_page",
        createdAt: Date.now()
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <Helmet>
        <title>عضویت در خبرنامه | آکادمی رشد</title>
        <meta name="description" content="با عضویت در خبرنامه آکادمی رشد، جدیدترین مقالات و تحلیل‌های توسعه کسب‌وکار را دریافت کنید." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <Mail size={40} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">خبرنامه تخصصی رشد کسب‌وکار</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          هر هفته، یک تحلیل عمیق، یک چارچوب اجرایی و بهترین منابع برای رشد و مقیاس‌پذیری کسب‌وکار را مستقیماً در ایمیل خود دریافت کنید. بدون اسپم، فقط ارزش خالص.
        </p>

        {status === "success" ? (
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-3xl border border-emerald-200">
            <CheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">عضویت شما با موفقیت انجام شد!</h2>
            <p className="text-emerald-700">از این پس جدیدترین مطالب را برای شما ارسال خواهیم کرد.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="آدرس ایمیل کاری شما..."
                className="flex-1 px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 text-lg"
                dir="ltr"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 whitespace-nowrap text-lg"
              >
                {status === "submitting" ? "در حال ثبت..." : "عضویت رایگان"}
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-right">
              * اطلاعات شما نزد ما محفوظ است و هر زمان که بخواهید می‌توانید لغو عضویت کنید.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
