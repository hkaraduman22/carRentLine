import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

export default function MyReservations(){

    const[reservations,setReservations]=useState([]);

    




    useEffect(()=>{

        api.get('/reservations/my')
        .then((response)=>{

            setReservations(response.data)
        })
 
    },[])


  

    return (
    <div>
      <Navbar />

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-5">Kiralama Geçmişim</h2>
        
        {/* LİSTELEME KISMI */}
        <div className="space-y-4">
          
          {/* Eğer liste boşsa ekrana yazı yaz */}
          {reservations.length === 0 && <p>Kayıt bulunamadı.</p>}

          {/* Listeyi döngüye sok ve kutuları çiz */}
          {reservations.map((res) => (
            <div key={res.id} className="border border-black p-4 bg-gray-50">
              
              {/* Araç İsmi */}
              <h3 className="font-bold text-lg">
                {res.car.brand} {res.car.model} 
              </h3>

              {/* Tarihler */}
              <p>
                {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
              </p>

              {/* Fiyat */}
              <p className="text-blue-600 font-bold">
                {res.totalPrice} TL
              </p>
 

            </div>
          ))}

        </div>
      </div>
    </div>
  );
   
}