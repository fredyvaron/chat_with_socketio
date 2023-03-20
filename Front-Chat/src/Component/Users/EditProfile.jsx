import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { reserupdate, updateUser } from "../../Redux/reducer";
import { useAuthDispatch } from "../../Context";
import "./style.css";
import { showToast } from "../Notification/Toast";
import { faL } from "@fortawesome/free-solid-svg-icons";
Modal.setAppElement("#root");

const EditProfile = ({ user }) => {
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastName, setLastName] = useState(user.nombre);
  const [initialLastName, setInitialLastName] = useState(user.nombre);
  const [tempFile, setTempFile] = useState();
  const [currentImage, setCurrentImage] = useState(
    user.image || "https://via.placeholder.com/150"
  ); // si user.image es falsy, usa la URL de una imagen predeterminada
  const dispatch = useDispatch();
  const dispatche = useAuthDispatch();
  const loading = useSelector((state) => state.data.loadingUpdate);
  const error = useSelector((state) => state.data.updateUserError);
  const success = useSelector((state) => state.data.updateUserSuccess);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (file) {
      URL.revokeObjectURL(file);
    }
    if (isModalOpen) {
      // Add this condition
      setIsModalOpen(false);
      dispatch(reserupdate());
    }
  };
  const handleChange = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setTempFile(e.target.files[0]);
  };
  const handleCancel = () => {
    setLastName(initialLastName);
    setFile(null);
    if (tempFile) {
      setTempFile(null);
    }
    closeModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar la información del perfil del usuario
    const formData = new FormData();
    formData.append("nombre", lastName);
    if (tempFile) {
      formData.append("image", tempFile);
    } else {
      formData.append("image", currentImage);
    }
    dispatch(updateUser(user.id, formData, dispatche));
    setCurrentImage(file || currentImage);
    setInitialLastName(lastName);
  };
  useEffect(() => {
    if (success) {
      showToast(true, "Se Actualizo");
      closeModal();
    }
    if (error) {
      showToast(false, error);
    }
  }, [success, error]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div className="flex justify-between">
        <button
          onClick={openModal}
          className="bg-blue-600 text-xl text-white py-2 px-4 rounded flex items-center hover:bg-blue-500"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{" "}
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="ml-3">Editar</span>
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar perfil"
        className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg px-6 py-4 max-w-lg w-full max-h-screen overflow-auto"
        overlayClassName="modal overlay bg-gray-800"
      >
        <button
          className="modal-close text-2xl text-white transition duration-700 ease-in-out hover:transform hover:scale-125 focus:outline-none rounded-full bg-red-500"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.343 5.757a.5.5 0 01.708 0L10 8.293l2.95-2.95a.5.5 0 11.708.708L10.707 9l2.95 2.95a.5.5 0 01-.708.708L10 9.707l-2.95 2.95a.5.5 0 01-.708-.708L9.293 9l-2.95-2.95a.5.5 0 010-.708z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold mb-4">Editar perfil</h2>
          {/* Agrega aquí los campos de edición de perfil */}
          <form>
            <div className="mb-3">
              <label
                htmlFor="prueba"
                className="block text-sm font-semibold text-gray-800"
              >
                Apellidos
              </label>
              <input
                className="block w-full mt-2 px-2 py-4 text-gray-900 border rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                placeholder="Apellidos"
                value={lastName || initialLastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="prueba"
                className="block text-sm font-semibold text-gray-800"
              >
                Imagen
              </label>
              <input
                className="block w-full mt-2 px-2 py-4 text-gray-900 border rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                type="file"
                onChange={handleChange}
                placeholder="Imagen"
              />
            </div>
            <div>
              {currentImage && (
                <div className="relative">
                  <img className="w-full" src={file || currentImage} />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 hover:bg-red-700 transition duration-700 ease-in-out hover:transform hover:scale-125 focus:outline-none"
                    onClick={() => setCurrentImage(null)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.343 5.757a.5.5 0 01.708 0L10 8.293l2.95-2.95a.5.5 0 11.708.708L10.707 9l2.95 2.95a.5.5 0 01-.708.708L10 9.707l-2.95 2.95a.5.5 0 01-.708-.708L9.293 9l-2.95-2.95a.5.5 0 010-.708z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <button
              className="block w-full mt-2 px-2 py-4 border bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Saved
            </button>
            <button
              className="block w-full mt-2 px-2 py-4 border bg-yellow-600 hover:bg-yellow-700 text-white text-lg rounded-lg"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;
