import express  from 'express';
import cors from "./src/middlewares/corsMiddlewares"
import routes from "./src/routes"
import {init} from "./src/services/serviceLocator/composer"

const server = express();
server.use(express.json());

init();

server.use(cors)
routes(server)


server.listen(9000, function(){
    //callback
    console.log('Servidor iniciado en el puerto 9000');
})

