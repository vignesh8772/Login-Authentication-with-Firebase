import axios from "axios";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1/";

const key = "AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc"; // ⚠️ Don’t expose API key publicly!

export default function Register(input) {
  const data = {
    email: input.email,
    password: input.password,
  };

  // Sign in request
  return axios.post(`/accounts:signInWithPassword?key=${key}`, data);
}