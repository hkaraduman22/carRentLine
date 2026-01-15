import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", { name, surname, email, password });
      alert("✅ Kayıt Başarılı! Giriş ekranına yönlendiriliyorsunuz.");
      navigate("/login");
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Kayıt işlemi başarısız.";
      alert(Array.isArray(msg) ? msg.join("\n") : msg);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-rose-500 selection:text-white flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Arka Plan Dekorasyonları (Login ile birebir uyumlu) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-8">
        
        {/* --- MERKEZİ BÜYÜK KART --- */}
        <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl border border-white overflow-hidden flex flex-col md:flex-row relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 h-auto min-h-[600px]">
            
            {/* 1. SOL Taraf: GÖRSEL ALANI */}
            <div className="hidden md:block w-5/12 relative overflow-hidden group bg-slate-900">
                <img 
                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop" 
                    alt="Register Car" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transform transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
                
                {/* Üzerindeki Yazılar */}
                <div className="absolute bottom-10 left-10 z-20 pr-8 transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 shadow-lg shadow-rose-500/30">
                        <span className="text-lg">🚀</span> Hızlı Kayıt
                    </div>
                    <h2 className="text-4xl font-black text-white leading-tight mb-2">Aramıza <br/> Katıl</h2>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed border-l-2 border-rose-500 pl-4">
                        Sınırsız özgürlük için ilk adımı at. Hesabını oluştur ve hemen yola çık.
                    </p>
                </div>
            </div>

            {/* 2. SAĞ Taraf: FORM ALANI */}
            <div className="w-full md:w-7/12 p-10 lg:p-14 flex flex-col justify-center bg-white relative">
                
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-tr from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 text-slate-700 shadow-sm border border-slate-100 ring-4 ring-slate-50">
                        ✨
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hesap Oluştur</h1>
                    <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-wider">Ayrıcalıklı dünyaya adım at</p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-5">
                    
                    {/* İsim Soyisim Grid (Yan Yana) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-indigo-600 transition-colors">Ad</label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Adınız"
                                    required
                                    className="w-full p-4 pl-10 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-semibold text-slate-700 transition-all shadow-sm group-hover:border-slate-300"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none group-focus-within:text-indigo-500 transition-colors">👤</div>
                            </div>
                        </div>
                        <div className="space-y-1.5 group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-indigo-600 transition-colors">Soyad</label>
                             <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Soyadınız"
                                    required
                                    className="w-full p-4 pl-4 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-semibold text-slate-700 transition-all shadow-sm group-hover:border-slate-300"
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-indigo-600 transition-colors">E-Posta</label>
                        <div className="relative">
                            <input 
                                type="email"
                                placeholder="ornek@email.com"
                                required
                                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-semibold text-slate-700 transition-all shadow-sm group-hover:border-slate-300"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none group-focus-within:text-indigo-500 transition-colors">✉️</div>
                        </div>
                    </div>

                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-indigo-600 transition-colors">Şifre</label>
                        <div className="relative">
                            <input 
                                type="password"
                                placeholder="En az 6 karakter"
                                required
                                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-semibold text-slate-700 transition-all shadow-sm group-hover:border-slate-300"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none group-focus-within:text-indigo-500 transition-colors">🔑</div>
                        </div>
                    </div>

                    <div className="pt-4">
                        {/* --- PREMIUM BUTON (Login ile aynı stil) --- */}
                        <button 
                            disabled={loading}
                            className="w-full py-4 relative overflow-hidden group bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-indigo-500/40 transition-all duration-300 transform active:scale-[0.98]"
                        >
                            {/* Gradient Hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* İçerik */}
                            <div className="relative flex items-center justify-center gap-2">
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        <span className="text-white font-bold tracking-wide">KAYIT OL</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:translate-x-1 transition-transform duration-300"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        Zaten hesabın var mı?{" "}
                        <Link to="/login" className="text-rose-600 font-bold hover:text-rose-800 hover:underline decoration-2 underline-offset-2 transition-all">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}