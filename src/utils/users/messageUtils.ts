import { Connection } from 'mysql2/promise';
import { NewMessages } from '../../interfaces/utils/message/messageUtilsInterface';
import CryptoJS from 'crypto-js';
import message from '../../controllers/message';

export class MessageUtils{
    private databaseConexion: Connection;
    
    
    constructor(db: Connection){
        this.databaseConexion = db;
    }

    async getMessage(): Promise<any> {
        const query = "SELECT * FROM messages"
        const [rows] = await this.databaseConexion.query(query)
        return rows
    }


async getMessageBychat_id(chat_id: string): Promise<any>{
    const preparedQuery = "SELECT * FROM messages WHERE chat_id =?";
    const [rows] =await this.databaseConexion.query(preparedQuery, [chat_id])
    return rows;
}



async createMessage(params: NewMessages){
    const{
        id,
        chat_id,
        message,
        type,
        sendedAt
    } = params;
    console.log(params);
    const messages = await this.getMessageBychat_id(id);
    if (messages.length > 0){
        return Promise.reject('No se envio mensaje');
    }
    const preparedQuery = "INSERT INTO messages (chat_id, message, type, sendedAt) VALUES (?, ?, ?, ?)";
    const [rows] =await this.databaseConexion.query(preparedQuery, [chat_id, message, type, sendedAt])
    return rows;
}}