import { useEffect, useState } from "react";
import UserDetails from "../services/GetDetailUser";
import Nav from "../components/Nav";
//import removeUser from '../services/Storage'
import { useNavigate } from "react-router-dom";
import isAuthentication from "../services/auth";

export default function Dashboard() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name: "",
    Firebase_ID: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {

    // 🔑 Check authentication first
    if (!isAuthentication()) {
      navigate("/login");
      return;
    }


    UserDetails()
      .then((res) => {
        
        const details = res.data.users[0];
        setUser({
          name: details.name || "Unnamed user",
          Firebase_ID: details.localId || "N/A",
          id: details.id || "N/A",
        });
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const logoutUser = () => {
    try {
      // removeUser()
      localStorage.removeItem("idtoken");
      navigate("/login");
      
    } catch (error) {
      console.log(error);
      
    }
    
};


  return (
  <>
    <Nav logoutUser={logoutUser} />
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Dashboard Page
        </h3>

        {loading ? (
          <div className="flex justify-center my-3" role="status">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-600">
              Hi{" "}
              <span className="text-blue-600">
                {user?.name ?? "Guest"}
              </span>
              , your Firebase ID is{" "}
              <span className="font-mono bg-gray-200 px-2 py-1 rounded-md">
                {user?.Firebase_ID ?? "N/A"}
              </span>
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Internal ID:{" "}
              <span className="font-mono text-gray-700">{user?.id ?? "N/A"}</span>
            </p>
          </div>
        )}
      </div>
    </main>
  </>
  );
}
