import { getUsersUtils } from "../services/serviceLocator/composer";
import { NewUserFields } from "../interfaces/utils/users/usersUtilsInterface";
import { UpdateUserFields } from "../interfaces/utils/users/usersUtilsInterface";
import { PatchUser } from "../interfaces/utils/users/usersUtilsInterface";
function getUsers(){
    const usersUtils= getUsersUtils();
    return usersUtils.getUsers();
}

function getUsersById(id: string){
    const usersUtils = getUsersUtils();
    return usersUtils.getUsersById(id)
}

function createUser(params: NewUserFields){
    const usersUtils = getUsersUtils();
    return usersUtils.createUser(params);
}

function updateUser(params: UpdateUserFields){
    const usersUtils = getUsersUtils();
    return usersUtils.updateUser(params);
}

function patchUser(params: PatchUser){
    const usersUtils = getUsersUtils();
    return usersUtils.patchUser(params);
}

export default {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    patchUser
}