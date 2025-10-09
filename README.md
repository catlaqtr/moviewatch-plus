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

## 🔑 Environment

This project uses OMDb (demo key included in the code for convenience). For your own key:

1. Get a free API key: http://www.omdbapi.com/apikey.aspx
2. Replace the key in `src/features/movies/useFetchMovies.ts`.

## 🧪 Useful Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint: `npm run lint`

## 🛟 Troubleshooting

- “No CSS” or styles look missing in dev:

  - Ensure `src/index.css` starts with `@import "tailwindcss";`
  - Stop and restart the dev server after changing Tailwind-related files.
  - Verify `vite.config.ts` includes `@tailwindcss/vite` in `plugins`.

- Icons/emoji not rendering correctly:

  - Windows Terminal/PowerShell fonts may vary; switch to a font with full emoji support.

- CORS/network or empty results:
  - OMDb free tier can rate-limit; try again or use your own key.

## 📸 Screenshots

Add screenshots to the `public/` folder and link them here.

---

MIT License
