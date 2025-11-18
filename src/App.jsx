import './index.css';
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import { MenuTop, Footer } from "./components";
//pages
import { Home, NewMovies, Popular, Search, Movie, Error404 } from "./pages";

function App() {
  const { Content } = Layout;

  return (
    <Router>
      <div className="bg-[#141414] text-white">
        {/* Navbar fijo arriba */}
        <MenuTop />

        <Content >
          <Routes>
            {/* Tus rutas */}
            <Route path="/" element={<Home />} />
            <Route path='/NewMovies' element={<NewMovies/>}/>
            <Route path="/Popular" element={<Popular />} />
            <Route path="/Search" element={<Search />} /> 
            <Route path="/Movie/:id" element={<Movie />} /> 
            <Route path="*" element={<Error404 />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </Content>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
