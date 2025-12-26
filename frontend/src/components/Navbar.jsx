
import { useNavigate } from "react-router-dom";

export default function Navbar(){

    const navigate=useNavigate()


    const handleLogout=()=>{

        //TOKENİ SİL ÇIKARKEN
        localStorage.removeItem("token")

        navigate("/login");
    };

    return(

        <nav className="border-b p-4 flex justify-between bg-white">

        <h1 className="text-xl font-bold text-blue-600">Rent A Car</h1>

        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1"
            >
                
        Çıkış Yap
        </button>
 

        </nav>
    );
}