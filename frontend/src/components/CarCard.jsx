// Link: Tıklanabilir bir bağlantı oluşturur. (<a> etiketi gibidir ama sayfayı yenilemez).
import { Link } from "react-router-dom"; 

// { car }: Home sayfasından bu bileşene gönderilen araba verisini karşılıyoruz (Props).
export default function CarCard({ car }) {
  return (
    // Kutu tasarımı: Çerçeve var (border), gölge var (shadow), genişlik 256px (w-64).
    <div className="border shadow w-64 bg-white p-2">
      
      {/* --- RESİM ALANI --- */}
      {/* Gri bir kutu (h-40) oluşturuyoruz. */}
      <div className="h-40 bg-gray-200">
         
         {/* Koşullu Gösterim (Ternary Operator): */}
         {/* Soru: car.imageUrl dolu mu? */}
         {car.imageUrl ? (
           // Evetse: Resmi göster. object-cover: Resmi kutuya sığdır.
           <img src={car.imageUrl} className="w-full h-full object-cover" />
         ) : (
           // Hayırsa: "Resim Yok" yazısı göster.
           <div className="text-center pt-16 text-gray-500">Resim Yok</div>
         )}

      </div>

      {/* --- BİLGİ ALANI --- */}
      <div className="mt-2">
        {/* Arabanın markasını ve modelini yan yana yaz. */}
        <h3 className="font-bold">{car.brand} {car.model} </h3>


        
        {/* Fiyatı siyah renkle yaz. */}
        <p className="text-black-600">{car.pricePerDay}</p>
        <p className="text-black-600">"Türk lirasi/gün"</p>
        
        <p className="text-black-600">{car.status}</p>
        {/* --- BUTON --- */}
        {/* Link to: Butona basınca gidilecek adres. Örn: /cars/5 */}
    
        <Link to={`/cars/${car.id}`}>
          <button className="bg-blue-600 text-white w-full py-1 mt-2 rounded">
            İNCELE
          </button>
        </Link>
      </div>
    </div>
  );
}