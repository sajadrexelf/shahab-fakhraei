import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getDB, Video } from "../../lib/db";
import { Video as VideoIcon, PlayCircle } from "lucide-react";

export default function VideoHub() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function loadVideos() {
      const db = await getDB();
      const all = await db.getAllFromIndex("videos", "by-status", "published");
      setVideos(all.sort((a, b) => b.publishedAt - a.publishedAt));
    }
    loadVideos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>ویدیوهای آموزشی | آکادمی رشد</title>
        <meta name="description" content="آرشیو کامل ویدیوهای آموزشی آکادمی رشد. مسترکلاس‌ها و وبینارهای تخصصی." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <VideoIcon size={40} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">ویدیوهای آموزشی</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            مسترکلاس‌ها، وبینارها و دوره‌های ویدیویی کوتاه برای یادگیری سریع و کاربردی مفاهیم کسب‌وکار.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all group">
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img src={video.featuredImage} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform cursor-pointer">
                    <PlayCircle size={32} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span>{new Date(video.publishedAt).toLocaleDateString('fa-IR')}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">{video.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
