import { useEffect, useState } from "react";
import api from "../api"; 
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom"; 
 
import { Link } from "react-router-dom";

export default function Home() {
  // ARABALARI TUT //MERKEZİ YÖNETİM TOKEN KONTROLÜ HOME SAYFASI GÜNCEL ARABA LİSTESİNİ ÇEKER
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  // useEffect: Sayfa ilk açıldığında yapılacak işler.
  useEffect(() => {
    // 1. Önce Token Kontrolü
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return; // Token yoksa aşağıya (API isteğine) geçme, dur.
    }

    // 2. BACKENDDEN CARSA İSTEK AT (Bu kısım parantezin içinde olmalıydı)
    api.get("/cars")
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  },[]);

  
  return (
    <div>
      <Navbar />

      <div className="p-10 container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5">Araçlarımız</h2>
        
        <div className="flex flex-wrap gap-5 justify-center">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
