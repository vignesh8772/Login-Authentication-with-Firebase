export default function StoreUser(data) {
    localStorage.setItem("token",data)
}

export  const getuserdata=()=>{
    return localStorage.getItem("token");
}