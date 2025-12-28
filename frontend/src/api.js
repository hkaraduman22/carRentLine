// Axios kütüphanesini çağırıyoruz. Bu kütüphane internete istek atmamızı sağlar.
import axios from "axios";

// 1. Postacının merkez adresini ayarlıyoruz.
// Backend'imiz 3000 portunda çalıştığı için buraya o adresi yazıyoruz.
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// 2. Güvenlik Kontrolü (Interceptor - Araya Giren)
// Bu kod, biz her "api.get" veya "api.post" dediğimizde, istek yola çıkmadan ÖNCE çalışır.
api.interceptors.request.use(
  (config) => {
    // Tarayıcının hafızasından (LocalStorage) "token" isimli bileti okur.
    const token = localStorage.getItem("token");
    
    // Eğer bilet varsa, mektubun başlığına (Header) ekler.
    // Backend bu sayede isteği yapanın kim olduğunu anlar.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Hazırlanan isteği yola çıkarır.
    return config;
  },
  
  // Eğer istek hazırlanırken teknik bir hata olursa (çok nadir), işlemi iptal eder.
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Başarılı cevaplar direkt geçer
    return response;
  },
  (error) => {
    // Backend cevap verdiyse
    if (error.response) {
      const { status, data } = error.response;

     
      // NestJS hata formatını sadeleştir
      return Promise.reject({
        status,
        message: data.message, // string veya array olabilir
      });
    }

    // Backend'e hiç ulaşılamadıysa
    return Promise.reject({
      status: 0,
      message: "Sunucuya bağlanılamadı",
    });
  }
);

// 3. Hazırladığımız bu özel postacıyı dışarı aktarıyoruz.
// Diğer dosyalarda "import api from './api'" diyerek bunu kullanacağız.
export default api;
