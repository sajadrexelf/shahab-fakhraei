import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "مقالات", href: "/blog" },
    { name: "پادکست", href: "/podcast" },
    { name: "ویدیوها", href: "/videos" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
            آکادمی رشد
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/newsletter"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              خبرنامه
            </Link>
            <Link
              to="/blog"
              className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-slate-900/90"
            >
              شروع یادگیری
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-base font-medium text-slate-600 hover:text-slate-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100" />
            <Link
              to="/newsletter"
              className="block text-base font-medium text-slate-600 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              خبرنامه
            </Link>
            <Link
              to="/blog"
              className="block w-full text-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              شروع یادگیری
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">آکادمی رشد</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              پلتفرم آموزشی تخصصی برای کارآفرینان و مدیران. از ایده تا رشد پایدار با چارچوب‌های اجرایی و داده‌محور.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">ستون‌های محتوایی</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/business-model" className="hover:text-white transition-colors">طراحی مدل کسب‌وکار</Link></li>
              <li><Link to="/category/marketing" className="hover:text-white transition-colors">سیستم‌های رشد و بازاریابی</Link></li>
              <li><Link to="/category/systemization" className="hover:text-white transition-colors">مقياس‌پذیری و سیستم‌سازی</Link></li>
              <li><Link to="/category/leadership" className="hover:text-white transition-colors">رهبری و تصمیم‌گیری استراتژیک</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">تماس با ما</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">حریم خصوصی</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">ورود مدیر</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">خبرنامه تخصصی</h4>
            <p className="text-sm text-slate-400 mb-4">جدیدترین مقالات و تحلیل‌ها را در ایمیل خود دریافت کنید.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ایمیل شما..."
                className="flex-1 rounded-md bg-slate-800 border-none px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-slate-400"
              />
              <button type="submit" className="rounded-md bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100 transition-colors">
                عضویت
              </button>
            </form>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} آکادمی رشد. تمامی حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
}
