import { useState } from "react"
import res from '../services/RegisterAPI';
import StoreUser from "../services/Storage";
import { Navigate } from "react-router-dom";
import { isAuthentication } from "../services/auth";



export default function Register() {
  const initerror = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: false,
  };

  const [Error, setError] = useState(initerror);

  const [loading, setloading] = useState(false);

  function registerwork(event) {
    event.preventDefault();
    let errors = initerror;
    let haserror=false;
    
    if (input.name == "") {
      errors.name.required = true;
      haserror=true;
    }
    if (input.email == "") {
      errors.email.required = true;
      haserror=true;
    }
    if (input.password == "") {
      errors.password.required = true;
      haserror=true;
    }
    setError(errors);

    if (!haserror) {
    setloading(true);
    res(input).then((res)=>{
      StoreUser(res.data.idToken);
    }).catch((err)=>{
      console.log(err);
    }).finally(
      setloading(false)
    )
  }
  }
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });

  // if (isAuthentication()) {
  //   return < Navigate />
  // }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Register Now
          </h2>
          <form className="space-y-5" onSubmit={registerwork}>
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) =>
                  setinput({ ...input, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {Error.name.required === true ? (
                <span className="text-sm text-red-500">Name is required.</span>
              ) : null}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) =>
                  setinput({ ...input, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {Error.email.required == true ? (
                <span className="text-sm text-red-500">Email is required.</span>
              ) : null}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) =>
                  setinput({ ...input, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {Error.password.required == true ? (
                <span className="text-sm text-red-500">
                  Password is required.
                </span>
              ) : null}
            </div>

            {/* Custom error + Loader */}
            <div className="text-center">
              {Error.custom_error == true ? (
                <p className="text-sm text-red-500">Custom Error Message!</p>
              ) : null}
              {loading && (
                <div className="flex justify-center my-3">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Register
              </button>
            </div>

            {/* Login link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
