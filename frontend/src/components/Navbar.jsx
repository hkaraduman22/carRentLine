import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll efektini takip et (Navbar aşağı inince gölge ekle)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kullanıcı bilgisini güncelle
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Aktif link stili
  const navLinkClass = (path) => 
    `relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl group overflow-hidden ${
      location.pathname === path 
        ? "text-white bg-indigo-600 shadow-lg shadow-indigo-200" 
        : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
    }`;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/20 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg py-3" 
          : "bg-white/70 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-200 group-hover:rotate-12 transition-transform duration-500">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 group-hover:from-indigo-600 group-hover:to-rose-600 transition-all duration-500">
                Tarık Otomotiv
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">
                Premium Rent A Car
              </span>
            </div>
          </Link>

          {/* --- ORTA MENÜ --- */}
          <div className="hidden md:flex items-center bg-white/50 p-1.5 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md">
            <Link to="/" className={navLinkClass("/")}>
              Anasayfa
            </Link>
            
            {user && (
              <>
                <Link to="/my-reservations" className={navLinkClass("/my-reservations")}>
                  Kiralamalarım
                </Link>
                <Link to="/messages" className={navLinkClass("/messages")}>
                  Mesajlarım
                </Link>
              </>
            )}

            {user && (user.role === "admin" || user.role === "ADMIN") && (
                <Link to="/admin" className={`${navLinkClass("/admin")} flex items-center gap-1 !text-rose-600 !bg-rose-50 hover:!bg-rose-100`}>
                  <span>🛡️</span> Panel
                </Link>
            )}
          </div>

          {/* --- SAĞ TARAF (Auth) --- */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="hidden lg:flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-800">{user.name} {user.surname}</span>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase bg-indigo-50 px-2 py-0.5 rounded-full">{user.role}</span>
                </div>

                <button 
                  onClick={handleLogout} 
                  className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 flex items-center justify-center group"
                  title="Çıkış Yap"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                  Giriş Yap
                </Link>
                <Link to="/register" className="relative px-6 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden group shadow-lg shadow-indigo-200">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -translate-x-full"></div>
                  <span className="relative flex items-center gap-2">
                    Kayıt Ol 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}