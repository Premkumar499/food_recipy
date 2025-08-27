# Repository Overview

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Bundler/Dev Server**: Vite
- **UI/Styling**: Tailwind CSS, Framer Motion
- **Routing**: react-router-dom (SPA)

## Project Structure (key files)
- **Entry**: `src/main.tsx`, `src/App.tsx`
- **Pages**: `src/pages/*`
- **Components**: `src/components/*`
- **API Config**: `src/config/api.ts`
- **Static data**: `public/recipes.json`
- **Build output**: `dist/`

## Scripts (package.json)
- **dev**: `vite`
- **build**: `tsc && vite build`
- **preview**: `vite preview`
- **lint**: ESLint config present
- **server**: `json-server --watch db.json --port 3002` (local dev data API)
- **vercel-build**: `npm run build`

## Data/API Behavior
- **Dev**: Uses `VITE_API_URL` if set; otherwise `window.location.origin`. Endpoints like `/recipes` via `json-server`.
- **Prod**: Falls back to static `recipes.json` bundled in `dist/`.
- **Env file**: `.env` can define `VITE_API_URL` for build-time.

## Deployment
- **Vercel**: Configured via `vercel.json` using `@vercel/static-build` with `distDir: dist`. SPA routing rewrite to `/index.html` is included.
- **Netlify**: `netlify.toml` present; SPA `_redirects` in `public/` and copied to `dist/`.
- **GitHub Actions/Pages**: Workflow present in `.github/workflows/deploy.yml` (if enabled).

## Local Development
1. `npm install`
2. In one terminal: `npm run server` (starts JSON Server at http://localhost:3002)
3. In another: `npm run dev` (starts Vite dev server)
4. App will fetch recipes from `/recipes` in dev; in prod it reads `/recipes.json`.

## Notes
- **SPA routing**: Ensure host rewrites all routes to `index.html` (Vercel + Netlify are configured).
- **Images/Assets**: Stored in `public/images/*` and copied to `dist/`.
- **Node version**: Not pinned in `package.json`.