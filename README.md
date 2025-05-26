# AppMovies

AppMovies es una aplicación móvil desarrollada con React Native CLI para explorar información de películas usando la API de TMDb (The Movie Database). Permite:

- Ver secciones de películas: Populares, Mejor valoradas y Cartelera.
- Buscar películas por letra inicial y aplicar filtros de género y reparto.
- Ver detalles de cada película con sinopsis, reparto y más.
- Marcar películas en una lista "Por ver" (watchlist) con persistencia local (Zustand + persist).

---

## 📂 Estructura del proyecto

```text
AppMovies/
├─ android/                 # Código nativo Android
├─ ios/                     # Código nativo iOS
├─ src/
│  ├─ actions/              # Llamadas a TMDb (get-movies, get-movie-by-id, get-movie-cast)
│  ├─ config/
│  │  ├─ api/               # Instancia de Axios y configuración de base URL
│  │  └─ helpers/           # Helpers y utilidades (formatter, etc.)
│  ├─ domain/
│  │  ├─ entities/          # Definición de entidades (MovieListEntity, MovieDetailEntity, MovieCastEntity)
│  │  └─ types/             # Tipos del dominio (MovieCategory)
│  ├─ infrastructure/
│  │  ├─ interfaces/        # DTOs de respuesta de la API de TMDb
│  │  └─ mappers/           # Mappers de interfaces a entidades de dominio
│  ├─ presentation/
│  │  ├─ components/        # Componentes genéricos (MovieCard, HorizontalCarousel, FadeInImage, etc.)
│  │  ├─ hooks/             # Custom hooks (useMoviesInfinite, useMovieDetails)
│  │  ├─ navigation/        # React Navigation (RootStackParams, Stack.Navigator)
│  │  ├─ screens/           # Pantallas (MoviesScreen, MovieScreen, SearchScreen, WatchlistScreen)
│  │  └─ ui/                # Componentes UI específicos (BackButton, loaders)
│  ├─ store/                # Zustand store (searchTerm y watchlist)
│  └─ types/                # Tipos compartidos para presentación (si los hay)
├─ .env                     # Variables de entorno (API_KEY de TMDb)
├─ .eslintrc.js             # Configuración de ESLint
├─ babel.config.js          # Configuración de Babel
├─ tsconfig.json            # Configuración de TypeScript
├─ package.json             # Dependencias y scripts
└─ README.md                # Documentación del proyecto
```

---

## 🛠️ Tecnologías

- **React Native** 0.79.2 (CLI)
- **TypeScript** 5.0.4
- **React Navigation** (stack)
- **React Query** (@tanstack/react-query)
- **Zustand** + middleware `persist`
- **Axios** para HTTP
- **react-native-paper** para componentes UI base
- **react-native-vector-icons** para iconografía

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repo> AppMovies
   cd AppMovies
   ```

2. Instalar dependencias:

   ```bash
   yarn install
   # o npm install
   ```

3. Crear archivo `.env` en la raíz con tu API Key de TMDb:

   ```env
   MOVIE_DB_API_KEY=tu_api_key_aquí
   ```

4. Ejecutar en Android o iOS:

   ```bash
   yarn start      # Inicia Metro Bundler
   yarn android    # Lanza en emulador/dispositivo Android
   yarn ios        # Lanza en simulador iOS
   ```

5. Lintear y testear:

   ```bash
   yarn lint
   yarn test
   ```

---

## 📐 Scripts disponibles

| Script         | Descripción                |
| -------------- | -------------------------- |
| `yarn start`   | Inicia Metro Bundler       |
| `yarn android` | Compila y lanza en Android |
| `yarn ios`     | Compila y lanza en iOS     |
| `yarn lint`    | Corre ESLint               |
| `yarn test`    | Ejecuta tests con Jest     |

---

## 🔒 Variables de entorno

| Variable           | Descripción     |
| ------------------ | --------------- |
| `MOVIE_DB_API_KEY` | API Key de TMDb |

Asegúrate de no commitear tu `.env` a Git.

---

## 📈 Arquitectura y flujo de datos

1. **Acciones (`src/actions`)**: usan Axios para llamar a endpoints de TMDb y devuelven DTOs.
2. **Mappers (`src/infrastructure`)**: traducen la respuesta de la API a entidades de dominio (`MovieListEntity`, `MovieDetailEntity`).
3. **Hooks (`src/hooks`)**: encapsulan la lógica de `useInfiniteQuery` y `useQuery` (React Query) para fetching y cache.
4. **Store (`src/store`)**: Zustand maneja el estado global (término de búsqueda y watchlist) con persistencia.
5. **Presentación (`src/presentation`)**: pantallas y componentes reutilizables, navegación stack y UI.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Haz un fork.
2. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`.
3. Haz commit de tus cambios: `git commit -m 'Agrega feature X'`.
4. Push a la rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Revisa el archivo `LICENSE` para más detalles.
