<div align="center">

# MovieWatch Plus

Search movies and build your personal watchlist with a clean, modern UI.

</div>

## ✨ Features

- Fast search powered by OMDb API (with input debouncing)
- Responsive grid layout (mobile → desktop)
- Add/remove movies to your watchlist (stored in localStorage)
- Filter by minimum release year
- Polished dark theme with accessible focus states
- Loading, error, and empty states handled gracefully

## 🧰 Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (via @tailwindcss/vite)
- ESLint (flat config) with React + TypeScript rules

## 🚀 Getting Started

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open the URL shown in the terminal (default http://localhost:5173/).

3. Build for production

```powershell
npm run build
```

4. Preview the production build (optional)

```powershell
npm run preview
```

## 🗂️ Project Structure

```
moviewatch-plus/
├─ public/
├─ src/
│  ├─ features/
│  │  ├─ app/AppContent.tsx
│  │  ├─ context/
│  │  │  ├─ MovieContext.ts
│  │  │  ├─ MovieProvider.tsx
│  │  │  ├─ MovieTypes.ts
│  │  │  └─ useMoviesContext.ts
│  │  └─ movies/
│  │     ├─ MovieItem.tsx
│  │     ├─ MovieList.tsx
│  │     ├─ Watchlist.tsx
│  │     └─ useFetchMovies.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ vite.config.ts
└─ package.json
```

## 🧪 Useful Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`

MIT License
