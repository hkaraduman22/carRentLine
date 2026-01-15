import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  
  // Yeni Mesaj State'leri
  const [replyingId, setReplyingId] = useState(null); 
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    api.get('/messages/my')
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  };

  const handleSendMessage = async (carId) => {
      if(!newContent.trim()) return;

      try {
          await api.post("/messages", { 
              carId: carId, 
              content: newContent 
          });
          
          // Başarılı işlem görsel geri bildirimi (opsiyonel basit alert)
          alert("Mesajınız iletildi. Teşekkürler! 🚀");
          setNewContent("");
          setReplyingId(null);
          fetchMessages(); 
      } catch (error) {
          console.error("Mesaj gönderilemedi:", error);
          alert("Hata oluştu.");
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden">
      <Navbar />

      {/* Dekoratif Arka Plan Efektleri */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-indigo-900/5 -skew-y-6 origin-top-left -z-10 blur-3xl"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4 pt-10 max-w-4xl relative z-10">
        
        {/* Header Section */}
        <div className="relative bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-200 overflow-hidden mb-12 text-center md:text-left">
            {/* Header Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Mesajlarım</h1>
                    <p className="text-indigo-100 mt-2 text-lg font-light">Araçlarla ilgili tüm sorularınız ve yetkili yanıtları.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                    <span className="text-4xl">💬</span>
                </div>
            </div>
        </div>

        <div className="space-y-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-300 shadow-sm">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-4 text-slate-300 animate-pulse">
                 📭
               </div>
               <h3 className="text-xl font-bold text-slate-700">Gelen Kutusu Boş</h3>
               <p className="text-slate-500 mt-2">Henüz herhangi bir araç için mesaj göndermediniz.</p>
               <Link to="/" className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  Araçları İncele
               </Link>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden">
                
                {/* Mesaj Kartı Başlığı (Araç Bilgisi) */}
                <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-5 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl">
                            🚗
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">{msg.car?.brand} <span className="font-normal text-slate-500">{msg.car?.model}</span></h3>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mt-0.5">
                                <span>Kiralama ID: #{msg.id}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span>{new Date(msg.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    {msg.reply ? (
                         <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Yanıtlandı
                         </span>
                    ) : (
                         <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            Bekliyor
                         </span>
                    )}
                </div>

                {/* Sohbet Alanı */}
                <div className="p-8 space-y-8 bg-white">
                    
                    {/* Kullanıcı Mesajı (Sağ Tarafa Yaslı veya Sol - Tasarım tercihine göre, burada Sol'da tuttuk ama şıklaştırdık) */}
                    <div className="flex gap-5">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-500 shadow-inner">
                                SZ
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative bg-slate-50 p-6 rounded-2xl rounded-tl-none border border-slate-200 text-slate-700 leading-relaxed shadow-sm">
                                <span className="absolute -top-6 left-0 text-xs font-bold text-slate-400 uppercase tracking-wider">Siz sordunuz:</span>
                                {msg.content}
                            </div>
                        </div>
                    </div>

                    {/* Admin Cevabı */}
                    {msg.reply && (
                        <div className="flex gap-5 flex-row-reverse animate-in fade-in slide-in-from-right-4 duration-700">
                             <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200 ring-4 ring-white">
                                    A
                                </div>
                            </div>
                            <div className="flex-1 text-right">
                                <div className="relative bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-2xl rounded-tr-none border border-indigo-100 text-indigo-900 leading-relaxed shadow-sm inline-block text-left w-full">
                                    <span className="absolute -top-6 right-0 text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1 justify-end">
                                        Yetkili Cevabı <span className="text-lg">✓</span>
                                    </span>
                                    {msg.reply}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Alt Kısım: Aksiyon / Yeni Mesaj */}
                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100">
                    {replyingId === msg.id ? (
                        <div className="animate-in fade-in zoom-in duration-300 bg-white p-1 rounded-2xl border border-indigo-100 shadow-lg ring-4 ring-indigo-50">
                            <textarea
                                autoFocus
                                className="w-full p-4 text-sm border-none rounded-xl focus:ring-0 outline-none text-slate-700 placeholder:text-slate-400 resize-none bg-transparent"
                                rows="3"
                                placeholder={`${msg.car?.brand} ${msg.car?.model} hakkında eklemek istediklerinizi yazın...`}
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            ></textarea>
                            <div className="flex items-center justify-between px-4 pb-2 pt-2 border-t border-slate-50">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Enter tuşu alt satıra geçer</span>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setReplyingId(null)} 
                                        className="px-4 py-2 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
                                    >
                                        Vazgeç
                                    </button>
                                    <button 
                                        onClick={() => handleSendMessage(msg.carId)} 
                                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-transform active:scale-95 flex items-center gap-2"
                                    >
                                        <span>Gönder</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => { setReplyingId(msg.id); setNewContent(""); }}
                            className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold text-sm hover:border-indigo-300 hover:text-indigo-600 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            <span className="group-hover/btn:scale-110 transition-transform">✍️</span> 
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