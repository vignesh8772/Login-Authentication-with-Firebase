// import axios from "axios";
// import cors from 'cors';
// axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1/"

// let key="AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc";

// const register=`/accounts:signInWithPassword?key=${key}`;

// // register.cors();

// export default function Register(input) {
//     const data ={name:input.name,email:input.email,password:input.password}

//     // return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc",{
//     //     method:"post",
//     //     headers:{
//     //         "content-type":"application/json"
//     //     },
//     //     body:JSON.stringify(data)
//     // })
//     return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc",data);
//     //return axios.post("Register",data);

// }

import axios from "axios";

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1/";

const key = "AIzaSyB_Bourz0JTU22Xr6lyMMjdIELSYbKgLZc"; // ⚠️ Don’t expose API key publicly!

export default function Register(input) {
  const data = {
    email: input.email,
    password: input.password,
    returnSecureToken: true,
  };

  // Sign up request
  return axios.post(`/accounts:signUp?key=${key}`, data);
}
