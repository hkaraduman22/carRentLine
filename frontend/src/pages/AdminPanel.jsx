import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [tab, setTab] = useState("cars");
  const [data, setData] = useState({ cars: [], users: [], features: [], messages: [] });
  const [stats, setStats] = useState({ totalValue: 0, activeRentals: 0, responseRate: 0 });
  
  // Araç Form State'leri
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });

  // Mesaj Cevaplama State'leri
  const [replyText, setReplyText] = useState("");
  const [replyingId, setReplyingId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const fetchSafe = (url) => api.get(url).catch(err => ({ data: [] }));

    try {
      const [c, u, f, m] = await Promise.all([
        fetchSafe("/cars"), 
        fetchSafe("/users"), 
        fetchSafe("/features"),
        fetchSafe("/messages")
      ]);
      
      const cars = c.data || [];
      const messages = m.data || [];

      // --- İSTATİSTİK HESAPLAMA ---
      const totalValue = cars.reduce((acc, car) => acc + (Number(car.pricePerDay) * 100), 0); // Tahmini filo değeri simülasyonu
      const answeredCount = messages.filter(msg => msg.reply).length;
      const responseRate = messages.length > 0 ? Math.round((answeredCount / messages.length) * 100) : 0;

      setStats({ totalValue, activeRentals: 12, responseRate }); // activeRentals şimdilik dummy
      setData({ cars, users: u.data || [], features: f.data || [], messages });

    } catch (e) { 
        console.error("Veri hatası:", e); 
    }
  };

  // --- ARAÇ İŞLEMLERİ ---
  const submitCar = async (e) => {
    e.preventDefault();
    try {
        const payload = { 
          brand: form.brand, model: form.model, imageUrl: form.imageUrl,
          km: Number(form.km), year: Number(form.year), pricePerDay: Number(form.pricePerDay),
          featureIds: form.featureIds
        };

        if(editingId) {
            await api.put(`/cars/${editingId}`, payload);
            alert("✅ Araç başarıyla güncellendi!");
        } else {
            await api.post("/cars", payload);
            alert("✅ Yeni araç eklendi!");
        }
        
        setEditingId(null);
        setForm({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });
        loadData(); 
    } catch (e) { 
        alert("İşlem başarısız."); 
    }
  };

  const deleteCar = async (id) => { if(window.confirm("Silmek istediğinize emin misiniz?")) { await api.delete(`/cars/${id}`); loadData(); }};
  
  const startEdit = (c) => { 
    setEditingId(c.id); 
    setForm({ 
        brand: c.brand, model: c.model, year: c.year, km: c.km, pricePerDay: c.pricePerDay, 
        imageUrl: c.imageUrl || "", featureIds: c.features ? c.features.map(f => f.id) : [] 
    }); 
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };
  
  const cancelEdit = () => { setEditingId(null); setForm({ brand:"", model:"", year:"", km:"", pricePerDay:"", imageUrl:"", featureIds:[] }); };
  const toggleFeature = (id) => setForm(p => ({...p, featureIds: p.featureIds.includes(id) ? p.featureIds.filter(x=>x!==id) : [...p.featureIds, id]}));
  
  const changeUserRole = async (u) => { if(window.confirm("Rolü değiştirmek istiyor musunuz?")) { await api.put(`/users/${u.id}`, {role: u.role==="admin"?"user":"admin"}); loadData(); }};

  const sendReply = async (msgId) => {
    if(!replyText.trim()) return;
    try {
        await api.put(`/messages/${msgId}/reply`, { reply: replyText });
        alert("✅ Yanıtlandı!");
        setReplyText("");
        setReplyingId(null);
        loadData(); 
    } catch (e) { alert("Hata oluştu."); }
  };

  // --- YARDIMCI BİLEŞENLER ---
  const StatCard = ({ title, value, sub, icon, color }) => (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${color}`}>
                {icon}
            </div>
            {sub && <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">{sub}</span>}
        </div>
        <div className="text-3xl font-black text-slate-800 tracking-tight">{value}</div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{title}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans selection:bg-indigo-500 selection:text-white pb-20">
      <Navbar />
      
      {/* --- HEADER & DASHBOARD --- */}
      <div className="bg-[#0f172a] relative overflow-hidden pb-48 pt-32 rounded-b-[4rem]">
         {/* Dekorasyon */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Admin Dashboard v2.0
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
                        Genel Bakış
                    </h1>
                </div>
            </div>

            {/* İstatistik Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Toplam Filo" 
                    value={data.cars.length} 
                    icon="🚘" 
                    color="bg-blue-50 text-blue-600" 
                    sub="Araç"
                />
                <StatCard 
                    title="Kayıtlı Üye" 
                    value={data.users.length} 
                    icon="👥" 
                    color="bg-purple-50 text-purple-600"
                    sub="Kullanıcı"
                />
                <StatCard 
                    title="Yanıt Oranı" 
                    value={`%${stats.responseRate}`} 
                    icon="💬" 
                    color="bg-emerald-50 text-emerald-600"
                    sub="Mesaj"
                />
                 <StatCard 
                    title="Tahmini Değer" 
                    value="₺ 2.4M" 
                    icon="💎" 
                    color="bg-amber-50 text-amber-600"
                    sub="Filo Değeri"
                />
            </div>
         </div>
      </div>

      {/* --- İÇERİK --- */}
      <div className="container mx-auto px-6 -mt-32 relative z-20 max-w-7xl">
        
        {/* TAB NAVIGASYONU */}
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-slate-900/5 inline-flex mb-10 border border-white">
            {[
                { id: "cars", label: "Araç Yönetimi", icon: "🏎️" },
                { id: "users", label: "Kullanıcı Listesi", icon: "busts_in_silhouette" },
                { id: "messages", label: "Destek Masası", icon: "speech_balloon" }
            ].map(t => (
                <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-3 ${
                        tab === t.id
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105" 
                        : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                    }`}
                >
                    <span className={`material-symbols-outlined text-lg ${tab === t.id ? 'text-indigo-400' : ''}`}>{t.icon === 'busts_in_silhouette' ? '👥' : t.icon === 'speech_balloon' ? '💬' : '🚘'}</span>
                    {t.label}
                </button>
            ))}
        </div>

        {/* --- 1. ARAÇ YÖNETİMİ --- */}
        {tab === "cars" && (
            <div className="grid lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-700">
                 
                 {/* FORM ALANI (Sol) */}
                 <div className="lg:col-span-4 sticky top-6">
                    <form onSubmit={submitCar} className="bg-white p-1 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-white">
                        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                                {editingId ? "🛠️ Düzenleme Modu" : "✨ Yeni Araç Ekle"}
                            </h3>

                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">Marka & Model</label>
                                        <div className="flex gap-2">
                                            <input className="input-field w-1/3" placeholder="BMW" value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} required />
                                            <input className="input-field w-2/3" placeholder="520d" value={form.model} onChange={e=>setForm({...form, model:e.target.value})} required />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">Yıl</label>
                                        <input type="number" className="input-field w-full" placeholder="2023" value={form.year} onChange={e=>setForm({...form, year:e.target.value})} required />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">KM</label>
                                        <input type="number" className="input-field w-full" placeholder="0" value={form.km} onChange={e=>setForm({...form, km:e.target.value})} required />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">Günlük Fiyat</label>
                                    <div className="relative group">
                                        <input type="number" className="input-field w-full pl-10 text-indigo-600 font-bold" placeholder="0.00" value={form.pricePerDay} onChange={e=>setForm({...form, pricePerDay:e.target.value})} required />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-indigo-500">₺</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">Görsel Bağlantısı</label>
                                    <input className="input-field w-full" placeholder="https://..." value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})} />
                                </div>

                                {/* Özellikler */}
                                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Donanım Paketleri</label>
                                    <div className="flex flex-wrap gap-2">
                                        {data.features.map(f => (
                                            <button
                                                type="button"
                                                key={f.id}
                                                onClick={() => toggleFeature(f.id)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all duration-200 ${
                                                    form.featureIds.includes(f.id) 
                                                    ? "bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-800/20" 
                                                    : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-white hover:border-slate-300"
                                                }`}
                                            >
                                                {f.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Butonlar */}
                                <div className="flex gap-2 pt-2">
                                    {editingId && (
                                        <button type="button" onClick={cancelEdit} className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold text-xs hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors">
                                            İPTAL
                                        </button>
                                    )}
                                    <button className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-1 transition-all">
                                        {editingId ? "DEĞİŞİKLİKLERİ KAYDET" : "ARACI SİSTEME EKLE"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                 </div>

                 {/* LİSTE ALANI (Sağ) */}
                 <div className="lg:col-span-8 space-y-6">
                      <h3 className="text-xl font-black text-slate-800 pl-2">Filo Envanteri</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.cars.map(c => (
                          <div key={c.id} className="group bg-white p-4 rounded-[2.5rem] border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] transition-all duration-500 relative hover:-translate-y-1">
                             
                             {/* Görsel */}
                             <div className="relative h-56 rounded-[2rem] overflow-hidden mb-5">
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                                {c.imageUrl ? (
                                    <img src={c.imageUrl} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={c.brand} />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-4xl">🏎️</div>
                                )}
                                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                    <span className="text-sm font-black text-slate-900">{c.pricePerDay} ₺</span>
                                </div>
                             </div>

                             {/* Bilgiler */}
                             <div className="px-2">
                                <div className="flex justify-between items-start mb-3">
                                   <div>
                                     <h4 className="text-xl font-black text-slate-800">{c.brand}</h4>
                                     <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{c.model}</p>
                                   </div>
                                   <div className="text-right">
                                       <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yıl</div>
                                       <div className="font-mono font-bold text-slate-700">{c.year}</div>
                                   </div>
                                </div>
                                
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                                        <span className="text-lg">🛣️</span>
                                        <span className="text-xs font-bold text-slate-600">{c.km.toLocaleString()} KM</span>
                                    </div>
                                    <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-2">
                                        <span className="text-lg">⚙️</span>
                                        <span className="text-xs font-bold text-slate-600">{c.features?.length} Özellik</span>
                                    </div>
                                </div>

                                {/* Aksiyonlar (Hoverda Görünür) */}
                                <div className="grid grid-cols-2 gap-3 opacity-100 sm:opacity-0 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <button onClick={()=>startEdit(c)} className="py-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs hover:bg-indigo-600 hover:text-white transition-colors">
                                        DÜZENLE
                                    </button>
                                    <button onClick={()=>deleteCar(c.id)} className="py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-600 hover:text-white transition-colors">
                                        SİL
                                    </button>
                                </div>
                             </div>
                          </div>
                      ))}
                      </div>
                 </div>
            </div>
        )}

        {/* --- 2. KULLANICILAR --- */}
        {tab === "users" && (
             <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-slate-200/50 border border-white animate-in fade-in zoom-in-95 duration-500 min-h-[500px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="pb-6 pl-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Üye Profili</th>
                                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">İletişim</th>
                                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Hesap Durumu</th>
                                <th className="pb-6 text-right pr-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Yetki</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {data.users.map(u => (
                            <tr key={u.id} className="group hover:bg-slate-50/80 transition-colors">
                                <td className="py-5 pl-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black border shadow-sm ${u.role==='admin' ? 'bg-indigo-100 text-indigo-600 border-indigo-200' : 'bg-white text-slate-600 border-slate-200'}`}>
                                            {u.name.charAt(0)}{u.surname.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800 text-base">{u.name} {u.surname}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: {u.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-5">
                                    <span className="text-sm font-semibold text-slate-600">{u.email}</span>
                                </td>
                                <td className="py-5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aktif
                                    </span>
                                </td>
                                <td className="py-5 pr-4 text-right">
                                    <button 
                                        onClick={()=>changeUserRole(u)} 
                                        className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${u.role==='admin' 
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 hover:bg-indigo-700' 
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                                        }`}
                                    >
                                        {u.role === 'admin' ? 'YÖNETİCİ' : 'STANDART'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
             </div>
        )}

        {/* --- 3. MESAJLAR --- */}
        {tab === "messages" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {data.messages.map(m => (
                    <div key={m.id} className={`bg-white p-1 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${m.reply ? 'bg-gradient-to-br from-emerald-50 to-white' : 'bg-gradient-to-br from-indigo-50 to-white'}`}>
                        <div className="bg-white p-6 rounded-[2.3rem] h-full flex flex-col relative overflow-hidden">
                             {/* Durum Çizgisi */}
                             <div className={`absolute top-0 left-0 w-full h-1.5 ${m.reply ? 'bg-emerald-400' : 'bg-indigo-400'}`}></div>

                             {/* Başlık */}
                             <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold border border-slate-200">
                                        {m.user?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900">{m.user?.name} {m.user?.surname}</h4>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">{new Date(m.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                {m.reply ? (
                                    <span className="text-xl">✅</span>
                                ) : (
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                )}
                             </div>

                             {/* Mesaj İçeriği */}
                             <div className="flex-1">
                                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 text-slate-600 text-sm font-medium leading-relaxed mb-4">
                                    "{m.content}"
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Araç:</span>
                                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded font-bold uppercase border border-slate-200">
                                        {m.car?.brand} {m.car?.model}
                                    </span>
                                </div>
                             </div>

                             {/* Aksiyon Alanı */}
                             <div className="mt-auto">
                                {m.reply ? (
                                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Sizin Yanıtınız:</div>
                                        <p className="text-xs font-medium text-emerald-800">"{m.reply}"</p>
                                    </div>
                                ) : (
                                    <>
                                        {replyingId === m.id ? (
                                            <div className="animate-in fade-in zoom-in duration-200">
                                                <textarea 
                                                    autoFocus
                                                    className="input-field w-full mb-2 h-24 resize-none"
                                                    placeholder="Yanıtınızı yazın..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                ></textarea>
                                                <div className="flex gap-2">
                                                    <button onClick={() => sendReply(m.id)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors">GÖNDER</button>
                                                    <button onClick={() => setReplyingId(null)} className="flex-1 bg-slate-100 text-slate-500 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">VAZGEÇ</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => { setReplyingId(m.id); setReplyText(""); }}
                                                className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-300 flex items-center justify-center gap-2"
                                            >
                                                <span>↩</span> YANITLA
                                            </button>
                                        )}
                                    </>
                                )}
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      
      {/* Özel CSS Sınıfı */}
      <style>{`
        .input-field {
            padding: 14px 16px;
            background-color: #ffffff;
            border-radius: 16px;
            border: 2px solid #e2e8f0;
            outline: none;
            font-size: 0.85rem;
            font-weight: 600;
            color: #1e293b;
            transition: all 0.3s;
        }
        .input-field:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  );
}