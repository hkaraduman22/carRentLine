import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* --- GÖRSEL ALANI --- */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {car.imageUrl ? (
          <>
            <img 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
            {/* ImageOff Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21l-2-2m-3.268-3.268L12 12.293l-3.414 3.414L2 19"></path><path d="M21 21H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"></path><path d="M5 21V7"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>
            <span className="text-sm font-medium mt-2">Görsel Yok</span>
          </div>
        )}

        {/* Fiyat Etiketi */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20 flex flex-col items-end">
          <span className="text-xs text-gray-500 font-semibold tracking-wide">GÜNLÜK</span>
          <div className="flex items-baseline gap-1 text-indigo-600">
            <span className="text-xl font-bold">{car.pricePerDay} ₺</span>
          </div>
        </div>
        
        {/* Yıl Rozeti */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
          {/* Calendar Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          {car.year}
        </div>
      </div>

      {/* --- İÇERİK ALANI --- */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Başlık ve Marka */}
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {car.brand} <span className="font-normal text-slate-500">{car.model}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">Konforlu ve güvenli sürüş keyfi.</p>
        </div>

        {/* Özellikler Grid Yapısı */}
        <div className="grid grid-cols-3 gap-2 mb-6">
            {/* Yakıt */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                {/* Fuel Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><line x1="3" y1="22" x2="15" y2="22"></line><line x1="4" y1="9" x2="14" y2="9"></line><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path></svg>
                <span className="text-[10px] font-bold uppercase truncate w-full text-center">Yakıt</span>
            </div>
            
            {/* Vites (Settings Icon used generically) */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                {/* Settings Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span className="text-[10px] font-bold uppercase truncate w-full text-center">Vites</span>
            </div>

            {/* KM */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                {/* Gauge Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
                <span className="text-[10px] font-bold">{car.km ? `${(car.km / 1000).toFixed(0)}k` : "0"}</span>
            </div>
        </div>

        {/* Buton Alanı */}
        <Link 
          to={`/cars/${car.id}`} 
          className="mt-auto group/btn relative w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm overflow-hidden shadow-lg shadow-slate-200 transition-all hover:shadow-indigo-300 hover:bg-indigo-600 flex items-center justify-center gap-2"
        >
          <span>Aracı İncele</span>
          {/* ArrowRight Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </Link>
      </div>
    </div>
  );
}