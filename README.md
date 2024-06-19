## Instalación del servidor

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Llenar la base de datos con la semilla `npm run seed`
5. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

## Opcional
Entrar a la bash de docker

```
  docker exec -it ContenedorRestaurant bash
```