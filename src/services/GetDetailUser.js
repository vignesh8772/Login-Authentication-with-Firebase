import axios from "axios";
import getUserdata from "./Storage";



axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";

const key = "AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc" // 🔑 keep in .env

export default function UserDetails() {
  let data = {
    token: getUserdata() // ✅ must be `idToken`, not `token`
  };

   if (!data) {
    throw new Error("No idToken found in localStorage");
  }

  return axios.post(`/accounts:lookup?key=${key}`, { data });
}
