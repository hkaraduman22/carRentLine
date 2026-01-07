import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
  const [tab, setTab] = useState("cars");
  const [data, setData] = useState({ cars: [], users: [], features: [] });
  // Hangi aracın düzenlendiğini tutmak için state
  const [editingId, setEditingId] = useState(null);
  
  const [form, setForm] = useState({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [c, u, f] = await Promise.all([api.get("/cars"), api.get("/users"), api.get("/features")]);
      setData({ cars: c.data, users: u.data, features: f.data });
    } catch (e) { console.error(e); }
  };

  const submitCar = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, km: +form.km, year: +form.year, pricePerDay: +form.pricePerDay };
      
      if (editingId) {
        // Düzenleme modu (Update)
        await api.put(`/cars/${editingId}`, payload);
        alert("Güncelleme Başarılı!");
      } else {
        // Yeni kayıt modu (Create)
        await api.post("/cars", payload);
        alert("Kayıt Başarılı!");
      }

      loadData();
      cancelEdit(); // Formu temizle ve düzenleme modundan çık
    } catch (e) { alert(e.message || "Hata oluştu"); }
  };

  const deleteCar = async (id) => {
    if (window.confirm("Silinsin mi?")) { await api.delete(`/cars/${id}`); loadData(); }
  };

  // Düzenleme modunu başlatan fonksiyon
  const startEdit = (car) => {
    setEditingId(car.id);
    setForm({
      brand: car.brand,
      model: car.model,
      year: car.year,
      km: car.km,
      pricePerDay: car.pricePerDay,
      imageUrl: car.imageUrl || "",
      // Gelen feature objelerini ID arrayine çeviriyoruz
      featureIds: car.features ? car.features.map(f => f.id) : []
    });
  };

  // Düzenlemeyi iptal eden fonksiyon
  const cancelEdit = () => {
    setEditingId(null);
    setForm({ brand: "", model: "", year: "", km: "", pricePerDay: "", imageUrl: "", featureIds: [] });
  };

  const toggleFeature = (id) => {
    setForm(p => ({ ...p, featureIds: p.featureIds.includes(id) ? p.featureIds.filter(x => x !== id) : [...p.featureIds, id] }));
  };

  const changeUserRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    
    if (window.confirm(`${user.name} kullanıcısının rolü "${newRole}" yapılacak. Onaylıyor musunuz?`)) {
      try {
        // HATA BURADAYDI: { ...user, role: newRole } yerine sadece { role: newRole } gönderiyoruz.
        // Çünkü backend, DTO'da olmayan (id, createdAt vs) verileri görünce hata veriyor.
        await api.put(`/users/${user.id}`, { role: newRole });
        
        loadData();
      } catch (e) { 
        console.error(e); // Konsola hatayı yazdıralım ki görebilelim
        alert("Yetki değiştirilemedi. Lütfen konsolu (F12) kontrol edin."); 
      }
    }
  };

  return (
    <div className="font-sans text-black min-h-screen">
      <Navbar />
      <div className="p-5 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold border-b border-black mb-5 pb-2">YÖNETİM PANELİ</h1>
        <div className="mb-5">
          {["cars", "users"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`mr-4 uppercase ${tab === t ? "font-bold underline" : "text-gray-500"}`}>
              {t === "cars" ? "Araçlar" : "Kullanıcılar"}
            </button>
          ))}
        </div>

        {tab === "cars" ? (
          <div className="grid md:grid-cols-3 gap-8">
            <form onSubmit={submitCar} className="flex flex-col gap-3 border border-black p-4 h-fit sticky top-5">
              <h3 className="font-bold border-b border-black flex justify-between items-center">
                {editingId ? "Araç Düzenle" : "Yeni Araç"}
                {editingId && <button type="button" onClick={cancelEdit} className="text-xs text-red-600 underline">VAZGEÇ</button>}
              </h3>
              <input className="border border-black p-1" placeholder="Marka" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} required />
              <input className="border border-black p-1" placeholder="Model" value={form.model} onChange={e => setForm({...form, model: e.target.value})} required />
              <div className="flex gap-2">
                <input className="border border-black p-1 w-1/2" type="number" placeholder="Yıl" value={form.year} onChange={e => setForm({...form, year: e.target.value})} required />
                <input className="border border-black p-1 w-1/2" type="number" placeholder="KM" value={form.km} onChange={e => setForm({...form, km: e.target.value})} required />
              </div>
              <input className="border border-black p-1" type="number" placeholder="Fiyat" value={form.pricePerDay} onChange={e => setForm({...form, pricePerDay: e.target.value})} required />
              <input className="border border-black p-1" placeholder="Resim URL" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
              <div className="flex flex-wrap gap-1">
                {data.features.map(f => (
                  <button type="button" key={f.id} onClick={() => toggleFeature(f.id)} className={`border border-black px-2 text-xs ${form.featureIds.includes(f.id) ? "bg-black text-white" : "bg-white text-black"}`}>{f.name}</button>
                ))}
              </div>
              <button className={`p-2 font-bold text-white ${editingId ? "bg-blue-800" : "bg-black"} hover:opacity-80`}>
                {editingId ? "GÜNCELLE" : "KAYDET"}
              </button>
            </form>
            <div className="md:col-span-2 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead><tr className="border-b border-black"><th className="p-2">Araç</th><th className="p-2">Fiyat</th><th className="p-2 text-right">İşlem</th></tr></thead>
                <tbody>
                  {data.cars.map(c => (
                    <tr key={c.id} className={`border-b border-gray-300 ${editingId === c.id ? "bg-gray-100" : ""}`}>
                      <td className="p-2 font-bold">{c.brand} {c.model} <span className="block font-normal text-sm text-gray-600">{c.year} | {c.km} km</span></td>
                      <td className="p-2">{c.pricePerDay} ₺</td>
                      <td className="p-2 text-right space-x-2">
                        <button onClick={() => startEdit(c)} className="text-blue-800 underline text-sm">DÜZENLE</button>
                        <button onClick={() => deleteCar(c.id)} className="text-red-600 underline text-sm">SİL</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <table className="w-full text-left border border-black">
            <thead><tr className="bg-black text-white"><th className="p-2">ID</th><th className="p-2">İsim</th><th className="p-2">Email</th><th className="p-2">Rol</th><th className="p-2 text-right">Yetki</th></tr></thead>
            <tbody>
              {data.users.map(u => (
                <tr key={u.id} className="border-b border-gray-300">
                  <td className="p-2">#{u.id}</td>
                  <td className="p-2">{u.name} {u.surname}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2"><span className="border border-black px-1 text-xs uppercase">{u.role}</span></td>
                  <td className="p-2 text-right">
                    <button onClick={() => changeUserRole(u)} className="text-xs border border-black px-2 py-1 hover:bg-gray-200">
                      {u.role === "admin" ? "USER YAP" : "ADMIN YAP"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}