import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyReservations from "./pages/MyReservations";

import Register from "./pages/Register"

import CarDetail from "./pages/CarDetail"
function App() {
 
  const ProtectedRoute = ({ children, requireAdmin }) => {
    const token = localStorage.getItem("token");
    
    let role = null;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      role = user?.role; 
    } catch (e) {}

    
    if (!token) {
      return <Navigate to="/login" />;
    }

 
    if (requireAdmin && role !== "ADMIN" && role !== "admin") {
       
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

      
        <Route 
          path="/my-reservations" 
          element={
            <ProtectedRoute>
              <MyReservations />
            </ProtectedRoute>
          } 
        />
 
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