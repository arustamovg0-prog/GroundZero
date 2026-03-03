import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

export function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLeads(data.leads);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 font-roboto">
      <Helmet>
        <title>Admin - Leads | Ground Zero</title>
      </Helmet>
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-3xl font-bold text-brand-blue mb-8">Управление Лидами</h1>
        
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-sm font-medium text-brand-blue/70">Имя</th>
                    <th className="p-4 text-sm font-medium text-brand-blue/70">Контакты</th>
                    <th className="p-4 text-sm font-medium text-brand-blue/70">Компания</th>
                    <th className="p-4 text-sm font-medium text-brand-blue/70">Сегмент</th>
                    <th className="p-4 text-sm font-medium text-brand-blue/70">Статус</th>
                    <th className="p-4 text-sm font-medium text-brand-blue/70">Дата</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-brand-blue">{lead.name}</td>
                      <td className="p-4 text-sm text-brand-blue/80">
                        {lead.email}<br />
                        {lead.phone}
                      </td>
                      <td className="p-4 text-sm text-brand-blue/80">{lead.company || "-"}</td>
                      <td className="p-4 text-sm text-brand-blue/80">
                        {lead.segment}<br />
                        <span className="text-xs text-gray-500">Команда: {lead.teamSize || "-"}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead.priority ? "bg-brand-yellow/20 text-brand-blue" : "bg-gray-100 text-gray-600"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-brand-blue/80">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-500">
                        Нет лидов
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
