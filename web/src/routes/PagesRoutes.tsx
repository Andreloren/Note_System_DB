import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../page/login/Login";
import { Cadastro } from "../page/cadastro/Cadastro";
import { Home } from "../page/home/Home";

const PagesRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="*" element={<h1>ERRO 404 PAGE NOT FOUND</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PagesRoutes;
