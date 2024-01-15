import {Connection} from 'mysql2/promise';


export interface MysqlQuery{
    rows: Array<any>;
    fields: Array <any>;
}

export type NewMessages = {
    id: string;
    chat_id: string;
    message: string;
    type: string;
    sendedAt: string;
}

export interface messageUtilsInterface{
    getMessage(): Promise<any>;
    getUsersBychat_id(chat_id: string): Promise<any>;
    createMessage(params: NewMessages);
    getMessageById(id: string): Promise<any>;
}