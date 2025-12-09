# MoviesApp - Plataforma de Películas

Una aplicación web moderna de streaming de películas construida con **React**, **React Router**, **React Query**, y **Autenticación Mock**.

## 🎯 Características Principales

### ✅ **Entrega 1: Interacción Dinámica**
- ✔ **useState** / **useEffect** para manejo de estado reactivo
- ✔ **Custom Hooks** (`useMovies`, `useForm`, `useFetch`)
- ✔ **React Query** (`useQuery`, `useMutation`) para consumo de datos
- ✔ **API TMDB** para datos reales de películas
- ✔ Estados de carga (Loading), error y empty states
- ✔ Sistema de **favoritos** con `localStorage` y mutaciones

### ✅ **Entrega 3: Sistema de Rutas**
- ✔ **React Router** implementado con navegación completa
- ✔ **Rutas Públicas Generales**: Home, Catálogo (Popular, Nuevas), Búsqueda, Detalles
- ✔ **Rutas Públicas Exclusivas** (solo sin autenticación): `/login`, `/register`
- ✔ **Rutas Privadas** (solo con autenticación): `/profile`, `/favorites`
- ✔ **AuthContext + useReducer** para manejo global de autenticación
- ✔ **ProtectedRoute** - componente wrapper que valida autenticación
- ✔ **PublicOnlyRoute** - componente que redirige usuarios logueados
- ✔ **Autenticación Mock** - login/logout simulado sin backend real

## 📦 Stack Tecnológico

```
Frontend:
- React 18.3
- Vite 7
- React Router DOM 7.9
- @tanstack/react-query 5.90
- Tailwind CSS 4
- Ant Design 5
- Moment.js (fechas)
```

## 🚀 Instalación y Uso

### 1. Clonar y descargar dependencias
```bash
git clone <tu-repo>
cd Proyecto-Info2
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_TMDB_API_KEY=tu_api_key_de_tmdb_aqui
```

Obtén tu API key gratuita en [TMDB API](https://www.themoviedb.org/settings/api).

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación abrirá en `http://localhost:5173`.

### 4. Compilar para producción
```bash
npm run build
npm run preview
```

## 📋 Rutas de la Aplicación

### 🟢 Públicas Generales (Cualquiera)
| Ruta | Descripción |
|------|-------------|
| `/` | Home - Lista de películas destacadas |
| `/Popular` | Catálogo de películas populares con paginación |
| `/NewMovies` | Películas de estrenos recientes |
| `/Search` | Buscador de películas con resultados dinámicos |
| `/Movie/:id` | Detalle de película individual |

### 🔵 Públicas Exclusivas (Sin autenticación)
| Ruta | Descripción | Comportamiento |
|------|-------------|-----------------|
| `/login` | Formulario de inicio de sesión | Si estás logueado → redirige a `/profile` |
| `/register` | Formulario de registro | Si estás logueado → redirige a `/profile` |

### 🔴 Privadas (Con autenticación requerida)
| Ruta | Descripción | Comportamiento |
|------|-------------|-----------------|
| `/profile` | Perfil del usuario autenticado | Si NO estás logueado → redirige a `/login` |
| `/favorites` | Lista de películas favoritas | Si NO estás logueado → redirige a `/login` |

## 🔐 Sistema de Autenticación

### Login Mock
1. Navega a `/login`
2. Ingresa cualquier **email** y **contraseña**
3. Sistema actualiza `AuthContext` y redirige a `/profile`
4. Datos del usuario se guardan en contexto (no persisten al recargar)

**Credenciales demo:**
```
Email: demo@ejemplo.com
Password: cualquier contraseña
```

### Logout
- Haz clic en botón **"Logout"** en la navbar (derecha)
- Se limpia el contexto y redirige a `/login`

## 🏗️ Arquitectura de Autenticación

```
src/
├── context/
│   ├── auth.js (contexto)
│   └── AuthContext.jsx (proveedor con useReducer)
├── components/
│   ├── ProtectedRoute.jsx (valida autenticación)
│   └── PublicOnlyRoute.jsx (redirige si está logueado)
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── Profile/
│   └── Favorites/
└── App.jsx (rutas integradas)
```

### useReducer - Acciones Disponibles
```javascript
// LOGIN
dispatch({ type: 'LOGIN', payload: userData })

// LOGOUT
dispatch({ type: 'LOGOUT' })
```

## 🎬 React Query - Hooks Disponibles

```javascript
// Lecturas (useQuery)
usePopularMovies(page)
useNowPlaying(page)
useTopRated(page)
useMovie(id)
useMovieVideos(id)
useSearchMovies(query, page)

// Favoritos (useMutation)
useFavorites()          // Leer favoritos
useAddFavorite()        // Agregar a favoritos
useRemoveFavorite()     // Remover de favoritos
```

## 🎯 Componentes Clave

### ProtectedRoute
Valida que el usuario esté autenticado. Si no, redirige a `/login`.
```jsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

### PublicOnlyRoute
Solo accesible si **NO** estás autenticado. Si lo estás, redirige a `/profile`.
```jsx
<Route 
  path="/login" 
  element={
    <PublicOnlyRoute>
      <Login />
    </PublicOnlyRoute>
  } 
/>
```

## 📱 Responsive Design

- ✔ Mobile-first approach con Tailwind CSS
- ✔ Compatibilidad con tablets y desktop
- ✔ Navbar fija con menú de navegación
- ✔ Modales y dropdowns adaptativos

## 🔍 API TMDB Integrada

La app consume la **The Movie Database (TMDB) API** en tiempo real:
- Películas populares
- Estrenos recientes
- Top rated
- Búsqueda por título
- Detalles y videos

## ⚡ Performance

- ✔ **React Query** cachea datos automáticamente
- ✔ **Lazy Loading** en componentes
- ✔ **HMR** (Hot Module Replacement) en desarrollo
- ✔ Compilación optimizada con Vite

## 🐛 Troubleshooting

### Error: "Bad argument type... React Query v5"
**Solución:** Reinicia el servidor dev (`npm run dev`)

### API Key no funciona
- Verifica que esté en `.env` como `VITE_TMDB_API_KEY=...`
- Confirma que sea una key de TMDB válida

### Las rutas privadas no funcionan
- Asegúrate que `AuthProvider` está en `src/main.jsx`
- Verifica que `ProtectedRoute` está importado en `App.jsx`

## 📚 Recursos Útiles

- [React Router Docs](https://reactrouter.com)
- [React Query Docs](https://tanstack.com/query/latest)
- [TMDB API Docs](https://www.themoviedb.org/settings/api)
- [Tailwind CSS](https://tailwindcss.com)
- [Ant Design](https://ant.design)

## 📝 Notas de Desarrollo

- **Autenticación Mock:** Los datos de usuario se pierden al recargar la página
- **Favoritos:** Se guardan en `localStorage` y persisten entre sesiones
- **React Query:** Usa v5, requiere forma objeto en llamadas

---

**Proyecto Entrega 3** - Sistema de Rutas con Autenticación Mock y Context + useReducer
