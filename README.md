# Fleets - Gestión de Flotas y Personal

Aplicación Full-Stack diseñada para la gestión integral de flotas de vehículos, personal sanitario/conductores, incidencias técnicas e inventario de material.

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la creación de la API REST.
- **Sequelize**: ORM para la gestión de la base de datos.
- **MySQL**: Sistema de gestión de base de datos relacional.

### Frontend
- **Ionic 8**: Framework para el desarrollo de la interfaz de usuario móvil/web.
- **Angular 20**: Framework para la lógica de la aplicación.
- **Capacitor**: Para el despliegue en plataformas nativas (Android/iOS).

---

## Configuración y Ejecución Local

### Pre-requisitos
- Node.js instalado (versión compatible con Angular 20).
- MySQL instalado y en ejecución.

### 1. Configuración del Backend

1. Navega a la carpeta del servidor:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Edita el archivo `.env` con tus credenciales de base de datos local (DB_USER, DB_PASSWORD, etc.).
4. Inicializa la base de datos (Migraciones y Seeds):
   ```bash
   npm run reset-db
   ```
   *Nota: Este comando borra la base de datos existente, ejecuta las migraciones para crear las tablas y las rellena con datos de prueba.*

5. Inicia el servidor:
   ```bash
   npm start
   ```

### 2. Configuración del Frontend

1. Abre una nueva terminal y navega a la carpeta del cliente:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```
   *La aplicación se abrirá automáticamente en tu navegador (normalmente en `http://localhost:8100/`).*

---

## Estructura del Proyecto

- `/backend`: Servidor API y modelos de base de datos.
- `/frontend`: Código fuente de la aplicación Ionic/Angular.
