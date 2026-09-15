import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import ServicioDetail from "./pages/ServicioDetail";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="servicios/:slug" element={<ServicioDetail />} />
        <Route path="contacto" element={<Contacto />} />
      </Route>
    </Routes>
  );
}
