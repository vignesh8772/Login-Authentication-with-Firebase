import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginApi from "../services/LoginAPi";
import StoreUser from "../services/Storage";
import  isAuthentication  from "../services/auth";

export default function Login() {
  const initerror = {
    email: { required: false },
    password: { required: false },
    custom_error: "",
  };

  const [Error, setError] = useState(initerror);
  const [loading, setloading] = useState(false);
  const [input, setinput] = useState({
    email: "",
    password: "",
  });

  function loginwork(event) {
    event.preventDefault();
    let errors = { ...initerror };
    let haserror = false;

    if (input.email.trim() === "") {
      errors.email.required = true;
      haserror = true;
    }
    if (input.password.trim() === "") {
      errors.password.required = true;
      haserror = true;
    }

    setError(errors);

    if (!haserror) {
      setloading(true);
      LoginApi(input)
        .then((res) => {
          StoreUser(res.data.idToken);
        })
        .catch((err) => {
          console.log("Login error:", err);

          const errorMessage = err?.code || "";

          if (errorMessage.includes("ERR_BAD_REQUEST")) {
            setError({ ...errors, custom_error: "Invaild credentials" });
          }
        })
        .finally(() => setloading(false));
    }
  }

  // ✅ call isAuthentication() correctly
  if (isAuthentication()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login Now
        </h2>

        <form className="space-y-5" onSubmit={loginwork}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setinput({ ...input, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {Error.email.required && (
              <span className="text-sm text-red-500">Email is required.</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setinput({ ...input, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {Error.password.required && (
              <span className="text-sm text-red-500">Password is required.</span>
            )}
          </div>

          {/* Loader + Custom error */}
          <div className="text-center">
            {loading && (
              <div className="flex justify-center my-3">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {Error.custom_error && (
              <p className="text-sm text-red-500">{Error.custom_error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-3"
              disabled={loading}
            >
              Login
            </button>
          </div>

          {/* Register link */}
          <div className="text-center text-sm text-gray-600">
            Create new account?{" "}
            <Link to="/sigup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
