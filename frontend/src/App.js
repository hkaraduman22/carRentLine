import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyReservations from "./pages/MyReservations";

import Register from "./pages/Register"

import CarDetail from "./pages/CarDetail"
function App() {

  // --- KORUMA KALKANI ---
  const ProtectedRoute = ({ children, requireAdmin }) => {
    const token = localStorage.getItem("token");
    
    let role = null;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      role = user?.role; 
    } catch (e) {}

    // 1. Token yoksa Login'e at
    if (!token) {
      return <Navigate to="/login" />;
    }


    // 2. Admin yetkisi gerekiyorsa ve kullanıcı Admin değilse...
    if (requireAdmin && role !== "ADMIN" && role !== "admin") {
      // DÜZELTME BURADA: Yetkisiz kişiyi '/admin'e değil, anasayfaya '/' fırlatmalısın.
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />


<Route path="/register" element={<Register />} />

        {/* EKLENDİ: Kiralama Geçmişi */}
        <Route 
          path="/my-reservations" 
          element={
            <ProtectedRoute>
              <MyReservations />
            </ProtectedRoute>
          } 
        />

        {/* EKLENDİ: Araç Detay ve Kiralama Sayfası */}
        {/* Arabaya tıkladığında detayına gitmesi için */}
        <Route 
          path="/cars/:id" 
          element={
            <ProtectedRoute>
              <CarDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;