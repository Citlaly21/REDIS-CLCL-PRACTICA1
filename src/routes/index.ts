import { Application } from "express";
import Routes from "../utils/constants/routes.json"
import UserNetwork from "../network/user"
import MessageNetwork from "../network/message"

function routes (server: Application){
        server.use(Routes.user, UserNetwork)
        server.use(Routes.message, MessageNetwork )
}

export default routes