# Phong's Boilerplate for Backend Apps

# TODO
- [ ] Get vite-node HMR to work
- [ ] Add testing framework and unit test
- [ ] Add db config and singleton
- [ ] Add user model
- [ ] Look into auth middleware, how to show as an example
- [ ] Explain local dev vs. production migrations and decision
- [ ] Explain /lib folder and why db has a dedicated lib
- [ ] Figure out way to build and push image as a demo (say to ECR)
- [ ] Try to reduce Docker image size
  - Read:
    - https://odino.org/minimal-docker-run-your-nodejs-app-in-25mb-of-an-image/
    - https://learnk8s.io/blog/smaller-docker-images
- [ ] Add a logger lib to add timestamps
- [x] Add build script
- [x] Add Dockerfile
- [x] Add CircleCI config
- [x] Add db query builder or ORM + 1 migration
- [x] Figure out how to handle migrations:up and :down
- [x] Figure out how to run migration in production
- [x] Add database connection in migrations

# Stack
- TypeScript
- ESLint + Prettier
- Absolute imports
- Express.js
- [Kysely](https://github.com/kysely-org/kysely) (query builder)
- [Vite](https://github.com/vitejs/vite) + [vite-node](https://github.com/vitest-dev/vitest/tree/main/packages/vite-node#readme) for local dev (with HMR) -- remove this once `tsx` has HMR
- [ESBuild](https://esbuild.github.io/) (handles DB migration scripts too)
- Docker
- CircleCI
- [PNPM](https://pnpm.io/) (mostly for Docker, you can use whatever)


# File Structure
```
.
├── README.md
├── package.json, pnpm-lock.yaml, esbuild.mjs
├── .gitignore, .eslintrc.js, tsconfig.json, vite.config.ts
├── .env*
├── scripts/
├── src/
│   ├── index.ts - entry point
│   ├── app.ts - express app
│   ├── config.ts - global config with cloud override
│   ├── db/
│   │   └── migrations/
│   ├── api/
│   │   └── route/
│   │       ├── index.ts - route path definitions
│   │       ├── controller.ts - route handlers
│   │       └── model.ts - Objection.js model
│   ├── types/
│   │   └── index.ts - all types here unless domain-specific or app gets large
│   ├── lib
│   │   └── domain.ts - i.e. utils, user, auth, etc.
│   └── services
│       └── domain.ts - i.e. openai, pinecone, google, etc.
└── Dockerfile, .dockerignore
```

# Setup

## Node
```
pnpm i
pnpm dev
pn migrate:latest
```

## Database

to be written:
- migratetion scripts vs lib
- choice of kysely
- esbuild transpile and copy
- kysely db lock, guaranteed to run

## Environment Variables
TBD:
- local .env
- .env.example
- cloud override consideration


## Docker
```
docker build -t ts-api .
docker run -p 9000:80 --name ts-api ts-api
```

## VSCode
Debug with this `launch.json`
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "pnpm dev",
      "name": "Debug",
      "request": "launch",
      "type": "node-terminal"
    }
  ]
}
```
