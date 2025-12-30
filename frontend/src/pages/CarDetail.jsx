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
        

 
  const handleRent=async()=>{
    console.log("Kiralama işlemi başladı...");

    if(!startDate||!endDate){
        alert('Lutfen gecerli bir tarih giriniz!')
        return;
    }

    const token=localStorage.getItem('token');

    if(!token){

        alert('Önce giriş yapınız!')
        return navigate('/login')
    }
 
    const payload={

        startDate:startDate,
        endDate:endDate,
        totalPrice:Number(totalPrice),
        carId:Number(id)

    };

    try{
        await  api.post('/reservations',payload);
        alert('Kiralama basarili İyi yolculuklar! Not:Aracın kullanım sürecinde aracın başına gelecek tüm zararlardan kullanıcılarımız sorumludur');

        navigate('/my-reservations') 

    }catch(error){

        console.error("Kiralama hatasi",error)

        if(error.response&&error.response.data){

            const backendMessage=error.response?.data?.message;
 
            if(Array.isArray(backendMessage)){

                alert(backendMessage.join("\n- "))

              
            }else if(typeof backendMessage=='string'){

                alert(backendMessage);
            }

        }else {
        alert("Sunucuya bağlanılamadı veya bilinmeyen hata.");
      }
    }





  
    

}
 
if (!car) return <div className="text-center mt-10 font-bold">Yükleniyor...</div>;
return (
   
    <div className="max-w-4xl mx-auto p-5">
       
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        
        {/* --- ARAÇ RESMİ --- */}
        <img 
          src={car.imageUrl} 
          alt={car.brand}  
          className="w-full md:w-96 h-64 object-cover rounded-xl shadow-lg border border-gray-200"
        /> 
        <div className="flex-1">
           
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{car.brand} {car.model}</h1>
           
          <div className="text-3xl text-blue-600 font-bold mb-4">
            {car.pricePerDay} TL 
           
            <span className="text-base text-gray-500 font-normal">/ Gün</span>
          </div>
           
          <p className="text-gray-600 leading-relaxed text-lg">{car.description}</p>
        </div>
      </div>

 
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
  
        <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Rezervasyon Yap</h3>
        
    
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          
        
          <div className="flex-1">
           
            <label className="block text-sm font-semibold text-gray-600 mb-2">Alış Tarihi</label>
            <input 
              type="date" 
              onChange={(e) => setStartDate(e.target.value)} 
       
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

           
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600 mb-2">İade Tarihi</label>
            <input 
              type="date" 
              onChange={(e) => setEndDate(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

 
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-200 gap-4">
           
          
           <div className="text-center md:text-left">
             <span className="text-gray-500 text-sm">Toplam Tutar</span>
             
           
             <div className={`text-3xl font-bold ${totalPrice > 0 ? 'text-green-600' : 'text-gray-400'}`}>
               {totalPrice} TL
             </div>
           </div>

       {/* --- KİRALA BUTONU (Düzeltilmiş Hali) --- */}
<button 
  onClick={handleRent}
  
  
  className={`w-full md:w-auto px-10 py-3 rounded-lg font-bold text-white transition duration-300 shadow-md
    ${totalPrice > 0 
      ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1' 
      : 'bg-gray-400 hover:bg-gray-500' 
    }`}
>
  HEMEN KİRALA
</button>
        </div>
      </div>
    </div>
  );

}
    export default CarDetail;