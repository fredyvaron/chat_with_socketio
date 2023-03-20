import React, { useState } from "react";
import axios from "axios";
import contact from "../../assets/undraw_contact_us_re_4qqt.svg";
import { showToast } from "../Notification/Toast";
export const Contact = () => {
  const local_url = import.meta.env.VITE_REACT_APP_URL_LOCAL;
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
    asunto: "",
  });
  const [envioEnProgreso, setEnvioEnProgreso] = useState(false);
  const handlechange = (event) => {
    event.preventDefault();
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value,
    });
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    setEnvioEnProgreso(true);
    try {
      await axios.post(`${local_url}/email`, formulario);
      showToast(true, "Mensaje enviado con exito")
      setFormulario({
        nombre: "",
        correo: "",
        mensaje: "",
        asunto: "",
      });
    } catch (error) {
      showToast(false, "Error Enviando el mensaje")
    }
    setEnvioEnProgreso(false);
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col sm:flex-row items-center">
        <div className="w-full sm:w-1/2 flex items-center justify-center flex-grow flex-shrink">
          <img
            src={contact}
            className="mb-7 sm:mb-0 w-full h-full object-contain transform ease-in-out delay-150 hover:translate-y-2 hover:scale-105"
            alt="contact"
          />
        </div>
        <div className="w-full sm:w-1/2 mr-10 ml-10 flex items-center justify-center flex-grow flex-shrink">
          <div className="w-full bg-slate-200 rounded-xl">
            <form
              className="flex flex-col justify-center w-full p-16"
              onSubmit={handlesubmit}
            >
              <p className="text-center text-4xl text-slate-900 tracking-tight font-extrabold">
                Contactenos
              </p>
              <br />
              <label htmlFor="nombre" className="block">
                Nombre
              </label>
              <input
                className="w-full mt-1 py-2 px-2 text-slate-800 rounded-md border border-gray-800"
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={formulario.nombre}
                onChange={handlechange}
                required
              />
              <label htmlFor="correo" className="block">
                Correo
              </label>
              <input
                className="w-full mt-1 py-2 px-2 text-slate-800 rounded-md border border-gray-800"
                type="email"
                name="correo"
                id="correo"
                placeholder="Correo"
                value={formulario.correo}
                onChange={handlechange}
                required
              />
              <label htmlFor="asunto" className="block mt-2">
                Asunto
              </label>
              <input
                className="w-full mt-1 py-2 px-2 text-slate-800 rounded-md border border-gray-800"
                type="text"
                name="asunto"
                id="asunto"
                placeholder="asunto"
                value={formulario.asunto}
                onChange={handlechange}
                required
              />
              <label htmlFor="Mensaje" className="block mt-2">
                Mensaje
              </label>
              <textarea
                className="leading-none resize-none block w-full text-slate-800 border border-gray-800 rounded py-3 px-2 mb-3 focus:outline-none focus:bg-white focus:border-gray-500 h-48"
                placeholder="Mensaje"
                name="mensaje"
                value={formulario.mensaje}
                onChange={handlechange}
                required
              />
              <br />
              <button
                className={`${
                  envioEnProgreso ? "opacity-50 cursor-not-allowed" : ""
                } w-full px-4 py-2 text-lg font-medium text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-green-500 focus:ring-offset-green-200 focus:ring-2 ${
                  envioEnProgreso ? "cursor-wait" : ""
                }`}
                type="submit"
                disabled={envioEnProgreso}
              >
                {envioEnProgreso ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
