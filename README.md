# Phong's Boilerplate for Backend Apps

# TODO
- [x] ~Add build script~
- [x] ~Add Dockerfile~
- [ ] ~Add a watch script for dev~ not needed, vite-node has HMR
- [ ] Add CircleCI config
- [ ] Try to reduce Docker image size
  - Read:
    - https://odino.org/minimal-docker-run-your-nodejs-app-in-25mb-of-an-image/
    - https://learnk8s.io/blog/smaller-docker-images

# Stack
- TypeScript
- PNPM (but you can use whatever)
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

## Node
```
pnpm i
pnpm dev
```

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
