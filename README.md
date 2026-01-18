# 🐾 Plataforma de Tienda de Mascotas y Clínica Veterinaria

Sistema web completo para la gestión de **servicios veterinarios**, **adopción de mascotas**, **inventario**, **doctores**, **testimonios** y **dashboard administrativo**, desarrollado con tecnologías modernas y escalables.

---

## 📌 Descripción General

Esta plataforma permite a los usuarios:
- Ver servicios veterinarios disponibles
- Conocer las mascotas en adopción
- Solicitar la adopción mediante formularios
- Consultar doctores y sus especialidades
- Leer testimonios de clientes y adoptantes

Mientras que los administradores pueden:
- Gestionar el inventario de mascotas
- Aprobar o rechazar solicitudes de adopción
- Llevar una bitácora de adopciones
- Administrar servicios, doctores y testimonios
- Visualizar métricas desde un dashboard

---

## 🧱 Tecnologías Utilizadas

---

## 🎨 Frontend — Vue.js

### 🔹 Vue 3 (Composition API)
Framework JavaScript progresivo utilizado para construir la interfaz de usuario.

**Funciones principales:**
- Construcción de SPA (Single Page Application)
- Componentes reutilizables
- Manejo reactivo del estado
- Mejor organización del código con `script setup`

---

### 🔹 Vue Router
Sistema de enrutamiento oficial de Vue.

**Funciones:**
- Navegación entre vistas
- Rutas protegidas por roles
- Lazy loading de páginas
- Manejo de rutas dinámicas (detalle de mascotas, servicios, etc.)

---

### 🔹 Pinia
Gestor de estado global.

**Funciones:**
- Manejo de usuarios autenticados
- Estado del inventario
- Datos compartidos entre componentes
- Reemplazo moderno de Vuex

---

### 🔹 Tailwind CSS
Framework de estilos basado en utilidades.

**Funciones:**
- Diseño rápido y consistente
- Responsive design
- Evita CSS redundante
- Personalización con temas y colores

---

### 🔹 Flowbite
Librería de componentes basada en Tailwind.

**Funciones:**
- Componentes listos para usar (modales, tablas, cards)
- Acelera el desarrollo UI
- Consistencia visual

---

### 🔹 Chart.js
Librería de gráficos.

**Funciones:**
- Visualización de métricas en el dashboard
- Estadísticas de adopciones
- Gráficos de inventario y servicios

---

### 🔹 FontAwesome
Librería de íconos.

**Funciones:**
- Mejora visual de la UI
- Iconos para servicios, acciones y estados

---

## ⚙️ Backend — Node.js & Express

---

### 🔹 Node.js
Entorno de ejecución para JavaScript del lado del servidor.

**Funciones:**
- Lógica del servidor
- Comunicación entre frontend y base de datos
- Manejo de solicitudes HTTP

---

### 🔹 Express.js
Framework minimalista para Node.js.

**Funciones:**
- Creación de API REST
- Definición de rutas
- Middlewares de autenticación
- Validación de datos
- Separación de controladores y servicios

---

### 🔹 Firebase Admin SDK
SDK para administración segura de Firebase desde el backend.

**Funciones:**
- Acceso seguro a Firestore
- Validación de tokens JWT
- Gestión de usuarios
- Control de permisos por rol

---

## ☁️ Base de Datos y Servicios — Firebase

---

### 🔹 Firebase Firestore
Base de datos NoSQL en tiempo real.

**Funciones:**
- Almacenamiento de mascotas
- Solicitudes de adopción
- Bitácora de adopciones
- Servicios veterinarios
- Doctores y testimonios
- Escalabilidad automática

---

### 🔹 Firebase Authentication
Sistema de autenticación.

**Funciones:**
- Registro e inicio de sesión
- Control de usuarios
- Manejo de roles (admin, cliente, veterinario)
- Seguridad de acceso

---

### 🔹 Firebase Storage
Almacenamiento de archivos.

**Funciones:**
- Imágenes de mascotas
- Fotos de doctores
- Recursos visuales del sistema
- Acceso seguro mediante reglas

---

### 🔹 Firebase Cloud Functions (Opcional)
Funciones serverless.

**Funciones:**
- Envío de notificaciones
- Automatización de procesos
- Acciones al cambiar estados de adopción

---

## 🔐 Seguridad

- Reglas de seguridad en Firestore
- Autenticación basada en tokens
- Middlewares de protección en Express
- Control de acceso por roles

---

## 📊 Dashboard Administrativo

**Funcionalidades:**
- Gestión de inventario
- Aprobación de adopciones
- Visualización de métricas
- Bitácora de cambios
- Administración de doctores y servicios

---

## 📁 Arquitectura del Proyecto

### Frontend
