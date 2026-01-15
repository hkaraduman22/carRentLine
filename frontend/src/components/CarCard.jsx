import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="border border-black p-4 w-72 bg-white">
      
      <div className="h-40 bg-gray-100 border border-gray-300 mb-3 flex items-center justify-center overflow-hidden">
        {car.imageUrl ? (
            <img src={car.imageUrl} alt={car.brand} className="w-full h-full object-cover" />
        ) : (
            <span>Resim Yok</span>
        )}
      </div>


      <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
      
      

      <Link 
        to={`/cars/${car.id}`} 
        className="block w-full bg-black text-white text-center py-2 font-bold hover:bg-gray-800"
      >
        İNCELE & KİRALA
      </Link>
    </div>
  );
}