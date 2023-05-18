# Phong's Boilerplate for Backend Apps

# TODO
- [ ] Add build script
- [ ] Add Dockerfile
- [ ] Add a watch script for dev

# Stack
- TypeScript
- PNPM
- Docker
- Vite + vite-node for local dev (with HMR)
- ESBuild for production build
- ESLint + Prettier
- Absolute imports
- Express.js
- Objection.js + Knex for Postgres management


# File Structure
```
.
├── README.md
├── package.json
├── .gitignore, .eslintrc.js, tsconfig.json, vite.config.ts
├── pnpm-lock.yaml
├── src
│   ├── index.ts - entry point
│   ├── app.ts - express app
│   ├── config.ts
│   ├── api
│   │   └── route
│   │       ├── index.ts 
│   │       ├── model.ts - Objection.js model 
│   │       └── controller.ts
│   ├── types
│   ├── lib
│   │   └── name.ts
│   └── services
│       └── name.ts
└── Dockerfile
```

# Setup

