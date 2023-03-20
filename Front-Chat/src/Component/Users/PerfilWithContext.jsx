import { AuthProvider } from "../../Context";
import Perfil from "./Perfil";

const PerfilWithContext = () => {

  return (
    <AuthProvider>
      <Perfil />
    </AuthProvider>
  );
};

export default PerfilWithContext;