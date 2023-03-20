import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileById } from "../../Redux/reducer";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Profiles = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.data.profile);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProfileById(id));
  }, []);
  let fechaFormateada;
  if(profile && profile.createdAt){
    fechaFormateada = format(new Date(profile.createdAt), "'se unió el' dd 'de' MMMM 'del' yyyy", {locale: es});
  }
  const handleSendMessage = () => {
    navigate(`/messages/${id}`); // Redirigir al componente Message con el ID seleccionado
  }
  return (
    <div className=" mt-4 w-full mx-auto sm:w-4/5">
      {profile ? (
        <div className="flex flex-col">
          <div>
            <img
              className="w-full rounded-lg border border-slate-900 hover:shadow-lg transform ease-in-out delay-150 hover:translate-y-2"
              src={profile.image}
              alt={`Imagen ${profile.image}`}
              draggable={false}
            />
          </div>
          <div className="items-center mt-10">
            <div className="text-7xl">{profile.nombre}</div>
            <div className="text-3xl mt-5">@{profile.email}</div>
            <div className="flex items-center text-xl mt-3"><svg class="h-10 w-10 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg><span>{fechaFormateada}</span></div>
          </div>

          <div className="mt-4">
          <button className="py-2 px-4 rounded-lg bg-sky-500 hover:bg-slate-300 flex items-center" onClick={handleSendMessage}>
          <svg class="h-8 w-8 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
</svg>
<span className="ml-4">Message</span>
          </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Profiles;
