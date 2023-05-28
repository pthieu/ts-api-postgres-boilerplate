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
- [ ] Add pagination example
- [ ] Add login with google example and middleware for role auth
- [x] Move to Drizzle ORM
  - [ ] copy all migrations and metadata over on build
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
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
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
pnpm migrate:generate
pnpm dev
```

## Database

We're using [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) because they're a lightweight wrapper on top of SQL. They abstract away a lot of boilerplate connecting Typescript to SQL without getting in your way and they don't compromise on technical decisions by trying to support other languages (unlike a certain other popular ORM).

The thing about Schema-first Typescript ORMs is that most of them require the migrations to happen at the application level to reduce risks associate d with schema drift (time between the DB schema changing and application code chainging) and because the library doesn't know your compilation strategy. You can probably pull it out into its own `.ts` script and import the `config`, but the build steps will have to change a bit.

Specific to Drizzle though, we need to commit the `meta` metadata folder. They haven't documented why but they've confirmed to do this on Discord. In a multi-dev project, you can run the `pnpm migrate:check` command to see if your migrations are in sync.

to be written:
- esbuild transpile and copy
- Drizzle db lock, guaranteed to run

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
