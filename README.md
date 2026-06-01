## Project: Pexels Image Gallery

This project is an image gallery application that fetches images from pexels.com. It features infinite scrolling and allows users to search for images based on the object in the picture (e.g., typing "cat" displays images of cats). The application was built using the following technologies and tools:

### 1. **Framework and Core**

- **NextJS**: A React framework that provides server-side rendering and static site generation, enhancing performance and SEO.
- **TypeScript**: A statically typed superset of JavaScript that enhances code quality and maintainability.

### 2. **Styling**

- **Tailwind CSS**: A utility-first CSS framework that enables the creation of responsive and custom designs efficiently.

### 3. **Validation and Data Handling**

- **zod**: A TypeScript-first schema declaration and validation library used to ensure the correctness of data throughout the application.
  - <a href="https://github.com/colinhacks/zod" target="_blank">Learn more about zod</a>
- **plaiceholder**: A library for generating low-quality image placeholders, improving the user experience by providing a preview while images load.
  - <a href="https://plaiceholder.co/" target="_blank">Learn more about plaiceholder</a>
- **envalid**: A library for validating environment variables to ensure the application configuration is correct and secure.
  - <a href="https://github.com/af/envalid" target="_blank">Learn more about envalid</a>

### 4. **Image Fetching and Search**

- **Pexels API**: Used to fetch images from pexels.com, allowing users to browse a wide range of high-quality photos.
  - <a href="https://www.pexels.com/api/" target="_blank">Learn more about Pexels API</a>

Each of these technologies plays a vital role in delivering a modern, efficient, and user-friendly image gallery application.

## Development

### Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and set your [Pexels API key](https://www.pexels.com/api/):
   ```bash
   cp .env.example .env.local
   ```
3. The app validates `NEXT_PUBLIC_PEXELS_API_KEY` on startup. Local development and production builds need this value to be set.

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run typecheck` | Run TypeScript validation (`tsc --noEmit`) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Production build (requires `.env.local`) |
| `npm run check` | Run typecheck, lint, test, and build |

### Runtime data flow

- `/` renders curated Pexels photos through the server component at `src/app/components/Gallery.tsx`.
- `/results/<query>` decodes the search query, redirects away from legacy page segments, and renders the same gallery component for that topic.
- `Gallery` builds the Pexels URL, fetches and validates the response with Zod, enriches each photo with a Plaiceholder blur data URL, and passes the initial payload to `GalleryInfiniteScroll`.
- `GalleryInfiniteScroll` uses an `IntersectionObserver` sentinel to call `GET /api/gallery?topic=<topic>&page=<page>` for additional pages.
- `src/app/api/gallery/route.ts` requires the `page` query parameter, reuses the same Pexels fetch/validation/blur helpers, and returns `{ photos, nextPage }`.

### Testing notes

- Vitest runs in a Node environment and includes `src/**/*.test.ts` and `src/**/*.test.tsx`.
- `vitest.config.ts` maps the `@` alias to `src`, matching the app source imports.
- Current coverage focuses on URL construction, page parsing, Pexels fetch handling, Plaiceholder enrichment, Zod image schema validation, and the gallery API route.

### Internal rollback helper

The Cursor skill at `.cursor/skills/pre-demo-rollback/` can reset a local checkout to the pre-demo baseline commit `f84c228`. Use it only when an operator explicitly asks for a pre-demo rollback or demo reset, and review uncommitted work before running the script.
