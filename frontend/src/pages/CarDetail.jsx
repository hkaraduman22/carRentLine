import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';


 

    const CarDetail=()=>{

        const{id}=useParams();

        const navigate=useNavigate();
 
        const[car,setCar]=useState(null);

        const[startDate,setStartDate]=useState('');

        const[endDate,setEndDate]=useState('');

      
        const[totalPrice,setTotalPrice]=useState(0);

 
        useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        alert('Araç bulunamadı veya bir hata oluştu.');
        navigate('/');  
      }
    };
    fetchCar();
  }, [id, navigate]);


 

  useEffect(()=>{
   
    if(startDate&&endDate&&car){ 
        const start=new Date(startDate);
        const end=new Date(endDate);

        const diffTime=end-start;
 
        const diffDays=Math.ceil(diffTime/(1000*60*60*24));

        if(diffDays>0){
            setTotalPrice(diffDays*car.pricePerDay);
        }else{

            setTotalPrice(0)
        }
    }
    
  },[startDate,endDate,car])
        

 
  const handleRent = async () => {
    if (!startDate || !endDate) {
      alert('Lütfen geçerli bir tarih giriniz!');
      return; 
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Önce giriş yapınız!');
      navigate('/login');
      return;
    }

    try {
      await api.post('/reservations', {
        startDate,
        endDate,
        
        carId: Number(id)
      });
      alert('✅ Kiralama Başarılı! İyi yolculuklar. Not:Kulanım süresi içerisinde arabaya gelecek zararlardan kullanıcı sorumludur');
      navigate('/my-reservations');
    } catch (error) {
      console.error("Kiralama Hatası:", error);

      // --- DÜZELTME BURADA ---
      // Senin api.js dosyan hatayı direkt 'error.message' içine koyarak gönderiyor.
      // Artık 'error.response.data' diye aramana gerek yok.
      const msg = error.message; 
      
      if (Array.isArray(msg)) {
          alert(msg.join("\n- "));
      } else {
          alert(msg || "İşlem başarısız.");
      }
    }
  };

{/*program yüklenirken yani arabayı çekerken çökmesin diye */}
  if (!car) return <div>Yükleniyor...</div>;

  return (
    <div className="p-10"> {/* Sayfanın kenar boşluğu */}
      
      {/* 1. KISIM: RESİM VE BİLGİLER */}
      <img src={car.imageUrl} className="w-64 mb-4 border" alt="Araba" />
      
      <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
      <p className="text-xl text-blue-600 font-bold my-2">{car.pricePerDay} TL / Gün</p>
       
 
      <div className="my-4">
        <b>Özellikler: </b>
        {/* Soru işareti (?) koyduk ki özellik yoksa hata vermesin */}
        {car.features?.map((f, index) => (
           <span key={index} className="bg-gray-200 m-1 p-1 text-sm">
             {f.name}
           </span>
        ))}
      </div>

      {/* 2. KISIM: TARİH SEÇME VE BUTON */}
      <div className="mt-10 border-t pt-5">
        <h3 className="font-bold mb-2">Tarih Seçiniz:</h3>

        {/* Inputlar */}
        <div className="mb-4">
          <label>Alış: </label>
          <input type="date" onChange={(e) => setStartDate(e.target.value)} className="border p-2 mr-2"/>
          
          <label>İade: </label>
          <input type="date" onChange={(e) => setEndDate(e.target.value)} className="border p-2"/>
        </div>

        {/* Fiyat ve Buton */}
        <h3 className="text-2xl font-bold mb-2">Toplam: {totalPrice} TL</h3>
        
        <button 
          onClick={handleRent} 
          className="bg-blue-600 text-white px-5 py-2 font-bold"
        >
          KİRALA
        </button>

      </div>
    </div>
  );

}
    export default CarDetail;
