//va agregar y obtener el objeto que se va a crear en locatot
import {Connection} from "mysql2/promise"
import { DependencyLocator } from "./dependenciesLocator";
import dbService from "../database/database.service";
import { UsersUtils } from "../../utils/users/usersUtils";
import { UsersUtilsInterface } from "../../interfaces/utils/users/usersUtilsInterface";
import {messageUtilsInterface} from "../../interfaces/utils/message/messageUtilsInterface";
import {MessageUtils} from "../../utils/users/messageUtils";


export const di = DependencyLocator.getInstance();

const types ={
    database: "database",
    usersUtils: "UsersUtils",
    messageUtils: "MessageUtils"
}

export async function init(){
    const db = await dbService;
    di.bindLazySingleton(types.database,  () => db);
    di.bindFactory(types.usersUtils , () => new UsersUtils(
        getDatabase() //inyeeccion de dependencias
    ))
    di.bindFactory(types.messageUtils , () => new MessageUtils(
        getDatabase()
    ))
}

function getDatabase(): Connection {
    return di.get(types.database)
}

export function getUsersUtils(): UsersUtilsInterface {
    return di.get(types.usersUtils)
}
export function getMessageUtils(): messageUtilsInterface {
    return di.get(types.messageUtils)
}
export function getMessagesUtils(): messageUtilsInterface {
    return di.get(types.messageUtils)
}