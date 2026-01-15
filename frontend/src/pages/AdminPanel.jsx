import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [tab, setTab] = useState("cars");
  const [data, setData] = useState({ cars: [], users: [], features: [], messages: [] });
  
  // Araç Form State'leri
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });

  // Mesaj Cevaplama State'leri
  const [replyText, setReplyText] = useState("");
  const [replyingId, setReplyingId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [c, u, f, m] = await Promise.all([
        api.get("/cars"), 
        api.get("/users"), 
        api.get("/features"),
        api.get("/messages")
      ]);
      setData({ cars: c.data, users: u.data, features: f.data, messages: m.data });
    } catch (e) { console.error(e); }
  };

  // --- ARAÇ İŞLEMLERİ ---
  const submitCar = async (e) => {
    e.preventDefault();
    try {
        const payload = { 
          brand: form.brand,
          model: form.model,
          imageUrl: form.imageUrl,
          km: Number(form.km), 
          year: Number(form.year), 
          pricePerDay: Number(form.pricePerDay),
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
        const errorMsg = e.response?.data?.message || "Bir hata oluştu.";
        alert(`Hata: ${Array.isArray(errorMsg) ? errorMsg.join("\n") : errorMsg}`); 
    }
  };

  const deleteCar = async (id) => { if(window.confirm("Bu aracı silmek istediğinize emin misiniz?")) { await api.delete(`/cars/${id}`); loadData(); }};
  
  const startEdit = (c) => { 
    setEditingId(c.id); 
    setForm({ 
        brand: c.brand, 
        model: c.model, 
        year: c.year, 
        km: c.km, 
        pricePerDay: c.pricePerDay, 
        imageUrl: c.imageUrl || "", 
        featureIds: c.features ? c.features.map(f => f.id) : [] 
    }); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const cancelEdit = () => { setEditingId(null); setForm({ brand:"", model:"", year:"", km:"", pricePerDay:"", imageUrl:"", featureIds:[] }); };
  
  const toggleFeature = (id) => setForm(p => ({...p, featureIds: p.featureIds.includes(id) ? p.featureIds.filter(x=>x!==id) : [...p.featureIds, id]}));
  
  // --- KULLANICI İŞLEMLERİ ---
  const changeUserRole = async (u) => { if(window.confirm(`${u.name} kullanıcısının rolünü değiştirmek istiyor musunuz?`)) { await api.put(`/users/${u.id}`, {role: u.role==="admin"?"user":"admin"}); loadData(); }};

  // --- MESAJ CEVAPLAMA İŞLEMİ ---
  const sendReply = async (msgId) => {
    if(!replyText.trim()) return;
    try {
        await api.put(`/messages/${msgId}/reply`, { reply: replyText });
        alert("✅ Cevap gönderildi!");
        setReplyText("");
        setReplyingId(null);
        loadData(); 
    } catch (e) {
        alert("Cevap gönderilirken bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans selection:bg-indigo-500 selection:text-white pb-20">
      <Navbar />
      
      {/* Header Background Decoration */}
      <div className="bg-slate-900 h-64 w-full absolute top-0 left-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-90"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 pt-28 relative z-10 max-w-7xl">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
           <div className="text-white">
             <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm">Yönetim Paneli</h1>
             <p className="text-indigo-100 mt-2 text-lg font-light opacity-90">Sistem verilerini ve içerikleri tek merkezden yönetin.</p>
           </div>
           
           {/* Modern Tab Navigation */}
           <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex overflow-x-auto min-w-max shadow-xl">
            {["cars", "users", "messages"].map(t => (
                <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    tab === t 
                    ? "bg-white text-indigo-600 shadow-lg scale-100" 
                    : "text-indigo-100 hover:bg-white/10 hover:text-white"
                }`}
                >
                {t === "cars" ? "🚘 Araç Filosu" : t === "users" ? "👥 Kullanıcılar" : "💬 Mesajlar"}
                </button>
            ))}
           </div>
        </div>

        {/* --- ARAÇLAR SEKME İÇERİĞİ --- */}
        {tab === "cars" && (
            <div className="grid lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                 
                 {/* SOL: Araç Ekleme Formu */}
                 <div className="lg:col-span-4 sticky top-24">
                    <form onSubmit={submitCar} className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 relative overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">
                                {editingId ? "Aracı Düzenle" : "Yeni Araç Oluştur"}
                            </h3>
                            {editingId && (
                                <button type="button" onClick={cancelEdit} className="text-xs bg-rose-100 text-rose-600 px-3 py-1.5 rounded-full font-bold hover:bg-rose-200 transition">
                                    Vazgeç
                                </button>
                            )}
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 group">
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Marka & Model</label>
                                    <div className="flex gap-3">
                                        <input className="input-modern w-1/3" placeholder="Marka" value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} required />
                                        <input className="input-modern w-2/3" placeholder="Model" value={form.model} onChange={e=>setForm({...form, model:e.target.value})} required />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Model Yılı</label>
                                    <input type="number" className="input-modern w-full" placeholder="2023" value={form.year} onChange={e=>setForm({...form, year:e.target.value})} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Kilometre</label>
                                    <input type="number" className="input-modern w-full" placeholder="0" value={form.km} onChange={e=>setForm({...form, km:e.target.value})} required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Günlük Fiyat</label>
                                <div className="relative group">
                                    <input type="number" className="input-modern w-full pl-10 text-indigo-600 font-bold" placeholder="0.00" value={form.pricePerDay} onChange={e=>setForm({...form, pricePerDay:e.target.value})} required />
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-indigo-500">₺</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 ml-1">Görsel URL</label>
                                <input className="input-modern w-full text-xs" placeholder="https://..." value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})} />
                            </div>
                            
                            {/* Özellik Seçimi */}
                            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Donanım Özellikleri</label>
                                <div className="flex flex-wrap gap-2">
                                    {data.features.map(f => (
                                        <button
                                            type="button"
                                            key={f.id}
                                            onClick={() => toggleFeature(f.id)}
                                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200 ${
                                                form.featureIds.includes(f.id) 
                                                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" 
                                                : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"
                                            }`}
                                        >
                                            {f.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className={`w-full py-4 mt-2 rounded-2xl font-bold text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 ${editingId ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-200 hover:shadow-orange-300" : "bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1"}`}>
                                {editingId ? (
                                    <><span>↻</span> Değişiklikleri Kaydet</>
                                ) : (
                                    <><span>+</span> Aracı Sisteme Ekle</>
                                )}
                            </button>
                        </div>
                    </form>
                 </div>

                 {/* SAĞ: Araç Listesi */}
                 <div className="lg:col-span-8 space-y-4">
                     <div className="flex items-center justify-between pl-1">
                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                           Filo Listesi <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{data.cars.length}</span>
                        </h3>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {data.cars.map(c => (
                          <div key={c.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group flex flex-col">
                             <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                                {c.imageUrl ? (
                                    <img src={c.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={c.brand} />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50/50">
                                        <span className="text-4xl mb-2">🏎️</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Görsel Yok</span>
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                    {c.pricePerDay} ₺
                                </div>
                             </div>

                             <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                   <div>
                                     <h4 className="text-lg font-bold text-slate-800 leading-tight">{c.brand}</h4>
                                     <span className="text-slate-500 text-sm font-medium">{c.model}</span>
                                   </div>
                                   <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-lg border border-slate-200">{c.year}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
                                    <span>⏱ {c.km} KM</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span>{c.features?.length} Özellik</span>
                                </div>
                             </div>

                             <div className="flex gap-2 mt-auto pt-4 border-t border-slate-50">
                                <button onClick={()=>startEdit(c)} className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors">
                                    DÜZENLE
                                </button>
                                <button onClick={()=>deleteCar(c.id)} className="flex-1 py-2 bg-white text-rose-500 rounded-xl text-xs font-bold border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition-colors">
                                    SİL
                                </button>
                             </div>
                          </div>
                      ))}
                     </div>
                 </div>
            </div>
        )}

        {/* --- KULLANICILAR SEKME İÇERİĞİ --- */}
        {tab === "users" && (
             <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80 border-b border-slate-100">
                            <tr>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Kullanıcı</th>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">E-Posta</th>
                                <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Rol</th>
                                <th className="p-6 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                        {data.users.map(u => (
                            <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="p-5 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-50">
                                            {u.name.charAt(0)}{u.surname.charAt(0)}
                                        </div>
                                        <div className="font-bold text-slate-700">{u.name} {u.surname}</div>
                                    </div>
                                </td>
                                <td className="p-5 text-sm text-slate-500 font-medium">{u.email}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border inline-flex items-center gap-1 ${u.role==='admin'?'bg-violet-50 text-violet-700 border-violet-100':'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${u.role==='admin'?'bg-violet-500':'bg-slate-400'}`}></span>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-5 text-right">
                                    <button onClick={()=>changeUserRole(u)} className="text-xs bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all shadow-sm">
                                        Yetki Değiştir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
             </div>
        )}

        {/* --- MESAJLAR SEKME İÇERİĞİ --- */}
        {tab === "messages" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {data.messages.map(m => (
                    <div key={m.id} className={`bg-white p-6 rounded-[2rem] shadow-sm border hover:shadow-lg transition-all flex flex-col h-full relative overflow-hidden group ${m.reply ? 'border-green-100' : 'border-indigo-100'}`}>
                        {/* Status Strip */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${m.reply ? 'bg-green-400' : 'bg-indigo-500'}`}></div>

                        <div className="flex justify-between items-start mb-4 pl-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {m.user?.name?.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">{m.user?.name} {m.user?.surname}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium">{new Date(m.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 flex-1 pl-2">
                            <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none text-slate-600 text-sm leading-relaxed border border-slate-100 mb-3">
                                {m.content}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">İlgili Araç:</span>
                                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100 font-bold uppercase">
                                    {m.car?.brand} {m.car?.model}
                                </span>
                            </div>
                        </div>

                        <div className="mt-auto pl-2">
                            {m.reply ? (
                                <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 text-xs">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px]">✓</div>
                                        <span className="block font-bold text-green-700">Yanıtlandı</span>
                                    </div>
                                    <p className="text-green-800/80 italic">"{m.reply}"</p>
                                </div>
                            ) : (
                                <div>
                                    {replyingId === m.id ? (
                                        <div className="animate-in fade-in zoom-in duration-200 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                                            <textarea 
                                                autoFocus
                                                className="w-full bg-white p-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none mb-2 shadow-inner"
                                                rows="3"
                                                placeholder="Yanıtınızı buraya yazın..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                            ></textarea>
                                            <div className="flex gap-2">
                                                <button onClick={() => sendReply(m.id)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200">GÖNDER</button>
                                                <button onClick={() => setReplyingId(null)} className="flex-1 bg-white text-slate-500 border border-slate-200 py-2 rounded-lg text-xs font-bold hover:bg-slate-50">İPTAL</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => { setReplyingId(m.id); setReplyText(""); }}
                                            className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200 hover:shadow-indigo-200 flex items-center justify-center gap-2"
                                        >
                                            <span>↩</span> YANITLA
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
      
      <style>{`
        .input-modern {
            padding: 12px 16px;
            background-color: #ffffff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            outline: none;
            font-size: 0.9rem;
            font-weight: 500;
            color: #1e293b;
            transition: all 0.2s;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .input-modern:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </div>
  );
}