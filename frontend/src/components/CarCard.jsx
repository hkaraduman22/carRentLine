import { Link } from "react-router-dom"; // Sayfa geçişi için Link bileşeni
 
// Parent (Home) componentinden gelen 'car' verisini (props) alıyoruz
export default function CarCard({ car }) {
  return (
    // Kart tasarımı: Siyah kenarlık, beyaz arka plan
    <div className="border border-black p-4 w-72 bg-white">
      
      {/* Resim Alanı */}
      <div className="h-40 bg-gray-100 border border-gray-300 mb-3 flex items-center justify-center overflow-hidden">
        {car.imageUrl ? (
            // object-cover: Resim kutuya sığsın ama oranı bozulmasın
            <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
        ) : (
            <span>Resim Yok</span>
        )}
      </div>

      {/* Bilgiler */}
      <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
      <p className="text-lg mb-3">Günlük: {car.price} TL</p>
      
      {/* --- LİNK BUTONU --- */}
      {/* Tıklanınca '/cars/5' gibi dinamik bir adrese gider */}
   <Link 
        to={`/car/${car.id}`} 
        className="block w-full bg-black text-white text-center py-2 font-bold hover:bg-gray-800"
      >
        İNCELE & KİRALA
      </Link>
    </div>
  );
}