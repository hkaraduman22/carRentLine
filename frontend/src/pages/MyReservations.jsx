import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'upcoming', 'active', 'completed'
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalSpent: 0, totalTrips: 0, activeTrips: 0 });

  useEffect(() => {
    fetchReservations();
  }, []);

  // Filtreleme mantığı
  useEffect(() => {
    if (filter === "all") {
      setFilteredReservations(reservations);
    } else {
      setFilteredReservations(reservations.filter(r => getStatus(r.startDate, r.endDate) === filter));
    }
  }, [filter, reservations]);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations/my");
      const sortedData = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)); // En yeniden en eskiye
      setReservations(sortedData);
      calculateStats(sortedData);
    } catch (err) {
      console.error("Veri hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalSpent = data.reduce((acc, curr) => acc + Number(curr.totalPrice), 0);
    const activeTrips = data.filter(r => getStatus(r.startDate, r.endDate) === "active").length;
    setStats({ totalSpent, totalTrips: data.length, activeTrips });
  };

  const cancelReservation = async (id) => {
    if (!window.confirm("⚠️ Bu rezervasyonu iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return;
    try {
      await api.delete(`/reservations/${id}`);
      const updatedList = reservations.filter(r => r.id !== id);
      setReservations(updatedList);
      calculateStats(updatedList);
      alert("✅ Rezervasyon başarıyla iptal edildi.");
    } catch (err) {
      alert("❌ İptal işlemi başarısız oldu. Lütfen tekrar deneyin.");
    }
  };

  // --- Yardımcılar ---

  const getStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "upcoming"; // Gelecek (İptal edilebilir)
    if (now >= start && now <= end) return "active"; // Şu an kullanımda
    return "completed"; // Geçmiş
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  // --- Render Bileşenleri ---

  const StatusBadge = ({ status }) => {
    const configs = {
      upcoming: { color: "bg-indigo-50 text-indigo-600 border-indigo-200", icon: "⏳", label: "Yaklaşıyor" },
      active: { color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: "🚀", label: "Aktif Kirada" },
      completed: { color: "bg-slate-100 text-slate-500 border-slate-200", icon: "✅", label: "Tamamlandı" },
    };
    const config = configs[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.color} shadow-sm`}>
        <span>{config.icon}</span>
        {config.label}
        {status === 'active' && <span className="flex h-2 w-2 relative ml-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-rose-500 selection:text-white pb-20">
      <Navbar />

      {/* --- Header & İstatistikler --- */}
      <div className="relative bg-slate-900 pb-32 pt-28 overflow-hidden">
         {/* Dekoratif Arkaplan */}
         <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         </div>

         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                        Yolculuk Geçmişim
                    </h1>
                    <p className="text-slate-400 text-lg">Keyifli sürüşlerinin ve gelecek planlarının özeti.</p>
                </div>
                
                {/* Özet Kartları */}
                <div className="flex gap-4">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[140px]">
                        <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block mb-1">Toplam Harcama</span>
                        <span className="text-2xl font-black text-white">{stats.totalSpent.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[140px]">
                        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">Toplam Seyahat</span>
                        <span className="text-2xl font-black text-white">{stats.totalTrips}</span>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* --- İçerik Alanı --- */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        
        {/* Filtre Tabları */}
        <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-200/50 inline-flex mb-8 border border-slate-100">
            {[{key: 'all', label: 'Tümü'}, {key: 'upcoming', label: 'Gelecek'}, {key: 'active', label: 'Aktif'}, {key: 'completed', label: 'Geçmiş'}].map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                        filter === tab.key 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                        : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Loading Durumu */}
        {loading ? (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-medium animate-pulse">Veriler yükleniyor...</p>
             </div>
        ) : filteredReservations.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">
                    🛣️
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Bu kategoride seyahat yok.</h3>
                <p className="text-slate-500 mb-8">Yeni rotalar keşfetmek için harika bir gün!</p>
                <Link to="/" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 transition-all">
                    Araç Kirala
                </Link>
            </div>
        ) : (
            // Rezervasyon Listesi
            <div className="space-y-6">
                {filteredReservations.map((res, index) => {
                    const status = getStatus(res.startDate, res.endDate);
                    
                    return (
                        <div 
                            key={res.id}
                            className="group bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(99,102,241,0.1)] hover:border-indigo-100 transition-all duration-500 flex flex-col lg:flex-row gap-8 overflow-hidden relative"
                        >
                            {/* Sol Taraf: Görsel */}
                            <div className="lg:w-72 h-56 rounded-[2rem] overflow-hidden relative bg-slate-100 border border-slate-100 group-hover:border-indigo-50 transition-colors">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent z-10"></div>
                                {res.car?.imageUrl ? (
                                    <img 
                                        src={res.car.imageUrl} 
                                        alt={res.car.brand} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <span className="text-4xl mb-2">🚗</span>
                                        <span className="text-[10px] font-bold uppercase">Görsel Yok</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 z-20">
                                    <StatusBadge status={status} />
                                </div>
                            </div>

                            {/* Orta Kısım: Detaylar */}
                            <div className="flex-1 flex flex-col justify-center py-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {res.car?.brand}
                                    </h3>
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200">
                                        {res.car?.model}
                                    </span>
                                </div>

                                <div className="space-y-4 mt-2">
                                    {/* Timeline */}
                                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-6 py-1">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-50"></div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Teslim Alma</p>
                                            <p className="text-sm font-bold text-slate-700">{formatDate(res.startDate)}</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-50"></div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Teslim Etme</p>
                                            <p className="text-sm font-bold text-slate-700">{formatDate(res.endDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sağ Taraf: Fiyat ve Aksiyon */}
                            <div className="flex flex-col justify-between items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8 lg:w-64">
                                <div className="text-right w-full">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Toplam Tutar</p>
                                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">
                                        {res.totalPrice} <span className="text-xl text-slate-400 font-medium">₺</span>
                                    </div>
                                </div>

                                <div className="w-full mt-6">
                                    {status === 'upcoming' ? (
                                        <button 
                                            onClick={() => cancelReservation(res.id)}
                                            className="w-full group/btn relative flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-rose-100 text-rose-600 rounded-2xl font-bold transition-all duration-300 hover:bg-rose-500 hover:border-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-200 active:scale-95"
                                        >
                                            <span>Rezervasyonu İptal Et</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                        </button>
                                    ) : (
                                        <button disabled className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold border border-slate-100 cursor-not-allowed">
                                            {status === 'active' ? 'İptal Edilemez (Aktif)' : 'Tamamlandı'}
                                        </button>
                                    )}
                                    
                                    {status === 'upcoming' && (
                                        <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
                                            *Başlangıç tarihinden önce iptal edebilirsiniz.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
      </div>
    </div>
  );
}