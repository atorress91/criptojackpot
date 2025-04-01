# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Instalamos TODAS las dependencias para poder compilar
RUN npm ci

# Copiar el resto del código
COPY . .

# Compilamos la app de Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

WORKDIR /app

# Solo copiamos dependencias necesarias
COPY --from=builder /app/node_modules ./node_modules

# Copiamos solo los archivos necesarios para producción
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Exponemos el puerto que usa Next.js
EXPOSE 3000

# Comando para producción
CMD ["npm", "start"]
