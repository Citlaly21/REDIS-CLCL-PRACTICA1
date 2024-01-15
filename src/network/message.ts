import express, {Request, Response } from 'express';
import Controller from '../controllers/message';
import { getMessageUtils } from '../services/serviceLocator/composer';

const  router = express.Router();

async function getMessage(request: Request, response: Response){
    const result = await Controller.getMessage();
    console.log (result);
    response.send(result);  
}


function getMessageBychat_id(request: Request, response: Response){
    const chat_id = request.params.chat_id;
    Controller.getMessageBychat_id(chat_id)
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

function getMessageById(request: Request, response: Response){
    const id = request.params.id;
    Controller.getMessageById(id)
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


function createMessage(request: Request, response: Response){
    const{
        id,
        chat_id,
        message,
        type,
        sendedAt,
    } = request.body;
    Controller.createMessage({
        id,
        chat_id,
        message,
        type,
        sendedAt,
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


router.get('/', getMessage);
router.get('/chat_id/:chat_id', getMessageBychat_id);
router.get('/id/:id', getMessageById)
router.post('/', createMessage)

export default router;
