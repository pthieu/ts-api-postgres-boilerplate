# Boilerplate for Backend API's


# TODO
- [ ] Add build script
- [ ] Add Dockerfile
- [ ] Add a watch script for dev

# Stack
- TS
- Vite-node for local dev
- Express.js & express-promise-router
- ESLint + Prettier
- Absolute imports
- Opinionated folder structure



# File Structure
```
.
├── README.md
├── package.json
├── .gitignore, .eslintrc.js, tsconfig, vite.config.ts
├── src
│   ├── app.ts
│   ├── config
│   │   ├── config.ts
│   │   └── index.ts

│   ├── controllers
│   │   └── index.ts
│   ├── index.ts
│   ├── middlewares
│   │   ├── errorHandlers.ts
│   │   ├── index.ts
│   │   └── logger.ts
│   ├── routes
│   │   ├── index.ts
│   │   └── v1
│   │       ├── index.ts
│   │       └── user.ts
│   ├── services
│   │   └── index.ts
│   └── utils
│       ├── index.ts
│       └── logger.ts
├── tsconfig.json
└── yarn.lock
```

# Setup

