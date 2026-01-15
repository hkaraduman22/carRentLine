import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [availableFeatures, setAvailableFeatures] = useState([]);
  
  // Filtre State'leri
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // İlk Yükleme
  useEffect(() => {
    fetchCars();
    fetchFeatures();
  }, []);

  const fetchCars = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
        if (filters.features && filters.features.length > 0) {
            params.append("features", filters.features.join(","));
        }

        const res = await api.get(`/cars?${params.toString()}`);
        setCars(res.data);
    } catch (err) {
        console.error("Araçlar yüklenirken hata:", err);
    }
  };

  const fetchFeatures = async () => {
      try {
          const res = await api.get("/features");
          setAvailableFeatures(res.data);
      } catch (err) {
          console.error("Özellikler yüklenemedi", err);
      }
  };

  // Filtreleme Butonuna Basılınca
  const handleFilter = (e) => {
      e.preventDefault();
      fetchCars({ search, minPrice, maxPrice, features: selectedFeatures });
  };

  // Özellik Checkbox Değişimi
  const toggleFeature = (featureName) => {
      setSelectedFeatures(prev => 
          prev.includes(featureName) 
          ? prev.filter(f => f !== featureName) 
          : [...prev, featureName]
      );
  };

  // Filtreleri Temizle
  const clearFilters = () => {
      setSearch("");
      setMinPrice("");
      setMaxPrice("");
      setSelectedFeatures([]);
      fetchCars({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* MODERN HERO SECTION */}
      {/* Çakışmayı önlemek için pb (padding-bottom) değerini artırdık: pb-48 */}
      <div className="relative bg-[#0f172a] text-white overflow-hidden pt-36 pb-48 md:pt-44 md:pb-64">
         
         {/* Arka Plan Efektleri (Canlı Gradient Blobs) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen animate-pulse pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
         <div className="absolute top-20 left-10 w-32 h-32 bg-teal-500/10 rounded-full blur-[60px] -z-10"></div>
         
         {/* Grid Pattern Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

         <div className="container mx-auto px-4 text-center relative z-10">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md text-indigo-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                Premium Araç Kiralama
             </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none drop-shadow-lg">
                Yolculuğun <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400">Rengini Seç.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                Yüzlerce araç arasından tarzına en uygun olanı bul, detaylı filtrele ve saniyeler içinde kirala. Konforlu sürüş deneyimi bir tık uzağında.
            </p>
         </div>
      </div>

      {/* ANA İÇERİK */}
      {/* -mt-24 ile içeriği yukarı çektik ama Hero'nun padding'i geniş olduğu için çakışma olmaz */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8 -mt-24 relative z-20">
        
        {/* SOL: FİLTRE PANELİ (SIDEBAR) */}
        <aside className="w-full lg:w-1/4">
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 sticky top-28 ring-1 ring-slate-900/5">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100/80">
                    <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-600 p-1 rounded-lg">⚡</span> Filtreler
                    </h3>
                    <button onClick={clearFilters} className="text-[11px] bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full font-bold hover:bg-rose-100 transition-colors">
                        SIFIRLA
                    </button>
                </div>
                
                <form onSubmit={handleFilter} className="space-y-6">
                    {/* Arama */}
                    <div className="group">
                        <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block tracking-wider">Marka / Model</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="BMW, Mercedes..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-3.5 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                            />
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">🔍</span>
                        </div>
                    </div>

                    {/* Fiyat Aralığı */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block tracking-wider">Günlük Fiyat (₺)</label>
                        <div className="flex gap-2">
                            <div className="relative w-full group">
                                <input 
                                    type="number" 
                                    placeholder="Min" 
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-center shadow-sm transition-all"
                                />
                            </div>
                            <div className="relative w-full group">
                                <input 
                                    type="number" 
                                    placeholder="Max" 
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-center shadow-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Özellikler */}
                    <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase mb-3 block tracking-wider">Donanım</label>
                        <div className="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                            {availableFeatures.map(f => (
                                <label key={f.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 flex-shrink-0 ${selectedFeatures.includes(f.name) ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-200 scale-110' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                                        {selectedFeatures.includes(f.name) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        )}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="hidden" 
                                        checked={selectedFeatures.includes(f.name)}
                                        onChange={() => toggleFeature(f.name)}
                                    />
                                    <span className={`text-sm ${selectedFeatures.includes(f.name) ? 'text-indigo-700 font-bold' : 'text-slate-600 font-medium'}`}>{f.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-300 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group">
                        <span>SONUÇLARI GÖSTER</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </form>
            </div>
        </aside>

        {/* SAĞ: ARAÇ LİSTESİ */}
        <main className="w-full lg:w-3/4">
            
            {/* Header Alanı */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                <div>
                   <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                       Müsait Araçlar
                   </h2>
                   <p className="text-slate-500 text-sm mt-1 font-medium">Arama kriterlerinize uygun en iyi seçenekler.</p>
                </div>
                <div className="bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                   Toplam <span className="text-indigo-600 text-base">{cars.length}</span> sonuç
                </div>
            </div>

            {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car, index) => (
                   <div key={car.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                       <CarCard car={car} />
                   </div>
                ))}
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-white/60 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-6 text-slate-300 shadow-inner">🔍</div>
                <h3 className="text-2xl font-bold text-slate-800">Üzgünüz, sonuç bulunamadı.</h3>
                <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm leading-relaxed">Aradığınız kriterlere uygun araç şu an müsait değil veya mevcut değil. Lütfen filtreleri gevşeterek tekrar deneyin.</p>
                <button onClick={clearFilters} className="mt-8 px-8 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm hover:shadow-indigo-200">
                    Filtreleri Temizle
                </button>
            </div>
            )}
        </main>

      </div>
      
      <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}