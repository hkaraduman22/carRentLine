 
import axios from "axios";
 
const api = axios.create({
  baseURL: "http://localhost:3001",
});
 
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");
     
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
     
    return config;
  },
   
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    
    if (error.response) {
      const { status, data } = error.response;

      
      return Promise.reject({
        status,
        message: data.message,  
      });
    } 
    return Promise.reject({
      status: 0,
      message: "Sunucuya bağlanılamadı",
    });
  }
);
 
export default api;