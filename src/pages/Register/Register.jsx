import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, Row, Col, Alert } from 'antd'
import { AuthContext } from '../../context/auth'

const Register = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = (values) => {
    setLoading(true)
    setError(null)

    if (values.password !== values.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (values.email && values.password) {
      setTimeout(() => {
        // Simulamos registro exitoso
        const userData = {
          id: Math.random(),
          email: values.email,
          name: values.name || values.email.split('@')[0],
        }
        login(userData)
        setLoading(false)
        navigate('/profile')
      }, 500)
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
            title={<h2 className="text-white text-center text-2xl mb-0">Crear Cuenta</h2>}
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
                label={<span style={{ color: '#fff' }}>Nombre</span>}
                name="name"
              >
                <Input
                  placeholder="Tu nombre"
                  style={{ backgroundColor: '#222', borderColor: '#E50914', color: '#fff' }}
                />
              </Form.Item>

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
                rules={[{ required: true, message: 'Por favor ingresa una contraseña' }]}
              >
                <Input.Password
                  placeholder="Tu contraseña"
                  style={{ backgroundColor: '#222', borderColor: '#E50914', color: '#fff' }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: '#fff' }}>Confirmar Contraseña</span>}
                name="confirmPassword"
                rules={[{ required: true, message: 'Por favor confirma tu contraseña' }]}
              >
                <Input.Password
                  placeholder="Confirma tu contraseña"
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
                  Registrarse
                </Button>
              </Form.Item>
            </Form>

            <p style={{ color: '#aaa', textAlign: 'center' }}>
              ¿Ya tienes cuenta? <a href="/login" style={{ color: '#E50914' }}>Inicia sesión aquí</a>
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Register
