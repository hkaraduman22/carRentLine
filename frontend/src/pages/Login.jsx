import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.accessToken);
      alert("✅ Giriş Başarılı!");
      navigate("/");
      
    } catch (error) {
      console.error("🔥 HATA:", error); // Konsola hatayı bas

      // 1. Sunucu Cevap Verdi mi? (Response var mı?)
      if (error.response) {
         // Backend bize bir cevap döndü (400, 401, 500 vs.)
         const data = error.response.data;
         
         if (data && data.message) {
            if (Array.isArray(data.message)) {
              alert(data.message.join("\n")); // Liste ise alt alta yaz
            } else {
              alert(data.message); // Tek satırsa direkt yaz
            }
         } else {
            alert("Hata oluştu: " + error.response.status);
         }
      } 
      // 2. Sunucu Hiç Cevap Vermedi mi? (Response YOK)
      else if (error.request) {
        alert("⚠️ Sunucuya bağlanılamadı! Backend çalışıyor mu?");
      } 
      // 3. Kod hatası mı?
      else {
        alert("Bir şeyler ters gitti: " + error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-5">Giriş Yap</h1>
        {/* noValidate: Tarayıcı kontrolünü kapat, hatayı Backend versin */}
        <form onSubmit={handleLogin} noValidate>
          <input
            type="email" placeholder="Email"
            className="border border-black p-2 w-full mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="Şifre"
            className="border border-black p-2 w-full mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-black text-white p-2 w-full mb-3">
            GİRİŞ YAP
          </button>
        </form>
        <Link to="/register" className="text-blue-600 underline">
          Hesabın yok mu? Kayıt Ol
        </Link>
      </div>
    </div>
  );
}
  
