import { Link, useNavigate } from "react-router-dom";
 

export default function Navbar() {
  const navigate = useNavigate();
   
  const token = localStorage.getItem("token");


   
 
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    
    <nav className="bg-white text-rose-600 p-4 flex justify-between items-center">


      
      
      <h1 className="text-xl font-extrabold">
        <Link to="/">Tarık Otomotiv</Link>
      </h1>

          

      
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Anasayfa</Link>
        
        
        {token ? (
          <>
            <Link to="/my-reservations" className="hover:underline">Geçmişim</Link>
            <button onClick={handleLogout} className="text-red-400 font-bold hover:underline">
              ÇIKIŞ YAP
            </button>
          </>
        ) : (
          
          <>
            <Link to="/login" className="hover:underline">Giriş Yap</Link>
            <Link to="/register" className="hover:underline">Kayıt Ol</Link>
          </>
        )}
      </div>
    </nav>
  );
}