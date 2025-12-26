// React Router kütüphanesinden gerekli parçaları alıyoruz.
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Sayfalarımızı çağırıyoruz.
import Home from "./pages/Home";

function App() {
  return (
    // BrowserRouter: Tüm uygulamayı sarmalar ve rota sistemini aktif eder.
    <BrowserRouter>
      <Routes>
        
        {/* ROTA TANIMI: */}
        {/* path="/": Kullanıcı anasayfaya (root) girerse... */}
        {/* element={<Home />}: Ekrana Home bileşenini bas. */}
        <Route path="/" element={<Home />} />

        {/* NOT: Detay sayfası (CarDetail) henüz burada yok. Yarın ekleyeceğiz. */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;