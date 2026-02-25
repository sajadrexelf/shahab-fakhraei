import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getDB, SiteSettings } from "../../lib/db";
import { Save, Layout, Palette, Type } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const db = await getDB();
      const s = await db.get("settings", "global");
      if (s) setSettings(s);
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const db = await getDB();
      await db.put("settings", settings);
      alert("تنظیمات با موفقیت ذخیره شد.");
    } catch (error) {
      console.error(error);
      alert("خطا در ذخیره تنظیمات.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) return <div>در حال بارگذاری...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>تنظیمات سایت | آکادمی رشد</title>
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">تنظیمات سایت</h1>
          <p className="text-slate-500">مدیریت ظاهر و محتوای اصلی وب‌سایت.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          <Save size={18} />
          {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section Settings */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <Layout className="text-blue-600" size={24} />
            <h2 className="text-lg font-bold text-slate-900">تنظیمات صفحه اصلی (Hero)</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">تیتر اصلی (Hero Title)</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">زیرتیتر (Hero Subtitle)</label>
              <textarea
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 resize-none"
              />
            </div>
            <div className="flex items-center gap-6 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showTestimonials}
                  onChange={(e) => setSettings({ ...settings, showTestimonials: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">نمایش بخش نظرات مشتریان</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showFAQ}
                  onChange={(e) => setSettings({ ...settings, showFAQ: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-slate-700">نمایش بخش سوالات متداول</span>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <Palette className="text-emerald-600" size={24} />
            <h2 className="text-lg font-bold text-slate-900">ظاهر و برندینگ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">رنگ اصلی برند</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-lg cursor-pointer border-none p-0"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-600 text-slate-900 text-sm font-mono"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Type size={16} />
                فونت اصلی سایت
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600 text-sm"
              >
                <option value="Inter">Inter (پیش‌فرض)</option>
                <option value="Vazirmatn">Vazirmatn</option>
                <option value="IRANSans">IRANSans</option>
                <option value="Yekan Bakh">Yekan Bakh</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
