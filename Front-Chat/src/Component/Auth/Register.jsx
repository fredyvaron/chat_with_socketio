import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, useAuthDispatch, useAuthState } from "../../Context";
import { showToast } from "../Notification/Toast";

export default function Register() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  const { errorMessage, loading_registers} = useAuthState()
  const [registere, setRegistere] = useState({
    nombre: "",
    email: "",
    clave: "",
    TypeUserId: "2",
  });
  useEffect(() => {
    if (errorMessage) {
      showToast(false, errorMessage)
    }
  }, [errorMessage])
  const handleChange = (e) => {
    e.preventDefault();
    setRegistere({ ...registere, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await register(dispatch, registere)
      if(!response)return
      navigate("/")
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    setRegistere({
      nombre: "",
      email: "",
      clave: "",
      TypeUserId: "2",
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-8 py-6 mt-4 text-left bg-gray-100  shadow-lg">
        <h2 className="text-center text-2xl mb-4">Register</h2>
        {errorMessage ? <p> {errorMessage}</p> : null}
        <form onSubmit={(e) => handlesubmit(e)}>
          <div className="mt-4">
            <div>
              <label htmlFor="email" className="block text-xl mb-1">
                Email
              </label>
              <input
                className=" w-full py-2 pl-2 pr-2  rounded-md border border-neutral-700 text-xl focus:text-gray-700 focus:border-blue-700 focus:outline-none"
                type="text"
                name="email"
                placeholder="Email"
                value={registere.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="clave" className="block text-xl mb-1">
              Clave
            </label>
            <input
              className="w-full py-2 pl-2 pr-2 rounded-md border border-neutral-700 text-xl focus:text-gray-700 focus:border-blue-700 focus:outline-none"
              type="password"
              placeholder="Clave"
              name="clave"
              id="clave"
              value={registere.clave}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="nombre" className="block text-xl mb-1">
              Nombre
            </label>
            <input
              className="w-full py-2 pl-2 pr-2  rounded-md border border-neutral-700 text-xl focus:outline-none"
              type="text"
              placeholder="Nombre"
              name="nombre"
              id="nombre"
              value={registere.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className=" text-xl bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-300"
              type="submit"
              disabled={loading_registers}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
