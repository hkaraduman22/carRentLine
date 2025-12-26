
import { useEffect,useState} from "react";
import api from "../api"; 
import Navbar from "../components/Navbar";
import CarCard from "../components/CarCard";

export default function Home(){

    //ARABALARI TUT
  const [cars, setCars] = useState([]);

  // useEffect: Sayfa ilk açıldığında yapılacak işler.
  useEffect(() => {
    //BACKENDDEN CARSA İSTEK AT
    api.get("/cars")
      .then((res) => {
        //bAŞARILI OLURSA kaydet
        setCars(res.data);
      })
      .catch((err) => {
        // 3. Hata olursa konsola yaz.
        console.error(err);
      });
  }, []); // Sondaki [] parantezi, bu kodun "sadece sayfa açılırken 1 kez" çalışmasını sağlar.
 
  return (
    <div>
      {/* Sayfanın tepesine menüyü koy */}
      <Navbar />

      {/* İçerik Kutusu: container (genişliği sınırla), mx-auto (ortala), p-10 (boşluk bırak) */}
      <div className="p-10 container mx-auto">
        
        <h2 className="text-2xl font-bold text-center mb-5">Araçlarımız</h2>
        
        {/* --- LİSTELEME ALANI --- */}
        {/* flex-wrap: Arabalar yan yana sığmazsa alt satıra geçsin. */}
        {/* gap-5: Kutular arasına boşluk koy. */}
        <div className="flex flex-wrap gap-5 justify-center">
          
          {/* Javascript Map Fonksiyonu: */}
          {/* Arabalar listesindeki (cars) her bir eleman için bir <CarCard /> oluştur. */}
          {cars.map((car) => (
            // key={car.id}: React'in listeyi takip edebilmesi için benzersiz bir anahtar veriyoruz.
            // car={car}: O anki araba verisini kutucuğa gönderiyoruz (Props).
            <CarCard key={car.id} car={car} />
          ))}

        </div>
      </div>
    </div>
  );
  
}