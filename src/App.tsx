import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { seedDatabase } from "./lib/seed";

// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Public Pages
import Home from "./pages/public/Home";
import BlogHub from "./pages/public/BlogHub";
import ArticleDetail from "./pages/public/ArticleDetail";
import PodcastHub from "./pages/public/PodcastHub";
import VideoHub from "./pages/public/VideoHub";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ArticleList from "./pages/admin/ArticleList";
import ArticleEditor from "./pages/admin/ArticleEditor";
import LeadList from "./pages/admin/LeadList";
import Settings from "./pages/admin/Settings";

export default function App() {
  useEffect(() => {
    seedDatabase().catch(console.error);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<BlogHub />} />
            <Route path="blog/:slug" element={<ArticleDetail />} />
            <Route path="podcast" element={<PodcastHub />} />
            <Route path="videos" element={<VideoHub />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            {/* Fallback */}
            <Route path="*" element={<div className="p-20 text-center">صفحه مورد نظر یافت نشد.</div>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="articles/new" element={<ArticleEditor />} />
            <Route path="articles/:id" element={<ArticleEditor />} />
            <Route path="leads" element={<LeadList />} />
            <Route path="settings" element={<Settings />} />
            {/* Fallback for other admin routes */}
            <Route path="*" element={<div className="p-10 text-center">این بخش در حال توسعه است.</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
