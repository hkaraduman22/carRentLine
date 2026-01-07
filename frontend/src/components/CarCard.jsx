import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="border border-black p-4 w-72 bg-white">
      
      {/* Resim Alanı */}
      <div className="h-40 bg-gray-100 border border-gray-300 mb-3 flex items-center justify-center overflow-hidden">
        {car.imageUrl ? (
            <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
        ) : (
            <span>Resim Yok</span>
        )}
      </div>

      {/* Bilgiler */}
      <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
      
      {/* DÜZELTME 1: car.price yerine car.pricePerDay */}
      <p className="text-lg mb-3">Günlük: {car.pricePerDay} TL</p>
      
      {/* DÜZELTME 2: Link adresi '/car' değil '/cars' olmalı */}
      <Link 
        to={`/cars/${car.id}`} 
        className="block w-full bg-black text-white text-center py-2 font-bold hover:bg-gray-800"
      >
        İNCELE & KİRALA
      </Link>
    </div>
  );
}