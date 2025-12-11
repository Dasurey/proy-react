# 🏐 VolleyballArt – E-commerce de productos de voley

Proyecto final de **React** para el curso **Talento Tech – Desarrollo Frontend con JavaScript**.

VolleyballArt es un e-commerce educativo donde podés:
- Explorar un catálogo de productos y filtrar por categorías
- Ver detalles de cada artículo
- Gestionar un carrito de compras completo
- Acceder como administrador para crear nuevos productos

> 💡 Proyecto educativo sin fines comerciales. VolleyballArt es una marca ficticia.

---

## ✨ Funcionalidades principales

### 🛒 Tienda

* **Catálogo de productos**

  * Listado principal en la página de inicio.
  * Filtro por categoría desde la navegación: `Camisetas de Juego`, `Pelotas`, `Camperas y Buzos`, `Accesorios`.
  * Datos obtenidos desde una **API Mock (MockAPI)**.

* **Detalle de producto**

  * Ruta dinámica `/detail/:id`.
  * Muestra imagen, nombre, descripción y precio.
  * Permite sumar el producto al carrito desde el detalle.

* **Carrito de compras**

  * Agregar productos desde el listado y el detalle.
  * Display del **contador de ítems** en el icono del carrito.
  * Listado con:

    * Imagen, nombre y categoría.
    * Cantidad seleccionada por ítem.
    * Precio unitario y subtotal.
  * Controles para:

    * Incrementar / decrementar cantidad.
    * Eliminar un producto específico.
    * Vaciar completamente el carrito.
  * Manejado con **Context API (`CartContext`)** para usarlo en toda la app.

### 🔐 Autenticación & rutas protegidas

* **Login de administrador (simulado)**

  * Pantalla de login con UI cuidada.
  * Autenticación manejada en el front con `AuthContext` (no hay backend real).
  * Usuario demo:

    * Usuario: `admin` **o** `admin@example.com`
    * Contraseña: `1234`
  * Sesión guardada en `localStorage` para mantener el estado mientras se navega.

* **Rutas protegidas**

  * Se utiliza un componente `ProtectedRoute` que:

    * Muestra un mensaje de “verificando sesión” mientras lee el estado desde `localStorage`.
    * Redirige a `/login` si no hay sesión válida.
  * Actualmente se protege el **panel de administración**:

    * `/admin/highqualityproducts`

### 🛠️ Panel de administración

* Layout propio con **tema oscuro**, separado visualmente de la tienda.
* Sección **“Alta de productos”** con formulario dividido en bloques:

  * Datos del producto: nombre, precio (acepta decimales), categoría y descripción.
  * Imágenes:

    * Subida de archivo desde la PC → se envía a **ImgBB**.
    * Alternativa: campo para URL de imagen (por ejemplo, imágenes locales en `/public/images`).
* Validaciones:

  * Nombre obligatorio.
  * Precio numérico > 0 (soporta `1500.60` y `1500,60`).
  * Categoría obligatoria.
  * Descripción con longitud mínima.
  * Se requiere **archivo o URL de imagen**.
* Notificaciones con un pequeño sistema de **toasts** (éxito, error, info).

---

## 🧱 Tecnologías utilizadas

* [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* [React Router DOM](https://reactrouter.com/)
* **Context API**:

  * `CartContext` – estado global del carrito.
  * `AuthContext` – estado de autenticación.
* CSS modularizado por componente (`.css` por carpeta).
* [MockAPI](https://mockapi.io/) – API REST falsa para productos.
* [ImgBB](https://api.imgbb.com/) – subida de imágenes desde el panel admin.
* JavaScript moderno (ES6+).

---

## 📂 Estructura general del proyecto

```text
src/
  components/
    Nav/
    Header/
    Footer/
    Cart/
    Login/
    Item/
    ItemList/
    ItemListContainer/
    ItemDetail/
    ItemDetailContainer/
    Toast/
    ProtectedRoute/
    adminComponents/
      AdminLayout/
      ProductFormContainer/

  context/
    CartContext.jsx
    AuthContext.jsx

  services/
    products.js       # llamadas a MockAPI
    uploadImage.js    # integración con ImgBB

  utils/
    assetPath.js      # helper para paths (GitHub Pages, etc.)
    format.js         # helpers de formato (ARS, normalización)
    validateProduct.js

  App.jsx
  main.jsx

public/
  images/             # imágenes de productos
  logo-VolleyballArt.png
```

> La estructura real puede tener más archivos, pero esta es la idea general.

---

## 🌐 API de productos (MockAPI)

Los productos se obtienen desde MockAPI:

```txt
https://6939fa0fc8d59937aa097e6b.mockapi.io/products
```

Ejemplo de producto:

```json
{
  "id": "1",
  "name": "Camiseta ISHIKAWA SIR PERUGiA temporada 2024-25",
  "price": 18999,
  "category": "camisetas-de-juego",
  "description": "Tené la Camiseta de Yuki Ishikawa en el SIR PERUGIA de Italia. Modelo utilizado para los partidos oficiales",
  "imageUrl": "/images/Camiseta-ISHIKAWA-SIR-PERUGiA-temporada-2024-25.webp"
}
```

* `category` se usa para las rutas:

  * `/category/camisetas-de-juego`
  * `/category/pelotas`
  * `/category/camperas-y-buzos`
  * `/category/accesorios`

* `imageUrl` puede apuntar a:

  * Un archivo de `/public/images`.
  * Una URL externa generada por ImgBB.

La lógica de acceso está encapsulada en `src/services/products.js`:

* `getProducts(categoryId?)` – lista filtrada o completa.
* `getProductById(id)` – detalle.
* `createProduct(payload)` – alta de producto desde el panel admin.

---

## 📸 Subida de imágenes (ImgBB)

Para subir imágenes desde el admin se usa el servicio de ImgBB.

En `src/services/uploadImage.js` se utiliza la variable de entorno:

```txt
VITE_IMGBB_API_KEY
```

Configuración:

1. Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_IMGBB_API_KEY=TU_API_KEY_DE_IMGBB
```

2. Reiniciar el servidor de Vite para que tome el valor.

Si no se configura la API key, el formulario permite usar únicamente URLs manuales como `imageUrl`.

---

## 🧭 Rutas principales

* `/` – Home, catálogo completo.
* `/category/:categoryId` – Listado filtrado por categoría.
* `/detail/:id` – Detalle de producto.
* `/cart` – Carrito de compras.
* `/login` – Pantalla de login.
* `/admin/highqualityproducts` – Panel de alta de productos (**ruta protegida**).

---

## 💻 Requisitos

* Node.js **>= 18**
* npm (o pnpm / yarn, según prefieras)

---

## 🚀 Cómo ejecutar el proyecto

1. **Clonar el repositorio**

```bash
git clone https://github.com/usuario/mi-repo-VolleyballArt.git
cd mi-repo-VolleyballArt
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno (opcional pero recomendado)**

Crear `.env`:

```env
VITE_IMGBB_API_KEY=TU_API_KEY_DE_IMGBB
```

4. **Levantar en modo desarrollo**

```bash
npm run dev
```

Abrir la URL que indique Vite (generalmente `http://localhost:5173/`).

5. **Build de producción**

```bash
npm run build
```

6. **Probar el build**

```bash
npm run preview
```

---

## ✅ Relación con las consignas del TP de React

Este proyecto cubre los puntos solicitados en el trabajo práctico:

* Uso de **Vite + React** con componentes funcionales.
* Navegación con **React Router** y rutas dinámicas.
* Componentes de lista (`ItemList`) y detalle (`ItemDetail`).
* Manejo de estado con hooks: `useState`, `useEffect`, `useContext`.
* Consumo de datos desde una **API externa (MockAPI)**.
* Implementación de un **carrito de compras** con estado global.
* **Rutas protegidas** y login simulado con Context + localStorage.
* Estilos personalizados (CSS) y diseño responsive.
* Sección extra de **administración de productos** (bonus sobre la consigna).

---

## 👨‍💻 Autor

Proyecto desarrollado por **Dario Asurey** ([@Dasurey](https://github.com/Dasurey))
como entrega final del curso **Desarrollo Frontend con JavaScript – Talento Tech**.

🏐 ¡Gracias por visitar VolleyballArt!
