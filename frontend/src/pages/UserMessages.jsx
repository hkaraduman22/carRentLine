import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Yeni Mesaj State'leri
  const [replyingId, setReplyingId] = useState(null); 
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages/my');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (carId) => {
      if(!newContent.trim()) return;

      try {
          await api.post("/messages", { 
              carId: carId, 
              content: newContent 
          });
          
          alert("✅ Mesajınız başarıyla iletildi!");
          setNewContent("");
          setReplyingId(null);
          fetchMessages(); 
      } catch (error) {
          console.error("Mesaj gönderilemedi:", error);
          alert("❌ Hata oluştu.");
      }
  };

  // Tarih formatlayıcı
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("tr-TR", { 
        day: 'numeric', month: 'long', hour: '2-digit', minute:'2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
      <Navbar />

      {/* --- Dinamik Arka Plan --- */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-multiply"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 pt-28 max-w-4xl relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3 border border-indigo-100">
                Destek Merkezi
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Mesaj Kutusu
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">
                Araçlar hakkında sorduğun sorular ve yetkili yanıtları burada listelenir.
            </p>
        </div>

        <div className="space-y-8">
          {/* Yükleniyor Durumu */}
          {loading && (
             <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
             </div>
          )}

          {/* Boş Durum */}
          {!loading && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 text-center">
               <div className="w-24 h-24 bg-gradient-to-tr from-slate-100 to-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner border border-slate-100">
                 💬
               </div>
               <h3 className="text-2xl font-bold text-slate-800">Henüz mesajın yok.</h3>
               <p className="text-slate-500 mt-2 max-w-xs mx-auto">Merak ettiğin araçlar hakkında soru sormak için filomuza göz at.</p>
               <Link to="/" className="mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200">
                  Araçları İncele
               </Link>
            </div>
          )}

          {/* Mesaj Listesi */}
          {!loading && messages.map((msg, index) => (
            <div 
                key={msg.id} 
                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                
                {/* 1. Üst Bar: Araç Bilgisi */}
                <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm p-1 overflow-hidden">
                            {msg.car?.imageUrl ? (
                                <img src={msg.car.imageUrl} alt="car" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl">🚗</div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                {msg.car?.brand} <span className="font-medium text-slate-500">{msg.car?.model}</span>
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                                <span>{formatDate(msg.createdAt)}</span>
                            </div>
                        </div>
                    </div>

                    {msg.reply ? (
                         <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Yanıtlandı
                         </span>
                    ) : (
                         <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            Bekleniyor
                         </span>
                    )}
                </div>

                {/* 2. Sohbet Alanı */}
                <div className="p-8 space-y-8">
                    
                    {/* Kullanıcı Mesajı */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-slate-200">
                                BEN
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative bg-white p-6 rounded-[1.5rem] rounded-tl-none border border-slate-100 text-slate-700 leading-relaxed shadow-sm hover:border-slate-200 transition-colors">
                                {msg.content}
                            </div>
                        </div>
                    </div>

                    {/* Admin Cevabı (Varsa) */}
                    {msg.reply && (
                        <div className="flex gap-5 flex-row-reverse animate-in fade-in slide-in-from-right-4 duration-700">
                             <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-200">
                                    ⚡
                                </div>
                            </div>
                            <div className="flex-1 text-right">
                                <div className="relative bg-indigo-50/50 p-6 rounded-[1.5rem] rounded-tr-none border border-indigo-100 text-indigo-900 leading-relaxed shadow-sm inline-block text-left w-full group-hover:bg-indigo-50 transition-colors">
                                    <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Yetkili Yanıtı</span>
                                    {msg.reply}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Alt Kısım: Yeni Mesaj Gönderme */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
                    {replyingId === msg.id ? (
                        <div className="animate-in fade-in zoom-in duration-300 bg-white p-1.5 rounded-3xl border border-indigo-200 shadow-lg ring-4 ring-indigo-50/50">
                            <textarea
                                autoFocus
                                className="w-full p-4 text-sm border-none rounded-2xl focus:ring-0 outline-none text-slate-700 placeholder:text-slate-400 resize-none bg-transparent font-medium"
                                rows="3"
                                placeholder={`${msg.car?.brand} hakkında başka bir sorunuz var mı?`}
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            ></textarea>
                            <div className="flex items-center justify-between px-4 pb-2 pt-2 border-t border-slate-50">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:block">Enter tuşu alt satıra geçer</span>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => setReplyingId(null)} 
                                        className="flex-1 sm:flex-none px-5 py-2.5 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                                    >
                                        Vazgeç
                                    </button>
                                    <button 
                                        onClick={() => handleSendMessage(msg.carId)} 
                                        className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Gönder
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => { setReplyingId(msg.id); setNewContent(""); }}
                            className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 font-bold text-sm hover:border-indigo-400 hover:text-indigo-600 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn bg-transparent"
                        >
                            <span className="bg-slate-200 text-slate-500 w-8 h-8 rounded-full flex items-center justify-center group-hover/btn:bg-indigo-100 group-hover/btn:text-indigo-600 transition-colors">✍️</span> 
                            Bu konu hakkında tekrar yaz
                        </button>
                    )}
                </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}