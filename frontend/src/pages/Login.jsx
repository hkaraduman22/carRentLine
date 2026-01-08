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
      
      // Token ve User bilgisini kaydet
      localStorage.setItem("token", res.data.access_token);
      //OBJELER İÇİN STRİNG DÖNÜŞÜMÜ YOK O YÜZDEN
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Giriş Başarılı!");

      // --- YÖNLENDİRME ---
      // Eğer rol Admin ise panele, değilse anasayfaya
      if (res.data.user.role === "ADMIN" || res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      // -------------------

    } catch (error) {
      
      
      const msg = error.message || "Giriş başarısız! Bilgileri kontrol et.";
      
      if (Array.isArray(msg)) {
        alert(msg.join("\n"));
      } else {
        alert(msg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center shadow-sm">

        <div className="bg-white p-10 shadow-lg rounded-xl flex flex-col items-center max-w-xl w-96">
        <h1 className="text-2xl font-bold mb-5 text-center">Giriş Yap</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full max-w-md">
          <input
            type="email" placeholder="Email"
            className="border border-black p-2 w-mid"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="Şifre"
            className="border border-black p-2 w-mid mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-black text-white p-2 w-mid mb-3 rounded-full">
            GİRİŞ YAP
          </button>
        </form>
        <Link to="/register" className="text-blue-600 underline">
          Hesabın yok mu? Kayıt Ol
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
}