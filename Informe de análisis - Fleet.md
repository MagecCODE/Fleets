# Informe de Análisis: Proyecto Fleets

Este documento proporciona una visión detallada de la arquitectura, funcionamiento y estructura del proyecto "Fleets".

## 1. Arquitectura General
El proyecto es una aplicación full-stack diseñada para la gestión de flotas, personal, incidencias e inventario. Utiliza una arquitectura desacoplada:

- **Backend**: Servidor API REST construido con Node.js y Express.
- **Frontend**: Aplicación móvil/web desarrollada con Ionic Framework y Angular.
- **Base de Datos**: Relacional (MySQL), gestionada a través del ORM Sequelize.

---

## 2. Backend (Node.js + Sequelize)
Ubicado en la carpeta `/backend`.

### Tecnologías Clave
- **Express**: Framework para la gestión de rutas y middleware.
- **Sequelize**: ORM para interactuar con la base de datos MySQL.
- **Multer**: Utilizado para la subida de archivos (fotografías de perfil).

### Modelos de Datos (BBDD)
- **UNIT**: Representa las unidades de la flota (ambulancias, vehículos, etc.).
- **EMPLOYEE**: Gestiona el personal (DNI, nombre, especialidad, rol).
- **DOTA**: "Dotación". Es el modelo central que relaciona una **Unit** con varios **Employees** (Conductor, Sanitario, Médico).
- **INCIDENCE**: Registro de faltas o problemas técnicos asociados a una unidad y un empleado.
- **INVENTORY**: Control de stock de material para cada unidad.

### Estructura de Archivos
- `index.js`: Punto de entrada, configuración de CORS y conexión a la BD.
- `/models`: Definición de esquemas y asociaciones de Sequelize.
- `/controllers`: Lógica de negocio para cada entidad (CRUD, login).
- `/routes`: Definición de los endpoints de la API.

---

## 3. Frontend (Ionic + Angular)
Ubicado en la carpeta `/frontend`.

### Tecnologías Clave
- **Ionic 8**: Proporciona componentes de UI móviles.
- **Angular 20**: Framework para la lógica de la aplicación y gestión de estados.
- **Capacitor**: Permite desplegar la aplicación en dispositivos nativos (Android/iOS).

### Estructura de Navegación (`app.routes.ts`)
- `/login`: Pantalla de acceso.
- `/admin`: Panel de control para administradores.
- `/dota`: Vista de dotación/unidad actual.
- `/dota-detail/:unitfleet`: Detalle específico de una unidad.
- `/incidents`: Lista y reporte de incidencias.

### Organización del Código
- `/src/app/pages`: Componentes de página completos.
- `/src/app/services`: Lógica de comunicación con el backend (HttpClient).
- `/src/app/models`: Interfaces de TypeScript que reflejan los modelos del backend.

---

## 4. Flujo de Funcionamiento
1. **Autenticación**: El usuario accede mediante DNI y contraseña (validación simple en el controlador de empleados).
2. **Gestión de Unidades**: Los empleados son asignados a unidades a través del modelo `Dota`.
3. **Mantenimiento**: Durante el turno, el personal puede registrar incidencias técnicas o actualizar el inventario de su unidad asignada.
4. **Administración**: Los usuarios con rol de administrador pueden gestionar el personal y ver el estado global de la flota.
