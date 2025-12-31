import { Link, useNavigate } from "react-router-dom";
 

export default function Navbar() {
  const navigate = useNavigate();
  
  // Tarayıcı hafızasından Token'ı oku
  const token = localStorage.getItem("token");


   

  // Çıkış Yapma İşlemi
  const handleLogout = () => {
    localStorage.removeItem("token"); // Token'ı sil
    navigate("/login"); // Login'e gönder
  };

  return (
    // flex justify-between: Sol ve Sağ tarafa yasla
    <nav className="bg-white text-rose-600 p-4 flex justify-between items-center">


      
      {/* Sol: Logo */}
      <h1 className="text-xl font-extrabold">
        <Link to="/">Tarık Otomotiv</Link>
      </h1>

          

      {/* Sağ: Menü Linkleri */}
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Anasayfa</Link>
        
        {/* --- KOŞULLU GÖSTERİM (TERNARY IF) --- */}
        {/* Token varsa (Giriş yapıldıysa) */}
        {token ? (
          <>
            <Link to="/my-reservations" className="hover:underline">Geçmişim</Link>
            <button onClick={handleLogout} className="text-red-400 font-bold hover:underline">
              ÇIKIŞ YAP
            </button>
          </>
        ) : (
          /* Token yoksa (Misafir ise) */
          <>
            <Link to="/login" className="hover:underline">Giriş Yap</Link>
            <Link to="/register" className="hover:underline">Kayıt Ol</Link>
          </>
        )}
      </div>
    </nav>
  );
}