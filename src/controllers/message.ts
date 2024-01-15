import { getMessageUtils } from "../services/serviceLocator/composer";
import { NewMessages } from "../interfaces/utils/message/messageUtilsInterface";
import { getMessagesUtils } from "../services/serviceLocator/composer";

function getMessage(){
    const messageUtils= getMessageUtils();
    return messageUtils.getMessage();
}
function createMessage(params: NewMessages){
    const messageUtils = getMessagesUtils();
    return messageUtils.createMessage(params);
}

function getMessageById(id: string){
    const messageUtils = getMessageUtils();
    return messageUtils.getMessageById(id)
}


function getMessageBychat_id(chat_id: string){
    const messageUtils = getMessageUtils();
    return messageUtils.getUsersBychat_id(chat_id)
}
export default {
    createMessage,
    getMessageById,
    getMessageBychat_id,
    getMessage
}