# args
ARG NODE_VERSION=20
ARG SERVER_PORT=4000

# Stage 1: Build stage
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /server

# Copy package files first - this is for Docker layer caching to speed up the build process
COPY package*.json ./ 

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production stage
FROM node:${NODE_VERSION}-alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /server/dist ./dist

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

USER nodejs

EXPOSE ${SERVER_PORT}

CMD ["node", "dist/index.js"]