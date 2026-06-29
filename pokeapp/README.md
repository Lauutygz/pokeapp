# PokéApp — Explorador Pokémon

Aplicación web construida con **React + Vite** que consume la [PokéAPI](https://pokeapi.co/) para explorar y buscar Pokémon de todas las generaciones.

## Funcionalidades

- **Listado paginado** de Pokémon (20 por página, 1000+ en total)
- **Búsqueda en tiempo real** por nombre o número
- **Cards** con mínimo 4 datos: tipo(s), altura, peso, HP y experiencia base
- **Página de detalle** con estadísticas base, habilidades, movimientos, sprites normal y shiny
- **Manejo de errores** con mensajes descriptivos
- **Página 404** personalizada
- Diseño **responsive** y accesible

## Tecnologías

- React 18
- Vite 5
- React Router DOM 6
- Fetch API
- CSS Modules

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd pokeapp

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── ErrorMessage.jsx / .module.css
│   ├── Loader.jsx / .module.css
│   ├── Navbar.jsx / .module.css
│   ├── Pagination.jsx / .module.css
│   ├── PokemonCard.jsx / .module.css
│   ├── SearchBar.jsx / .module.css
│   └── StatBar.jsx / .module.css
├── hooks/
│   └── usePokemon.js
├── pages/
│   ├── Home.jsx / .module.css
│   ├── NotFound.jsx / .module.css
│   └── PokemonDetail.jsx / .module.css
├── styles/
│   └── global.css
├── utils/
│   └── pokemon.js
├── App.jsx
└── main.jsx
```

## API utilizada

[PokéAPI](https://pokeapi.co/) — API REST pública y gratuita con datos completos de todos los Pokémon.

Endpoints principales:
- `GET /pokemon?limit=20&offset=N` — listado paginado
- `GET /pokemon/{name}` — detalle de un Pokémon
- `GET /pokemon-species/{name}` — especie (descripción, generación, hábitat)
