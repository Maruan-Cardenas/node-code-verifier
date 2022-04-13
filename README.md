Dependencias del proyecto:

- dependencias de producción:

  - dotenv: sirve para poder acceder fácilmente a los archivos .env y poder utilizar así las variables de entorno
  - express: es un framework de Node js, que nos permite gestionar rutas, sesiones, cookies, etc...
  - cors: sirve para la confirguración de cors que nos permite restringir los recursos solicitados.
  - helmet: Sirve para proteger la aplicación de algunas vulnerabilidades web
  - swagger: sirve para generar documentación de nuestro código
  - tsoa: siver para utilizar swagger con typescript y poder documentar nuestro código mediante anotaciones
  - bcrypt: Se utiliza para cifrar la contraseña proporcionada por el usuario
  - bcryptjs:
  - jsonwebtoken:

- dependencias de desarrollo:
  - TypeScript: es un superset de JavaScript, que nos ayuda a evitar errores al programar, ya que nos permite definir las variables que vamos a utilizar
  - webpack: nos permite hacer un mejor empaquetamiento de nuestra aplicación
  - nodemon: Sirve para que el servidor se reinicie cada vez que efectuamos un cambio en el código, sin tener que estar nosotros parandolo y arrancandolo con cada cambio
  - Jest: sirve para hacer testing a nuestra aplicación

Scripts de NPM utilizados:

- build: con este script podremos crear la build de la aplicación
- start: con este comando lanzaremos la aplicación que hemos buildeado
- dev: con este comando lanzaremos varias acciones a la vez, para buidear y ejecutar el código al mismo tiempo, y manteniendose a al escucha para que con cada cambio ejecute el buideo y el reinicio del servidor automáticamente.
- test: sirve para lanzar los test que hayamos definido en la carpeta **test**
- serve: con este comando pasaremos los test y ejecutaremos serve
- swagger: ejecuta swagger para generar la documentación del proyecto

Variables de entorno necesarias:

- PORT es necesario especificar el número al que queremos asignar el puerto de nuestro localhost donde se va a ejecutar el servidor al lanzar la aplicación ejemplo: PORT=3000
