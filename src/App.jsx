import './index.css';
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components
import { MenuTop, Footer, ProtectedRoute, PublicOnlyRoute } from "./components";
//pages 
import { Home, NewMovies, Popular, Search, Movie, Error404, Login, Register, Profile, Favorites } from "./pages";

function App() {
  const { Content } = Layout;

  return (
    <Router>
      <div className="bg-[#141414] text-white">
        {/* Navbar fijo arriba */}
        <MenuTop />

        <Content >
          <Routes>
            {/* Rutas públicas generales */}
            <Route path="/" element={<Home />} />
            <Route path='/NewMovies' element={<NewMovies/>}/>
            <Route path="/Popular" element={<Popular />} />
            <Route path="/Search" element={<Search />} /> 
            <Route path="/Movie/:id" element={<Movie />} /> 

            {/* Rutas públicas exclusivas (solo sin autenticación) */}
            <Route 
              path="/login" 
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicOnlyRoute>
                  <Register />
                </PublicOnlyRoute>
              } 
            />

            {/* Rutas privadas (solo con autenticación) */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />

            {/* 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Content>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
