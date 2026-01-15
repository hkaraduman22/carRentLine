import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) { alert('Araç bulunamadı.'); navigate('/'); }
    };
    fetchCar();
  }, [id, navigate]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays > 0 ? diffDays * car.pricePerDay : 0);
    }
  }, [startDate, endDate, car]);

  const handleRent = async () => {
    if (!localStorage.getItem('token')) return navigate('/login');
    try {
      await api.post('/reservations', { startDate, endDate, carId: Number(id) });
      alert('✅ Kiralama Başarılı!');
      navigate('/my-reservations');
    } catch (e) { alert(e.message); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) return navigate("/login");
    setMsgLoading(true);
    try {
        await api.post('/messages', { content: message, carId: Number(id) });
        alert("Mesaj iletildi.");
        setMessage("");
    } catch (e) { alert("Hata oluştu."); } finally { setMsgLoading(false); }
  };

  if (!car) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Araç bilgileri yükleniyor...</p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      <Navbar />

      {/* Dekoratif Arka Plan (Blobs) */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-10 pt-28 relative z-10">
        
        {/* Breadcrumb / Geri Dön */}
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Listeye Dön
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* SOL TARAF: Görsel ve Bilgiler (8/12) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Görsel Kartı */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 group">
               <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-white p-10 flex items-center justify-center h-[28rem] relative">
                  {/* Arka plan deseni */}
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {car.imageUrl ? (
                      <img 
                        src={car.imageUrl} 
                        className="max-h-full w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out z-10" 
                        alt={car.brand} 
                      />
                  ) : (
                      <div className="flex flex-col items-center text-slate-300">
                          <span className="text-6xl mb-4">🏎️</span>
                          <span className="font-bold uppercase tracking-widest">Görsel Yok</span>
                      </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-slate-100 text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Müsait
                  </div>
               </div>
            </div>

            {/* 2. Detay Bilgileri */}
            <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-50 pb-8">
                  <div>
                     <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                        {car.brand} <span className="font-light text-slate-500">{car.model}</span>
                     </h1>
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">Model: {car.year}</span>
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">{car.km} KM</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Günlük Kiralama</div>
                     <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{car.pricePerDay} ₺</span>
                     </div>
                  </div>
               </div>
               
               <div className="mb-2">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                       <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg text-sm">⚡</span> 
                       Donanım & Özellikler
                   </h3>
                   <div className="flex flex-wrap gap-3">
                     {car.features?.length > 0 ? car.features.map((f, i) => (
                       <span key={i} className="px-5 py-2.5 bg-white text-slate-600 rounded-xl text-sm font-bold border border-slate-200 shadow-sm hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md transition-all cursor-default">
                         {f.name}
                       </span>
                     )) : (
                        <span className="text-slate-400 text-sm italic">Özellik belirtilmemiş.</span>
                     )}
                   </div>
               </div>
            </div>

            {/* 3. Mesaj Kutusu */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 relative z-10">
                    <span>💬</span> Satıcı ile İletişime Geç
                </h3>
                <p className="text-indigo-200 text-sm mb-6 relative z-10">Araç hakkında aklınıza takılanları sorun, en kısa sürede yanıtlayalım.</p>
                
                <form onSubmit={handleSendMessage} className="relative z-10">
                    <div className="relative">
                        <textarea 
                            value={message} 
                            onChange={e=>setMessage(e.target.value)} 
                            placeholder="Merhabalar, aracın lastik durumu hakkında bilgi alabilir miyim?" 
                            className="w-full p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 focus:bg-white/20 focus:border-white/30 focus:ring-0 outline-none h-36 resize-none text-white placeholder:text-indigo-200/50 shadow-inner"
                        ></textarea>
                        <button 
                            disabled={msgLoading || !message.trim()} 
                            className="absolute bottom-4 right-4 bg-white text-indigo-900 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                            {msgLoading ? (
                                <span className="w-4 h-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>GÖNDER <span className="text-lg">🚀</span></>
                            )}
                        </button>
                    </div>
                </form>
            </div>
          </div>

          {/* SAĞ TARAF: Kiralama Paneli (Sticky) (4/12) */}
          <div className="lg:col-span-4 relative">
             <div className="sticky top-28 space-y-6">
                 
                 <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 ring-1 ring-slate-900/5">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 text-xl">📅</div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Rezervasyon</h3>
                            <p className="text-xs text-slate-400">Tarihlerinizi seçin</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block group-focus-within:text-indigo-500 transition-colors">Alış Tarihi</label>
                            <input 
                                type="date" 
                                onChange={e=>setStartDate(e.target.value)} 
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-700 transition-all cursor-pointer" 
                            />
                        </div>
                        <div className="group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block group-focus-within:text-indigo-500 transition-colors">İade Tarihi</label>
                            <input 
                                type="date" 
                                onChange={e=>setEndDate(e.target.value)} 
                                className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-700 transition-all cursor-pointer" 
                            />
                        </div>
                    </div>
                    
                    {/* Fiyat Hesaplama Alanı */}
                    <div className="mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-500 text-sm font-medium">Toplam Tutar</span>
                            {totalPrice > 0 ? (
                                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Hesaplandı</span>
                            ) : (
                                <span className="text-slate-300 text-xs">---</span>
                            )}
                        </div>
                        <div className="flex justify-between items-baseline">
                             <span className="text-xs text-slate-400">Vergiler Dahil</span>
                             <span className={`text-3xl font-black transition-all duration-300 ${totalPrice > 0 ? 'text-slate-900' : 'text-slate-300'}`}>
                                 {totalPrice} <span className="text-lg font-bold">₺</span>
                             </span>
                        </div>
                    </div>

                    <button 
                        onClick={handleRent} 
                        disabled={totalPrice <= 0} 
                        className="w-full mt-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:scale-[1.02] hover:from-indigo-600 hover:to-violet-600 hover:shadow-indigo-200 transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        <span>HEMEN KİRALA</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    
                    <p className="text-center text-[10px] text-slate-400 mt-4 px-4 leading-relaxed">
                        Devam ederek <span className="underline cursor-pointer hover:text-indigo-500">Kiralama Koşulları</span>'nı kabul etmiş sayılırsınız.
                    </p>
                 </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default CarDetail;