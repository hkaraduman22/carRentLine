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
      await api.post("/auth/register", { name, surname,email, password });
      alert("Kayıt Başarılı!");
      navigate("/login");
    } catch (error) {
      
    
    {/*BACKENDDEN HATA GELDİ Mİ*/}
    if(error.response&&error.response.data){

        const errorMsg=error.response.data.message;

        if(Array.isArray(errorMsg)){
            alert(errorMsg.join("\n"))
        }else{
            alert(errorMsg)
        }
    }else{
        alert("bilinmeyen bir hata oluştu!")
    }
}
  };

  return (
    <div>
      <Navbar />
      {/* Kenar boşluğu (padding) 10 */}
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-5">Kayıt Ol</h1>
        
        <form onSubmit={handleRegister}>
          {/* İsim */}
          <input 
            type="text" placeholder="Ad Soyad" required
            className="border border-black p-2 w-full mb-3" // Siyah kenarlık, alt boşluk
            onChange={(e) => setName(e.target.value)}
          />
          //soyisim
          <input 
            type="text" placeholder="Soyad" required
            className="border border-black p-2 w-full mb-3"
            onChange={(e) => setSurname(e.target.value)}
          />

          {/* Email */}
          <input 
            type="email" placeholder="Email" required
            className="border border-black p-2 w-full mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Şifre */}
          <input 
            type="password" placeholder="Şifre" required
            className="border border-black p-2 w-full mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Siyah Buton */}
          <button className="bg-black text-white p-2 w-full mb-3">
            KAYIT OL
          </button>
        </form>

        <Link to="/login" className="text-blue-600 underline">
            Zaten hesabın var mı? Giriş Yap
        </Link>
      </div>
    </div>
  );
}



