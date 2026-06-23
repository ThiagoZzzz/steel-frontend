# 1: build (compilación de archivos estáticos)

FROM dhi.io/node:24-alpine3.22-dev AS build
WORKDIR /usr/src/app

# declarar argumentos para Vite y convertir en variable de entorno
ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

# copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# copiar resto del código fuente
COPY . .

# ejecutar compilación de Vite
RUN npm run build

# 2: runner (servidor web de producción)
# NGINX unprivileged para correr como non-root
FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS runner

# copiar configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copiar archivos estáticos compilados desde la etapa anterior
# al directorio por defecto que sirve NGINX
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# exponer el puerto configurado en nginx.conf
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]