import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { login, useAuthDispatch, useAuthState } from "../../Context";
import LoadingLogin from "../Loading/LoadingLogin";
import { showToast } from "../Notification/Toast";
export default function Login() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  const { loading, errorMessage} = useAuthState()
  const [user, setUser] = useState({
    email: "",
    clave: "",
  });
  useEffect(() => {
    if (errorMessage) {
      showToast(false, errorMessage)
    }
  }, [errorMessage])
  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      let response = await login(dispatch, user)
      if(!response) return;
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    
    setUser({ email: "", clave: "" });
  };
  const handlechange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
          {loading && <LoadingLogin/>}
      <div className="px-8 py-6 mt-4 text-left bg-gray-100  shadow-lg">
        <h2 className="text-center text-2xl mb-4">Login</h2>
  
        <form onSubmit={(e) => handlesubmit(e)}>
          <div className="mt-4">
            <div>
              <label className="block text-xl mb-1" htmlFor="email">
                Email
              </label>
              <input
                className=" w-full px-4 py-2 pl-2 pr-2  rounded-md border border-neutral-700 text-xl focus:text-gray-700 focus:border-blue-700 focus:outline-none"
                type="text"
                name="email"
                placeholder="Email"
                onChange={handlechange}
                value={user.email}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xl mb-1" htmlFor="clave">
              Clave
            </label>
            <input
              className="w-full px-4 py-2 pl-2 pr-2 rounded-md border border-neutral-700 text-xl focus:text-gray-700 focus:border-blue-700 focus:outline-none"
              type="password"
              placeholder="Clave"
              name="clave"
              id="clave"
              onChange={handlechange}
              value={user.clave}
            />
          </div>
          <div className="flex items-baseline justify-between mt-6">
            <button
              className=" text-xl bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-500"
              type="submit"
              disabled={loading}
            >
              Login
            </button>
            <a className="text-xl text-blue-600 hover:underline" href="#">
              Recuperar Contraseña
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
