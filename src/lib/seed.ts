import { getDB, Article, Podcast, Video, SiteSettings } from './db';

const pillars = [
  'طراحی مدل کسب‌وکار',
  'سیستم‌های رشد و بازاریابی',
  'مقياس‌پذیری و سیستم‌سازی',
  'رهبری و تصمیم‌گیری استراتژیک'
];

const sampleArticles: Article[] = [
  {
    id: 'a1',
    title: 'چگونه یک مدل کسب‌وکار مقیاس‌پذیر طراحی کنیم؟',
    slug: 'scalable-business-model',
    content: '## مقدمه\nدر دنیای پرشتاب امروز، داشتن یک مدل کسب‌وکار مقیاس‌پذیر برای بقا و رشد ضروری است. این مقاله به بررسی چارچوب‌های کلیدی می‌پردازد...\n\n### ۱. شناخت ارزش پیشنهادی\nارزش پیشنهادی شما باید واضح و متمایز باشد...\n\n### ۲. کانال‌های توزیع\nانتخاب کانال‌های مناسب برای رسیدن به مشتری هدف...',
    excerpt: 'راهنمای جامع طراحی مدل کسب‌وکار برای استارتاپ‌ها و شرکت‌های در حال رشد.',
    pillar: pillars[0],
    tags: ['مدل کسب‌وکار', 'استارتاپ', 'رشد'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 10000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/bizmodel/800/600',
    seoTitle: 'طراحی مدل کسب‌وکار مقیاس‌پذیر',
    seoDescription: 'راهنمای جامع برای طراحی مدل کسب‌وکار مقیاس‌پذیر و پایدار.'
  },
  {
    id: 'a2',
    title: 'استراتژی‌های نوین بازاریابی B2B در سال ۲۰۲۴',
    slug: 'b2b-marketing-strategies-2024',
    content: '## بازاریابی B2B در عصر دیجیتال\nبازاریابی B2B تغییرات زیادی کرده است. تمرکز بر روی محتوای آموزشی و ایجاد اعتماد بیش از پیش اهمیت یافته است...',
    excerpt: 'بررسی جدیدترین رویکردها در بازاریابی و فروش سازمانی.',
    pillar: pillars[1],
    tags: ['بازاریابی', 'B2B', 'فروش'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 20000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/b2b/800/600',
    seoTitle: 'استراتژی‌های بازاریابی B2B',
    seoDescription: 'جدیدترین استراتژی‌های بازاریابی B2B برای افزایش فروش.'
  },
  {
    id: 'a3',
    title: 'سیستم‌سازی: کلید آزادی کارآفرین',
    slug: 'systemization-entrepreneur-freedom',
    content: '## چرا سیستم‌سازی مهم است؟\nبسیاری از کارآفرینان در کسب‌وکار خود گیر می‌افتند. سیستم‌سازی راه حلی برای خروج از عملیات روزمره است...',
    excerpt: 'چگونه با سیستم‌سازی، کسب‌وکار خود را مستقل از خودتان کنید.',
    pillar: pillars[2],
    tags: ['سیستم‌سازی', 'مدیریت', 'بهره‌وری'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 30000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/system/800/600',
    seoTitle: 'سیستم‌سازی کسب‌وکار',
    seoDescription: 'راهنمای گام به گام سیستم‌سازی برای کارآفرینان.'
  },
  {
    id: 'a4',
    title: 'تصمیم‌گیری استراتژیک در شرایط عدم قطعیت',
    slug: 'strategic-decision-making',
    content: '## تصمیم‌گیری در بحران\nمدیران حرفه‌ای باید بتوانند در شرایط مبهم تصمیمات درستی بگیرند. استفاده از داده‌ها و سناریوسازی...',
    excerpt: 'چارچوب‌های تصمیم‌گیری برای مدیران ارشد در شرایط پیچیده.',
    pillar: pillars[3],
    tags: ['رهبری', 'استراتژی', 'تصمیم‌گیری'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 40000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/strategy/800/600',
    seoTitle: 'تصمیم‌گیری استراتژیک',
    seoDescription: 'چگونه در شرایط عدم قطعیت تصمیمات استراتژیک بگیریم.'
  },
  {
    id: 'a5',
    title: 'بوم مدل کسب‌وکار ناب (Lean Canvas)',
    slug: 'lean-canvas-guide',
    content: '## بوم ناب چیست؟\nابزاری سریع و موثر برای اعتبارسنجی ایده‌های کسب‌وکار قبل از سرمایه‌گذاری سنگین...',
    excerpt: 'آموزش گام به گام پر کردن بوم مدل کسب‌وکار ناب.',
    pillar: pillars[0],
    tags: ['بوم ناب', 'ایده‌پردازی'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 50000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/lean/800/600',
    seoTitle: 'آموزش بوم مدل کسب‌وکار ناب',
    seoDescription: 'راهنمای عملی استفاده از Lean Canvas.'
  },
  {
    id: 'a6',
    title: 'قیف فروش (Sales Funnel) و بهینه‌سازی نرخ تبدیل',
    slug: 'sales-funnel-cro',
    content: '## قیف فروش\nمسیر مشتری از آشنایی تا خرید را قیف فروش می‌گویند. بهینه‌سازی هر مرحله می‌تواند سودآوری را چند برابر کند...',
    excerpt: 'چگونه نرخ تبدیل وب‌سایت و کمپین‌های خود را افزایش دهیم.',
    pillar: pillars[1],
    tags: ['فروش', 'CRO', 'دیجیتال مارکتینگ'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 60000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/funnel/800/600',
    seoTitle: 'بهینه‌سازی قیف فروش',
    seoDescription: 'تکنیک‌های افزایش نرخ تبدیل در قیف فروش.'
  },
  {
    id: 'a7',
    title: 'تفویض اختیار موثر برای مدیران در حال رشد',
    slug: 'effective-delegation',
    content: '## هنر تفویض اختیار\nبسیاری از مدیران از واگذاری کارها می‌ترسند. اما بدون تفویض اختیار، رشد متوقف می‌شود...',
    excerpt: 'چگونه کارها را به درستی به تیم واگذار کنیم تا نتیجه بهتری بگیریم.',
    pillar: pillars[2],
    tags: ['مدیریت تیم', 'تفویض اختیار'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 70000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/delegate/800/600',
    seoTitle: 'تفویض اختیار موثر',
    seoDescription: 'راهنمای تفویض اختیار برای مدیران.'
  },
  {
    id: 'a8',
    title: 'هوش هیجانی در رهبری سازمانی',
    slug: 'emotional-intelligence-leadership',
    content: '## هوش هیجانی (EQ)\nرهبران موفق بیش از آنکه IQ بالایی داشته باشند، از EQ بالایی برخوردارند. توانایی درک احساسات خود و دیگران...',
    excerpt: 'نقش هوش هیجانی در موفقیت مدیران و رهبران.',
    pillar: pillars[3],
    tags: ['رهبری', 'هوش هیجانی', 'توسعه فردی'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 80000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/eq/800/600',
    seoTitle: 'هوش هیجانی در رهبری',
    seoDescription: 'اهمیت هوش هیجانی برای مدیران.'
  },
  {
    id: 'a9',
    title: 'شاخص‌های کلیدی عملکرد (KPI) برای استارتاپ‌ها',
    slug: 'startup-kpis',
    content: '## اندازه‌گیری موفقیت\nشما نمی‌توانید چیزی را که اندازه‌گیری نمی‌کنید، مدیریت کنید. انتخاب KPIهای درست حیاتی است...',
    excerpt: 'مهم‌ترین متریک‌هایی که هر بنیان‌گذار باید ردیابی کند.',
    pillar: pillars[0],
    tags: ['KPI', 'داده‌محور', 'استارتاپ'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 90000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/kpi/800/600',
    seoTitle: 'شاخص‌های کلیدی عملکرد استارتاپ‌ها',
    seoDescription: 'معرفی KPIهای مهم برای رشد کسب‌وکار.'
  },
  {
    id: 'a10',
    title: 'بازاریابی محتوایی سئو-محور',
    slug: 'seo-driven-content-marketing',
    content: '## محتوا پادشاه است\nاما محتوایی که دیده نشود، ارزشی ندارد. ترکیب تولید محتوا با اصول سئو، ترافیک ارگانیک پایداری ایجاد می‌کند...',
    excerpt: 'چگونه محتوایی تولید کنیم که هم برای کاربر جذاب باشد و هم برای گوگل.',
    pillar: pillars[1],
    tags: ['سئو', 'تولید محتوا', 'بازاریابی'],
    author: 'تیم آکادمی',
    publishedAt: Date.now() - 100000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/seo/800/600',
    seoTitle: 'بازاریابی محتوایی سئو-محور',
    seoDescription: 'استراتژی تولید محتوا برای جذب ترافیک ارگانیک.'
  }
];

const samplePodcasts: Podcast[] = [
  {
    id: 'p1',
    title: 'اپیزود ۱: ذهنیت کارآفرین موفق',
    slug: 'ep1-entrepreneur-mindset',
    description: 'در این قسمت به بررسی تفاوت‌های ذهنی کارآفرینان موفق و افراد عادی می‌پردازیم.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '45:20',
    publishedAt: Date.now() - 15000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/pod1/800/800'
  },
  {
    id: 'p2',
    title: 'اپیزود ۲: عبور از دره مرگ استارتاپ‌ها',
    slug: 'ep2-startup-valley-of-death',
    description: 'چگونه از سخت‌ترین مرحله رشد یک کسب‌وکار نوپا جان سالم به در ببریم؟',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '52:10',
    publishedAt: Date.now() - 25000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/pod2/800/800'
  },
  {
    id: 'p3',
    title: 'اپیزود ۳: ساخت تیم رویایی',
    slug: 'ep3-building-dream-team',
    description: 'استخدام، نگهداشت و توسعه استعدادها در شرکت‌های در حال رشد.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '38:45',
    publishedAt: Date.now() - 35000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/pod3/800/800'
  }
];

const sampleVideos: Video[] = [
  {
    id: 'v1',
    title: 'آموزش تدوین استراتژی بازاریابی',
    slug: 'marketing-strategy-masterclass',
    description: 'یک مسترکلاس جامع برای تدوین استراتژی بازاریابی یکپارچه.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    publishedAt: Date.now() - 12000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/vid1/800/450'
  },
  {
    id: 'v2',
    title: 'تحلیل مالی برای مدیران غیرمالی',
    slug: 'finance-for-non-financial-managers',
    description: 'آشنایی با صورت‌های مالی و شاخص‌های کلیدی برای تصمیم‌گیری بهتر.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    publishedAt: Date.now() - 22000000,
    status: 'published',
    featuredImage: 'https://picsum.photos/seed/vid2/800/450'
  }
];

const defaultSettings: SiteSettings = {
  id: 'global',
  primaryColor: '#0f172a', // slate-900
  fontFamily: 'Inter',
  heroTitle: 'از ایده تا رشد پایدار در ۱۲ ماه',
  heroSubtitle: 'آکادمی توسعه کسب‌وکار با رویکرد داده‌محور و چارچوب‌های اجرایی برای کارآفرینان و مدیران.',
  showTestimonials: true,
  showFAQ: true
};

export async function seedDatabase() {
  const db = await getDB();
  
  // Check if already seeded
  const existingArticles = await db.count('articles');
  if (existingArticles > 0) return;

  const tx = db.transaction(['articles', 'podcasts', 'videos', 'settings'], 'readwrite');
  
  sampleArticles.forEach(article => tx.objectStore('articles').put(article));
  samplePodcasts.forEach(podcast => tx.objectStore('podcasts').put(podcast));
  sampleVideos.forEach(video => tx.objectStore('videos').put(video));
  tx.objectStore('settings').put(defaultSettings);

  await tx.done;
  console.log('Database seeded successfully');
}
