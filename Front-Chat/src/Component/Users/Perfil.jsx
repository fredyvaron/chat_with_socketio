import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "../../Context/";
import { reserupdate } from "../../Redux/reducer";
import EditProfile from "./EditProfile";

const Perfil = () => {
  const {user} = useAuthState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loadingUpdate);
  console.log(user, "User details");
  useEffect(()=> {
    dispatch(reserupdate())
  },[])
  return (
    <div>
            {loading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="w-full mx-auto sm:w-4/5">
        <div className="flex flex-col">
          <div>
            <img
              className="w-full rounded-lg"
              src={user.user.image}
              alt="Imagen"
              draggable={"false"}
            />
          </div>
          <div className="items-center mt-10">
            <div className="text-2xl">{user.user.nombre}</div>
            <div className="text-2xl">{user.user.email}</div>
          </div>
          <div className="items-center mt-10">
          <EditProfile user={user.user}/>
          </div>

        </div>
      </div>
      )}
    </div>
  );
};

export default Perfil;

