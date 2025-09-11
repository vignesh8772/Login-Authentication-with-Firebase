export default function StoreUser(token) {
  if (!token) {
    console.error("⚠️ Tried to store invalid token:", token);
    return;
  }
  localStorage.setItem("idtoken", token);
}

export  function getuserdata ()  {
  return localStorage.getItem("idtoken")
};

export function removeUser() {
  localStorage.removeItem("idtoken");
}