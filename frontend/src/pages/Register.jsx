import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [name, setName] = useState("");
  const[surname,setSurname]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   const handleRegister = async (e) => {
  e.preventDefault();

  try {
    await api.post("/auth/register", { name, surname, email, password });
    alert("Kayıt Başarılı!");
    navigate("/login");
  } catch (error) {
  
      
      // api.js sayesinde mesaj direkt 'error.message' içinde geliyor
            const msg = error.message || "Kayıt işlemi başarısız.";


      if (Array.isArray(msg)) {
        // Eğer birden fazla hata varsa (Örn: Şifre kısa, Email geçersiz)
        alert(msg.join("\n"));
      } else {
        // Tek bir hata varsa (Örn: Bu email zaten kayıtlı)
        alert(msg);
      }
}
};


  
return (
  <div className="min-h-screen bg-blue-100">
  <div className="h-screen flex flex-col">
     

<Navbar />
    <div className="flex-1 flex items-center justify-center shadow-xl">
      {/* ORTADAKİ KUTU */}
      <div className=" bg-white p-10 shadow-lg rounded-xl flex flex-col items-center max-w-xl w-96">
        <h1 className="text-2xl font-bold mb-5 text-center">Kayıt Ol</h1>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-3 w-full">
          <input 
            type="text"
            placeholder="Ad"
            required
            className="border border-black p-2 w-full"
            onChange={(e) => setName(e.target.value)}
          />
          
          <input 
            type="text"
            placeholder="Soyad"
            required
            className="border border-black p-2 w-full"
            onChange={(e) => setSurname(e.target.value)}
          />

          <input 
            type="email"
            placeholder="Email"
            required
            className="border border-black p-2 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password"
            placeholder="Şifre"
            required
            className="border border-black p-2 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-black text-white p-2 w-full rounded-md">
            KAYIT OL
          </button>
        </form>

        <Link to="/login" className="mt-4 text-center text-blue-600 underline">
          Zaten hesabın var mı? Giriş Yap
        </Link>
      </div>
    </div>
  </div>
  </div>
);

}



