# 🛒 E-commerce Backend API

Backend desarrollado con Node.js, Express y MongoDB para un sistema de e-commerce con autenticación JWT y gestión de carritos de compra.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Passport.js** - Autenticación
- **JWT** - JSON Web Tokens
- **Handlebars** - Motor de plantillas
- **Bcrypt** - Encriptación de contraseñas

## 📋 Funcionalidades

### 👤 Gestión de Usuarios
- ✅ Registro de usuarios
- ✅ Inicio de sesión
- ✅ Autenticación JWT
- ✅ Roles de usuario (USER, ADMIN, SUPERADMIN)
- ✅ Validación de datos
- ✅ Encriptación de contraseñas

### 🛒 Gestión de Carritos
- ✅ Creación automática de carrito al registrar usuario
- ✅ Referencia bidireccional usuario-carrito
- ✅ Estructura para productos y cantidades
- ✅ Cálculo de totales

### 🔐 Autenticación y Autorización
- ✅ Estrategias Passport Local y JWT
- ✅ Middleware de autorización por roles
- ✅ Cookies seguras para tokens
- ✅ Validación de sesiones

## 🏗️ Estructura del Proyecto

```
server/
├── src/
│   ├── config/          # Configuraciones
│   │   ├── config.js
│   │   ├── paths.js
│   │   └── passport/    # Estrategias de autenticación
│   ├── db/              # Conexión a base de datos
│   ├── middlewares/     # Middlewares personalizados
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas de la API
│   ├── utils/           # Utilidades
│   ├── views/           # Vistas Handlebars
│   └── server.js        # Archivo principal
├── public/              # Archivos estáticos
└── package.json
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio-url>
cd server
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```env
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRES_IN=1h
SESSION_SECRET=tu_session_secret
```

### 4. Ejecutar el servidor
```bash
npm start
```

## 📡 Endpoints de la API

### 🔐 Autenticación
- `POST /api/sessions/register` - Registro de usuario
- `POST /api/sessions/login` - Inicio de sesión
- `GET /api/sessions/current` - Usuario actual
- `GET /api/sessions/logout` - Cerrar sesión

### 👤 Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `GET /api/users/:id/cart` - Obtener carrito del usuario

### 🛒 Carritos
- Los carritos se crean automáticamente al registrar usuarios
- Referencia bidireccional con usuarios
- Estructura preparada para productos

## 📝 Ejemplos de Uso

### Registro de Usuario
```bash
POST /api/sessions/register
Content-Type: application/json

{
  "first_name": "Juan",
  "last_name": "Pérez",
  "age": 25,
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

### Respuesta de Registro
```json
{
  "status": "success",
  "payload": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@ejemplo.com",
    "role": "USER",
    "cart": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "products": [],
      "total": 0
    }
  },
  "cartId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "message": "Usuario registrado exitosamente"
}
```

## 🔧 Scripts Disponibles

- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo (si está configurado)

## 📊 Base de Datos

### Modelo de Usuario
```javascript
{
  first_name: String (requerido),
  last_name: String (requerido),
  age: Number (requerido),
  email: String (requerido, único),
  password: String (requerido, encriptado),
  role: String (enum: ['USER', 'ADMIN', 'SUPERADMIN']),
  cart: ObjectId (referencia a carrito)
}
```

### Modelo de Carrito
```javascript
{
  user: ObjectId (referencia a usuario),
  products: [{
    product: ObjectId (referencia a producto),
    quantity: Number (mínimo 1)
  }],
  total: Number (default: 0)
}
```

## 🔒 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ JWT para autenticación
- ✅ Validación de datos de entrada
- ✅ Middleware de autorización por roles
- ✅ Cookies seguras (httpOnly, sameSite)

## 👨‍💻 Autor

Desarrollado como parte del curso Full Stack Developer de CoderHouse.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. 