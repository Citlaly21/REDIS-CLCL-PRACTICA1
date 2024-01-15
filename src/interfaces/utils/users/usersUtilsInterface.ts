import {Connection} from 'mysql2/promise';

export interface MysqlQuery{
    rows: Array<any>;
    fields: Array <any>;
}

export type NewUserFields = {
    names: string;
    lastNames: string;
    email: string;
    password: string;
}

export type UpdateUserFields ={
    names: string;
    lastNames: string;
    email: string;
    password: string;
    id: string;
}

export type PatchUser = {
    names: string;
    lastNames: string;
    email: string;
    password: string
    id: string;
}

export interface UsersUtilsInterface{
    
    getUsers(): Promise<any>;
    
    getUsersById(id: string): Promise<any>;
    createUser(params: NewUserFields);
    updateUser(params: UpdateUserFields);
    patchUser(params: PatchUser);
}