import { useEffect, useState } from "react";
import api from "../api"; 
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom"; 
 
import { Link } from "react-router-dom";

export default function Home() {
  // ARABALARI TUT //MERKEZİ YÖNETİM TOKEN KONTROLÜ HOME SAYFASI GÜNCEL ARABA LİSTESİNİ ÇEKER
  const [cars, setCars] = useState([]);
  
  const navigate = useNavigate();
 


  // useEffect: Sayfa ilk açıldığında yapılacak işler.
useEffect(() => {
    // BURADAKİ TOKEN KONTROLÜNÜ SİLDİK (App.js hallediyor)

    // Direkt isteği atıyoruz
    api.get("/cars")
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error("Veri çekilemedi:", err);
      });
  }, []);

  
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