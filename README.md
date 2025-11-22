# ProfitAgent Admin

Admin interface for ProfitAgent built with Vite, React, and TypeScript. The project ships with Tailwind CSS, TanStack Router, and a collection of Radix UI-based components.

## Requirements

- Node.js 24
- npm 11 (bundled with node 24)

## Installation

```bash
npm install
```

## Environment configuration

Runtime API targets are provided through Vite environment variables. Create a `.env.local` (or .env) file (not committed to source control) with the backend URL you want to use during local development:

```bash
VITE_BACKEND_URL=https://api.example.com
```

You can create additional environment files such as `.env.development`, `.env.staging`, or `.env.production` to mirror the different backend environments you have available. Vite automatically loads the file that matches the current `NODE_ENV`/command.

## Running the app

- `npm run dev` – start the Vite dev server (defaults to http://localhost:5173)
- `npm run build` – type-check and build the production bundle into `dist/`
- `npm run preview` – serve the production build locally
- `npm run lint` – run ESLint with the project configuration

## Proxying backend environments in development

By default the frontend talks directly to `import.meta.env.VITE_BACKEND_URL`. If the remote backend enforces strict CORS rules or you want to easily switch between staging environments, you can proxy requests through the Vite dev server.

1. Point the environment variable at a relative path instead of an absolute URL:
   ```bash
   VITE_BACKEND_URL=/api
   ```
2. Add a proxy configuration in `vite.config.ts` under the `server` key:

   ```ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   // …

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         "/api": {
           target: "https://staging-api.profitagent.com",
           changeOrigin: true,
           secure: false, // set to true if the target has a valid certificate
           rewrite: (path) => path.replace(/^\/api/, ""),
         },
       },
     },
   });
   ```

3. Restart `npm run dev`. All client requests to `/api` will now be forwarded to the chosen backend. You can maintain multiple `.env.*` files (for example `.env.staging`, `.env.production`) to quickly swap between environments.

Remove the proxy (or adjust the environment variable back to an absolute URL) when creating production builds so that the frontend points directly at the deployed API.

## Tech stack highlights

- React 19 with the Vite 7 build toolchain
- TypeScript for static typing
- Shadcn as a design system
- TanStack for routing and querying
- Axios, React Hook Form, and Zod for data fetching, forms, and validation
- Tailwind CSS (via `@tailwindcss/vite`) for utility-first styling
- Radix UI primitives, shadcn/ui patterns, and lucide/tabler icons for the component system

## Deployment

Use `npm run build` to generate the static assets under `dist/`. Deploy the contents of that directory to your preferred static hosting provider and configure the backend URL environment variable appropriate to the target environment.

## Swagger UI

Swagger is accessible on ${VITE_BACKEND_URL}/docs
