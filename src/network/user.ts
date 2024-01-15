import express, {Request, Response } from 'express';
import Controller from '../controllers/users';

const  router = express.Router();

async function getUsers(request: Request, response: Response){
    const result = await Controller.getUsers();
    console.log (result);
    response.send(result);  
}

function getUsersById(request: Request, response: Response){
    const id = request.params.id;
    Controller.getUsersById(id)
    .then(
        //se ejecuta cuando se resueve la promesa
        (result) => {
            response.status(200).send(result)
        }
    )
    .catch(
        //se ejecuta cuando falla la promesa
        (error) => {
            response.status(500).send(error.message)
        }
    )
    
}

function createUser(request: Request, response: Response){
    const{
        names,
        lastNames,
        email,
        password,
    } = request.body;
    Controller.createUser({
            names,
            lastNames,
            email,
            password,
    })
    .then(
        (result) => {
            response.status(200).send(result)
        }
    )
    .catch(
        (error) => response.status(500).send(error)
    )
}

function updateUser(request: Request, response: Response){
    const id= request.params.id;
    const {
        names,
        lastNames,
        email,
        password,
    } = request.body;
    Controller.updateUser({
        names,
        lastNames,
        email,
        password,
        id,
    })
    .then(
        (result) => {
            response.status(200).send(result)
        }
    )
    .catch(
        (error) => response.status(50).send(error)
    )    
    
}

function patchUser(request: Request, response: Response){
    const id= request.params.id;
    const {
        names,
        lastNames,
        email,
        password,
    } = request.body;
    Controller.patchUser({
        names,
        lastNames,
        email,
        password,
        id
        
    })
    .then(
        (result) => {
            response.status(200).send(result)
        }
    )
    .catch(
        (error) => response.status(50).send(error)
    )    
}

//tarea crear una nueva funcion en la capa de red, donde se actualice los datos que desees
//usando el metodo patch
router.get('/', getUsers);
router.get('/id/:id', getUsersById)
router.post('/', createUser)
router.put('/id/:id', updateUser)
router.patch('/id/:id', patchUser)

    
export default router;
