# INP Sante Frontend

This project is a React + Vite frontend for the INP healthcare application.
It contains authentication, administration, patient-related modules, consultation-related modules, pharmacy/stock screens, and shared UI building blocks.

This README is written as a beginner-friendly guide so you can come back later and quickly understand how the project is organized.

## 1. What this project uses

- React 18 for the user interface.
- Vite for local development and production builds.
- React Router for page navigation.
- TanStack React Query for server state, caching, and async requests.
- Axios for HTTP calls to the backend API.
- Styled Components and global CSS for styling.
- React Hook Form for forms.
- React Hot Toast for notifications.
- React Error Boundary for top-level crash handling.
- React Icons for icon sets.
- Recharts for charts and dashboards.
- React Select for richer select inputs.
- TanStack React Table for table logic.
- dnd-kit for drag-and-drop features.
- date-fns for date utilities.
- clsx for conditional class names.

Also present in the project:

- Supabase client dependency exists in the project, but the current application flow is mainly centered around the API services in `src/api` and `src/services`.
- Tailwind CSS is installed in `package.json`, but the current codebase is still largely structured around existing CSS and Styled Components patterns.

## 2. Project setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## 3. Environment variable

The frontend API base URL is read from a root `.env` file.

Create a `.env` file at the root of the project and define:

```env
VITE_API_URL=http://your-backend-url-here
```

Important notes:

- The application reads this value in `src/api/client.js`.
- The expected variable name is `VITE_API_URL`.
- No `.env` file is currently committed in the repository, so you need to create it locally before running the app against a backend.

## 4. How the app starts

### `src/main.jsx`

This is the real entry point of the frontend.
It:

- mounts React into the DOM,
- loads the global stylesheet,
- wraps the app in a top-level error boundary,
- redirects to `/` if an unrecoverable UI error happens.

### `src/App.jsx`

This is the main application shell.
It:

- creates and provides the React Query client,
- enables React Query Devtools,
- wraps the app with the dark mode context,
- defines the router,
- protects private routes with `ProtectedRoute`,
- renders the global toast notifications.

If you want to understand the overall navigation of the app, `src/App.jsx` is the first file to read.

## 5. Folder guide for `src`

### `src/api`

Central API layer.

- `client.js`: configures Axios, reads `VITE_API_URL`, attaches authentication tokens, and handles API responses/errors.
- `endpoints.js`: stores backend route constants in one place.

If you need to change a backend URL or add a new endpoint, start here.

### `src/context`

Application-wide React contexts.

- `DarkModeContext.jsx`: manages light/dark mode state and saves the preference in local storage.

### `src/data`

Obsolete folder.

These files are leftovers from an older imported project and are not the main source of truth for the current application.
Treat this folder as legacy unless you confirm a file is still actively used.

### `src/features`

Feature-level components used to build the real business screens.

This folder groups reusable domain UI by area, such as:

- administration,
- authentication,
- bookings,
- check-in/out,
- consultations,
- dashboard,
- grossesse,
- patient,
- pharmacie,
- settings,
- table,
- type.

In practice, `features` contains the pieces that implement each business module.

### `src/pages`

Route-level pages.

This is where feature components are assembled into screens that are mounted by the router.
When a route is declared in `src/App.jsx`, it usually points to a file in `src/pages`.

Examples:

- `Dashboard.jsx` for the dashboard route.
- `Patients.jsx` for patient-related screen assembly.
- `Roles.jsx` and `Permissions.jsx` for administration pages.

### `src/services`

Backend service layer.

This folder contains the functions that talk to the API and expose reusable CRUD-style operations to the rest of the app.

Important files:

- `createCrudService.js`: generic helper for standard API CRUD behavior.
- `inphbIndex.js`: central export file for many domain services.
- `inphbAuthService.js`, `inphbUserService.js`, `inphbPatientsService.js`, and similar files: domain-specific service modules.

If `src/api` defines the HTTP client and endpoint constants, `src/services` is where those pieces are turned into actual business operations.

### `src/hooks`

Custom React hooks and reusable data-access helpers.

Important files:

- `createCrudHooks.js`: generic hook factory for CRUD modules.
- `hookIndex.js`: central export file for entity hooks.
- `useLocalStorageState.js`: reusable local storage state hook.
- `useMoveBack.js` and `useOutsideClick.js`: small UI/navigation helper hooks.

### `src/ui`

Shared presentational and layout components.

This folder contains reusable building blocks such as:

- layout components,
- buttons,
- forms,
- modals,
- tables,
- nav components,
- spinners,
- shared screen structure.

Examples include `AppLayout`, `Sidebar`, `Header`, `Modal`, `Table`, `Form`, and `ProtectedRoute`.

### `src/styles`

Global styling files.

This folder contains global CSS and styling-related setup used across the application.

### `src/utils`

Small utility helpers and constants shared across the codebase.

## 6. Current project state

The project is still in development.
Some routes and components are functional, while others are placeholders, inherited leftovers, or partially integrated screens.

The following areas should currently be treated as incomplete or placeholder/legacy work:

- Booking
- Checkin
- Cabins
- ListUsers
- Settings
- Account
- Table
- DragDrop
- Calc
- Calcul

When working on one of these areas, verify the current behavior before building on top of it.

## 7. Reading the project for the first time

If you are coming back to this code later, this is a practical order to read it:

1. `package.json` to see scripts and libraries.
2. `src/main.jsx` to understand app bootstrapping.
3. `src/App.jsx` to understand routing and providers.
4. `src/api/client.js` and `src/api/endpoints.js` to understand backend communication.
5. `src/services/inphbIndex.js` and related service files to understand business data access.
6. `src/pages` to see route-level screens.
7. `src/features` to inspect actual feature components.
8. `src/ui` for shared reusable components.

## 8. Quick mental model

You can think about the app in this order:

1. `main.jsx` starts React.
2. `App.jsx` sets up providers, routing, protection, and notifications.
3. `pages` define the screens for routes.
4. `features` provide the domain-specific UI pieces used inside pages.
5. `services` perform business API operations.
6. `api/client.js` sends the HTTP requests.

That flow is usually the easiest way to debug or extend the project.
