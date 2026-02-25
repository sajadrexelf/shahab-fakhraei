import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getDB, Lead } from "../../lib/db";
import { Download, Search, Trash2, Mail } from "lucide-react";

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    const db = await getDB();
    const all = await db.getAll("leads");
    setLeads(all.sort((a, b) => b.createdAt - a.createdAt));
  }

  async function handleDelete(id: string) {
    if (window.confirm("آیا از حذف این لید اطمینان دارید؟")) {
      const db = await getDB();
      await db.delete("leads", id);
      loadLeads();
    }
  }

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Source", "Date"];
    const csvContent = [
      headers.join(","),
      ...leads.map(l => [
        l.id,
        `"${l.name}"`,
        l.email,
        l.source,
        new Date(l.createdAt).toISOString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>مدیریت لیدها | آکادمی رشد</title>
      </Helmet>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">مخاطبان و لیدها</h1>
          <p className="text-slate-500">مدیریت اطلاعات تماس جمع‌آوری شده از فرم‌ها.</p>
        </div>
        <button onClick={handleExportCSV} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Download size={18} />
          خروجی CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="جستجو در نام، ایمیل یا منبع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
            />
          </div>
          <div className="text-sm text-slate-500 mr-auto">
            تعداد کل: {filteredLeads.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">نام و نام خانوادگی</th>
                <th className="px-6 py-4 font-semibold">ایمیل</th>
                <th className="px-6 py-4 font-semibold">منبع ورودی</th>
                <th className="px-6 py-4 font-semibold">تاریخ ثبت</th>
                <th className="px-6 py-4 font-semibold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{lead.name || '-'}</td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" />
                    <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors" dir="ltr">{lead.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(lead.createdAt).toLocaleString('fa-IR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => handleDelete(lead.id)} className="text-red-600 hover:text-red-800 transition-colors" title="حذف">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    لیدی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
