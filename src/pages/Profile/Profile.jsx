import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Row, Col } from 'antd'
import { UserOutlined, LogoutOutlined, HeartOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { AuthContext } from '../../context/auth'
import { Footer } from '../../components/index'

const Profile = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Header con botón atrás */}
      <div style={{ paddingTop: '80px', paddingBottom: 0 }}>
        <div className="max-w-6xl mx-auto px-6">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            style={{ color: '#E50914', fontSize: 16, marginBottom: 24 }}
          >
            Volver al inicio
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Row gutter={[32, 32]}>
          {/* Tarjeta de usuario */}
          <Col xs={24} md={12}>
            <div style={{
              backgroundColor: '#1f1f1f',
              borderLeft: '4px solid #E50914',
              borderRadius: 8,
              padding: 32,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: '#E50914',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                }}>
                  <UserOutlined style={{ color: '#fff' }} />
                </div>
                <div>
                  <p style={{ color: '#aaa', margin: 0, fontSize: 12 }}>Bienvenido,</p>
                  <h1 style={{ color: '#fff', margin: '4px 0 0 0', fontSize: 28, fontWeight: 'bold' }}>
                    {user?.name || 'Usuario'}
                  </h1>
                </div>
              </div>

              <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #333' }}>
                <p style={{ color: '#aaa', margin: '0 0 8px 0', fontSize: 12 }}>Email</p>
                <p style={{ color: '#fff', margin: 0, fontSize: 16 }}>{user?.email || 'No disponible'}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <p style={{ color: '#aaa', margin: '0 0 8px 0', fontSize: 12 }}>ID de Usuario</p>
                <p style={{ color: '#888', margin: 0, fontSize: 13, fontFamily: 'monospace' }}>
                  {user?.id ? user.id.toString().slice(0, 16) : 'N/A'}
                </p>
              </div>
            </div>
          </Col>

          {/* Tarjeta de acciones */}
          <Col xs={24} md={12}>
            <div style={{
              backgroundColor: '#1f1f1f',
              borderLeft: '4px solid #E50914',
              borderRadius: 8,
              padding: 32,
            }}>
              <h2 style={{ color: '#fff', marginTop: 0, marginBottom: 24, fontSize: 20 }}>
                Opciones
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Button
                  block
                  type="primary"
                  icon={<HeartOutlined />}
                  onClick={() => navigate('/favorites')}
                  size="large"
                  style={{
                    backgroundColor: '#E50914',
                    borderColor: '#E50914',
                    height: 44,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Ver Mis Favoritos
                </Button>

                <Button
                  block
                  danger
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                  size="large"
                  style={{
                    backgroundColor: '#cc0000',
                    borderColor: '#cc0000',
                    height: 44,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Cerrar Sesión
                </Button>
              </div>

              <p style={{ color: '#666', fontSize: 12, marginTop: 24, textAlign: 'center', marginBottom: 0 }}>
                Tu información está segura. Esta es una demostración.
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
