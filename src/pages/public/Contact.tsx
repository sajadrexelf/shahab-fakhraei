import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { getDB } from "../../lib/db";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const db = await getDB();
      await db.put("leads", {
        id: `lead_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        source: "contact_form",
        createdAt: Date.now()
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>تماس با ما | آکادمی رشد</title>
        <meta name="description" content="راه‌های ارتباطی با تیم آکادمی رشد." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">ارتباط با آکادمی رشد</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            برای مشاوره، همکاری یا پشتیبانی دوره‌ها، از طریق فرم زیر یا راه‌های ارتباطی با ما در تماس باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          {/* Contact Info */}
          <div className="bg-slate-900 text-white p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-8">اطلاعات تماس</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">ایمیل پشتیبانی</h3>
                    <p className="text-slate-400">support@growthacademy.ir</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">شماره تماس</h3>
                    <p className="text-slate-400">۰۲۱-۸۸۸۸۸۸۸۸</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">آدرس دفتر مرکزی</h3>
                    <p className="text-slate-400 leading-relaxed">تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نوآوری، طبقه ۷، واحد ۷۰۲</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-12 border-t border-slate-800">
              <p className="text-slate-400 text-sm leading-relaxed">
                ساعات کاری پشتیبانی: شنبه تا چهارشنبه، ساعت ۹ صبح تا ۵ عصر.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">ارسال پیام</h2>
            {status === "success" ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-200 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">پیام شما با موفقیت ارسال شد!</h3>
                <p className="text-emerald-700">همکاران ما در اسرع وقت با شما تماس خواهند گرفت.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
                    placeholder="مثال: علی رضایی"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">ایمیل</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
                    placeholder="example@domain.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">پیام شما</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 resize-none"
                    placeholder="چگونه می‌توانیم به شما کمک کنیم؟"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? "در حال ارسال..." : "ارسال پیام"}
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
