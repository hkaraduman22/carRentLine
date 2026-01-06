 // React kütüphanesinden 'useState' (değişken tutma) ve 'useEffect' (otomatik başlatma) fonksiyonlarını alıyoruz.
import { useState, useEffect } from "react";

// Backend ile konuşmak için (GET, POST, DELETE işlemleri) yazdığımız özel api dosyasını çağırıyoruz.
import api from "../api";

// Sayfanın üst kısmındaki menüyü (Navbar) çağırıyoruz.
import Navbar from "../components/Navbar";

// 'AdminPanel' adında ana bileşenimizi (Component) oluşturuyoruz ve dışa açıyoruz (export).
export default function AdminPanel() {
  
  // --- STATE (HAFIZA) TANIMLARI ---
  
  // 1. Sekme Kontrolü: Şu an ekranda 'cars' mı 'users' mı görünecek? Başlangıç: "cars".
  const [tab, setTab] = useState("cars");

  // 2. Veri Deposu: Backend'den gelen arabalar, kullanıcılar ve özellikleri tutan obje.
  // Başlangıçta hepsi boş dizi [].
  const [data, setData] = useState({ cars: [], users: [], features: [] });

  // 3. Form Deposu: Kullanıcının inputlara yazdığı veriler.
  // Başlangıçta hepsi boş string ("") veya boş dizi ([]).
  const [form, setForm] = useState({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });

  // --- BAŞLANGIÇ (LIFECYCLE) ---
  
  // useEffect: Sayfa ilk açıldığında (render olduğunda) çalışır.
  // Sondaki [] parantezi, bu kodun SADECE 1 KERE çalışacağını garanti eder.
  useEffect(() => { 
    loadData(); // Verileri çekme fonksiyonunu başlat.
  }, []);

  // --- VERİ ÇEKME FONKSİYONU ---
  const loadData = async () => {
    try {
      // Promise.all: 3 farklı isteği AYNI ANDA (Paralel) gönderir. Tek tek beklemekten çok daha hızlıdır.
      // await: Cevaplar gelene kadar bekle.
      // [c, u, f]: Gelen cevapları sırasıyla c (cars), u (users), f (features) değişkenlerine ata (Destructuring).
      const [c, u, f] = await Promise.all([
        api.get("/cars"), 
        api.get("/users"), 
        api.get("/features")
      ]);
      
      // Gelen verileri (.data) alıp State'e (Hafızaya) kaydet. Ekran otomatik güncellenir.
      setData({ cars: c.data, users: u.data, features: f.data });
    } catch (e) { 
      // Hata olursa konsola yaz.
      console.error(e); 
    }
  };

  // --- KAYDETME (SUBMIT) FONKSİYONU ---
  const submitCar = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle (Formun varsayılan davranışı).
    
    try {
      // Backend'e POST isteği at (Yeni kayıt).
      await api.post("/cars", { 
        ...form, // Spread Operator: Formdaki tüm alanları (brand, model vb.) kopyala.
        
        // Unary Plus (+): String gelen veriyi Sayıya çevirir. (Örn: "2023" -> 2023)
        // Backend bizden sayı (Int) beklediği için bu işlem zorunludur.
        km: +form.km, 
        year: +form.year, 
        pricePerDay: +form.pricePerDay 
      });
      
      alert("Kayıt Başarılı!"); // Kullanıcıya bilgi ver.
      loadData(); // Listeyi yenile (Yeni araç tabloda görünsün).
      
      // Formu sıfırla (Kutucukları temizle).
      setForm({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });
    } catch (e) { 
      // Hata varsa mesajı göster.
      alert(e.message || "Hata oluştu"); 
    }
  };

  // --- SİLME FONKSİYONU ---
  const deleteCar = async (id) => {
    // window.confirm: Tarayıcının "Emin misiniz?" kutusunu açar. Kullanıcı "Tamam" derse True döner.
    if (window.confirm("Silinsin mi?")) { 
      await api.delete(`/cars/${id}`); // Backend'e silme isteği gönder.
      loadData(); // Listeyi güncelle.
    }
  };

  // --- ÖZELLİK SEÇME (TOGGLE) MANTIĞI ---
  const toggleFeature = (id) => {
    // setForm içinde fonksiyon kullanarak 'p' (previous/önceki) durumu alıyoruz.
    setForm(p => ({ 
      ...p, // Diğer form verilerini (marka, model) koru.
      
      // Ternary Operator ( ? : ) Mantığı:
      // Eğer ID listede varsa (includes) -> filter ile o ID'yi çıkar (Seçimi kaldır).
      // Eğer ID listede yoksa -> [...eskiler, id] ile listeye ekle (Seç).
      featureIds: p.featureIds.includes(id) 
        ? p.featureIds.filter(x => x !== id) 
        : [...p.featureIds, id] 
    }));
  };

  // --- GÖRÜNÜM (JSX - HTML) ---
  return (
    // Ana kapsayıcı. Yazı tipi standart (sans), metin rengi siyah, minimum yükseklik tam ekran.
    <div className="font-sans text-black min-h-screen">
      <Navbar />
      
      {/* İçerik Kutusu: Padding 5 birim, maksimum genişlik sınırlı, ortalanmış (mx-auto). */}
      <div className="p-5 max-w-6xl mx-auto">
        
        {/* Başlık */}
        <h1 className="text-xl font-bold border-b border-black mb-5 pb-2">YÖNETİM PANELİ</h1>
        
        {/* --- SEKMELER (TABS) --- */}
        <div className="mb-5">
          {/* ["cars", "users"] dizisini döngüye sokup (map) butonları oluşturuyoruz. */}
          {["cars", "users"].map(t => (
            <button 
              key={t} // React listelerinde her elemana benzersiz anahtar (key) vermek şarttır.
              onClick={() => setTab(t)} // Tıklanınca aktif sekmeyi değiştir.
              
              // Dinamik Stil: Eğer bu buton aktif sekme ise (tab === t) -> Kalın ve altı çizili yap.
              className={`mr-4 uppercase ${tab === t ? "font-bold underline" : "text-gray-500"}`}
            >
              {t === "cars" ? "Araçlar" : "Kullanıcılar"}
            </button>
          ))}
        </div>

        {/* --- İÇERİK ALANI (KOŞULLU GÖSTERİM) --- */}
        {/* Eğer sekme 'cars' ise bunu göster: */}
        {tab === "cars" ? (
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* 1. SOL TARAFTAKİ FORM */}
            <form onSubmit={submitCar} className="flex flex-col gap-3 border border-black p-4 h-fit">
              <h3 className="font-bold border-b border-black">Yeni Araç</h3>
              
              {/* Inputlar: Değer değişince (onChange) setForm ile state'i güncelliyoruz. */}
              <input className="border border-black p-1" placeholder="Marka" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required />
              <input className="border border-black p-1" placeholder="Model" value={form.model} onChange={e => setForm({...form, model: e.target.value})} required />
              
              <div className="flex gap-2">
                <input className="border border-black p-1 w-1/2" type="number" placeholder="Yıl" value={form.year} onChange={e => setForm({...form, year: e.target.value})} required />
                <input className="border border-black p-1 w-1/2" type="number" placeholder="KM" value={form.km} onChange={e => setForm({...form, km: e.target.value})} required />
              </div>
              
              <input className="border border-black p-1" type="number" placeholder="Fiyat" value={form.pricePerDay} onChange={e => setForm({...form, pricePerDay: e.target.value})} required />
              <input className="border border-black p-1" placeholder="Resim URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
              
              {/* Özellik Butonları */}
              <div className="flex flex-wrap gap-1">
                {/* Backend'den gelen özellikleri (features) listele */}
                {data.features.map(f => (
                  <button 
                    type="button" // Form submit olmasın diye tipini button yapıyoruz.
                    key={f.id} 
                    onClick={() => toggleFeature(f.id)} 
                    // Eğer özellik seçiliyse (includes) arka plan siyah olsun.
                    className={`border border-black px-2 text-xs ${form.featureIds.includes(f.id) ? "bg-black text-white" : "bg-white text-black"}`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              <button className="bg-black text-white p-2 font-bold hover:bg-gray-800">KAYDET</button>
            </form>

            {/* 2. SAĞ TARAFTAKİ TABLO */}
            <div className="md:col-span-2 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-black"><th className="p-2">Araç</th><th className="p-2">Fiyat</th><th className="p-2 text-right">İşlem</th></tr></thead>
                <tbody>
                  {/* Araçları listele (Map Döngüsü) */}
                  {data.cars.map(c => (
                    <tr key={c.id} className="border-b border-gray-300">
                      <td className="p-2 font-bold">
                        {c.brand} {c.model} 
                        {/* Alt satıra yıl ve km bilgisini küçük yaz */}
                        <span className="block font-normal text-sm text-gray-600">{c.year} | {c.km} km</span>
                      </td>
                      <td className="p-2">{c.pricePerDay} ₺</td>
                      <td className="p-2 text-right">
                        <button onClick={() => deleteCar(c.id)} className="text-red-600 underline text-sm">SİL</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // EĞER SEKME 'USERS' İSE (KULLANICI TABLOSU):
          <table className="w-full text-left border border-black">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2">ID</th><th className="p-2">İsim</th><th className="p-2">Email</th><th className="p-2">Rol</th>
              </tr>
            </thead>
            <tbody>
              {/* Kullanıcıları listele */}
              {data.users.map(u => (
                <tr key={u.id} className="border-b border-gray-300">
                  <td className="p-2">#{u.id}</td>
                  <td className="p-2">{u.name} {u.surname}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2"><span className="border border-black px-1 text-xs">{u.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}