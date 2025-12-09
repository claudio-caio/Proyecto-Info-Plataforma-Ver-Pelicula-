import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Row, Col, Alert } from 'antd'
import { AuthContext } from '../../context/auth'

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form] = Form.useForm()

  // Si ya está autenticado, redirige a perfil
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onFinish = (values) => {
    setLoading(true)
    setError(null)

    // Mock login: validación básica
    if (values.email && values.password) {
      // Simulamos login exitoso
      const userData = {
        id: Math.random(),
        email: values.email,
        name: values.email.split('@')[0],
      }
      login(userData)
      setLoading(false)
      form.resetFields()
      // La redirección ocurre por el useEffect cuando isAuthenticated cambia
    } else {
      setError('Por favor completa todos los campos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <Row gutter={16} style={{ width: '100%', maxWidth: 400 }}>
        <Col span={24}>
          <Card
            title={<h2 className="text-white text-center text-2xl mb-0">Iniciar Sesión</h2>}
            style={{ backgroundColor: '#1f1f1f', borderColor: '#E50914' }}
            headStyle={{ backgroundColor: '#1f1f1f', borderBottomColor: '#E50914' }}
            bodyStyle={{ backgroundColor: '#1f1f1f' }}
          >
            {error && <Alert message={error} type="error" showIcon className="mb-4" />}

            <Form
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label={<span style={{ color: '#fff' }}>Email</span>}
                name="email"
                rules={[{ required: true, message: 'Por favor ingresa tu email' }]}
              >
                <Input
                  placeholder="tuemail@ejemplo.com"
                  type="email"
                  style={{ backgroundColor: '#222', borderColor: '#E50914', color: '#fff' }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: '#fff' }}>Contraseña</span>}
                name="password"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              >
                <Input.Password
                  placeholder="Tu contraseña"
                  style={{ backgroundColor: '#222', borderColor: '#E50914', color: '#fff' }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{ backgroundColor: '#E50914', borderColor: '#E50914', height: 40 }}
                >
                  Ingresar
                </Button>
              </Form.Item>
            </Form>

            <p style={{ color: '#aaa', textAlign: 'center' }}>
              ¿No tienes cuenta? <a href="/register" style={{ color: '#E50914' }}>Regístrate aquí</a>
            </p>

            <div style={{ marginTop: 16, padding: '12px', backgroundColor: '#222', borderRadius: 4 }}>
              <p style={{ color: '#fff', fontSize: 12, marginBottom: 4 }}>
                <strong>Demo login:</strong>
              </p>
              <p style={{ color: '#aaa', fontSize: 12 }}>
                Email: demo@ejemplo.com<br />
                Password: cualquier contraseña
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login
