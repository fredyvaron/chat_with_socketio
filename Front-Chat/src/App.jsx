import { Route, Routes } from "react-router-dom";
import About from "./Component/About/About";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import { Contact } from "./Component/Contact/Contact";
import Footer from "./Component/Footer/Footer";
import Message from "./Component/Messages/Message";
import Navbar from "./Component/Nav/Navbar";
import PerfilWithContext from "./Component/Users/PerfilWithContext";
import Profiles from "./Component/Users/Profiles";
import { AuthProvider } from "./Context";
import Home from "./Home";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <AuthProvider>
        <Navbar />
        <div className="flex-grow mb-0">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/messages/:idUser?" element={<Message />} />
              <Route path="/profile" element={<PerfilWithContext />} />
              <Route path="/profiles/:id" element={<Profiles />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
