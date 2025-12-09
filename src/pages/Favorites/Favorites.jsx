import React, { useMemo, useContext } from 'react'
import { Row, Col, Empty, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { MovieCatalog, Footer } from '../../components/index'
import { useFavorites, useAddFavorite, useRemoveFavorite } from '../../hooks/useMovies'
import { AuthContext } from '../../context/auth'

const Favorites = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)
  const { data: favorites = [] } = useFavorites()
  const addFav = useAddFavorite()
  const removeFav = useRemoveFavorite()

  const handleToggleFavorite = (movie) => {
    const exists = favorites.some((f) => f.id === movie.id)
    if (exists) removeFav.mutate(movie.id)
    else addFav.mutate(movie)
  }

  // Convertir favoritos a formato compatible con MovieCatalog
  const movieData = useMemo(() => {
    return {
      results: favorites,
      page: 1,
      total_results: favorites.length,
    }
  }, [favorites])

  return (
    <div className="min-h-screen bg-[#141414] text-white px-6 pt-8 pb-8">
      {/* Header */}
      <Row gutter={16} align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm="auto">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/profile')}
            style={{ color: '#E50914', fontSize: 16 }}
          >
            Volver al Perfil
          </Button>
        </Col>
        <Col xs={24} sm="auto">
          <h1 style={{ fontSize: 32, fontWeight: 'bold', margin: 0 }}>
            Mis Películas Favoritas
          </h1>
        </Col>
      </Row>

      {/* Contenido */}
      {favorites.length === 0 ? (
        <Row justify="center" style={{ marginTop: 40 }}>
          <Col xs={24} sm={20} md={16}>
            <Empty
              description="No tienes películas favoritas aún"
              style={{ color: '#aaa' }}
              extra={
                <Button
                  type="primary"
                  onClick={() => navigate('/Popular')}
                  style={{ backgroundColor: '#E50914', borderColor: '#E50914' }}
                >
                  Explorar Películas
                </Button>
              }
            />
          </Col>
        </Row>
      ) : (
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#aaa', marginBottom: 16 }}>
            Tienes {favorites.length} película{favorites.length !== 1 ? 's' : ''} favorita{favorites.length !== 1 ? 's' : ''}
          </p>
          <MovieCatalog movies={movieData} favorites={favorites} onToggleFavorite={handleToggleFavorite} isAuthenticated={isAuthenticated} />
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Favorites
