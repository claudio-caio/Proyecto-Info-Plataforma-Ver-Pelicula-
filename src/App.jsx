import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//Componentes
import MenuTop from "./components/MenuTop/MenuTop"


// Pages
import Home from './pages/home';
import NewMoviews from './pages/new-movie'
import Popular from './pages/popular'
import Search from './pages/search/'
import Movie from './pages/movie'
import Error404 from './pages/Error404/error404.jsx'






function App() {
  const {Header,Content } = Layout

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1}}>
          <MenuTop />
        </Header>

        <Content>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/new-movies" element={<NewMoviews />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}

export default App
