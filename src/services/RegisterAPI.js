import axios from "axios";
axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1"

const register=`/accounts:signInWithPassword?key=${key}`;

const key="AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc";

export default function Register(input) {
    const data ={name:input.name,email:input.email,password:input.password}

    return axios.post(register,data)


}