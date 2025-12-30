import { BrowserRouter, Routes, Route } from "react-router-dom";

// Sayfalar
//YÖNLENDİRME İŞİ 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarDetail from "./pages/CarDetail";
import Navbar from "./components/Navbar";
 
// Bekçi (Güvenlik) Componenti
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ DOĞRU (Süslü parantez yok)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- HERKESİN GİREBİLECEĞİ SAYFALAR (PUBLIC) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* --- SADECE ÜYELERİN GİREBİLECEĞİ SAYFALAR (PRIVATE) --- */}
        
        {/* 1. Anasayfa (Korumalı) */}
        <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        } />

{/*carDEtail sayfası*/}
<Route path="/car/:id" element={
            <ProtectedRoute>
              <CarDetail />
            </ProtectedRoute>
        } />
         
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

