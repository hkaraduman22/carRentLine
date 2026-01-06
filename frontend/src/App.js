import { BrowserRouter, Routes, Route } from "react-router-dom";

// Sayfalar
//YÖNLENDİRME İŞİ 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarDetail from "./pages/CarDetail";
import Navbar from "./components/Navbar";
 
import AdminPanel from "./pages/AdminPanel";

import MyReservations from "./pages/MyReservations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- HERKESİN GİREBİLECEĞİ SAYFALAR (PUBLIC) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
            
            <Route path="/admin" element={<AdminPanel />} />
        {/* --- SADECE ÜYELERİN GİREBİLECEĞİ SAYFALAR (PRIVATE) --- */}
        
        {/* 1. Anasayfa (Korumalı) */}
        <Route path="/" element={
          
              <Home />
            
        } />



<Route path="/my-reservations" element={
  
    <MyReservations/>
     
}/>
          

{/*carDEtail sayfası*/}
<Route path="/car/:id" element={
             
              <CarDetail />
            
        } />
         
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

