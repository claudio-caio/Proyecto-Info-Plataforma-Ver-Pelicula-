import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Componentes
import { MenuTop } from './components'

// Pages
import { Home, NewMovie, Popular, Search, Movie, Error404 } from './pages/'


const App = () => {
  const { Header, Content } = Layout

  return (
    <Layout>
      <Router>
        <Header style={{ zIndex: 1 }}>
          <MenuTop />
        </Header>

        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-movies" element={<NewMovie />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  )
}

export default App
