import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getDB, Podcast } from "../../lib/db";
import { Mic, PlayCircle, Clock } from "lucide-react";

export default function PodcastHub() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    async function loadPodcasts() {
      const db = await getDB();
      const all = await db.getAllFromIndex("podcasts", "by-status", "published");
      setPodcasts(all.sort((a, b) => b.publishedAt - a.publishedAt));
    }
    loadPodcasts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Helmet>
        <title>پادکست توسعه کسب‌وکار | آکادمی رشد</title>
        <meta name="description" content="آرشیو کامل اپیزودهای پادکست آکادمی رشد. گفتگو با کارآفرینان و مدیران موفق." />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic size={40} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">پادکست توسعه کسب‌وکار</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            گفتگوهای عمیق و کاربردی با کارآفرینان، مدیران ارشد و متخصصان حوزه رشد و توسعه کسب‌وکار.
          </p>
        </div>

        {/* Podcast List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="w-full md:w-48 aspect-square shrink-0 rounded-xl overflow-hidden relative shadow-md">
                <img src={podcast.featuredImage} alt={podcast.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <PlayCircle size={48} className="text-white" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{podcast.duration} دقیقه</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(podcast.publishedAt).toLocaleDateString('fa-IR')}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{podcast.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-6">{podcast.description}</p>
                
                {/* Audio Player Placeholder */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center gap-4 mt-auto">
                  <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shrink-0">
                    <PlayCircle size={24} />
                  </button>
                  <div className="flex-1">
                    <div className="h-2 bg-slate-200 rounded-full w-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-1/3 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>00:00</span>
                      <span>{podcast.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
