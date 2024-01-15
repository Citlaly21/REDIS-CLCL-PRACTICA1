import { Connection } from 'mysql2/promise';
import { NewUserFields, UpdateUserFields } from '../../interfaces/utils/users/usersUtilsInterface';
import { PatchUser } from '../../interfaces/utils/users/usersUtilsInterface';
import CryptoJS from 'crypto-js';
import users from '../../controllers/users';
import {createClient} from 'redis';

const redisConfig ={
    host:'127.0.0.1',
    port: 6379,
    password: '',
}

export class UsersUtils{

    private redisClient: ReturnType<typeof createClient>;
    private databaseConexion: Connection;
    
    
    constructor(db: Connection){
        this.databaseConexion = db;
        this.redisClient= createClient(redisConfig);
    }

    

    async getUsers(): Promise<any> {

        await this.redisClient.connect()
        const redisKey = 'users';
        const cacheData = await this.redisClient.get(redisKey);
        if (cacheData){
            return JSON.parse(cacheData);
        } else{
            const query = "SELECT * FROM users"
            const [rows] = await this.databaseConexion.query(query)
            
            await this.redisClient.set(redisKey, JSON.stringify(rows));  
            return rows
        }

        
    }
    async getUsersById(id: string): Promise<any>  {
        await this.redisClient.connect()
        const redisKey = `users_${id}`;
        const cacheData= await this.redisClient.get(redisKey);

        if (cacheData){
            return JSON.parse(cacheData);
        }else {
            const query ="SELECT * FROM users WHERE id = " + id;
            const [rows] =  await this.databaseConexion.query(query)
            
            await this.redisClient.set(redisKey, JSON.stringify(rows));
            return rows;
        }
        
        
        
    }

    async getUserByEmail(email: string): Promise<any>{
        const preparedQuery = "SELECT * FROM users WHERE email =?";
        const [rows] =await this.databaseConexion.query(preparedQuery, [email])
        return rows;
    }

    async createUser(params: NewUserFields){
        const{
            names,
            lastNames,
            email,
            password,
        } = params;
        const users = await this.getUserByEmail(email);
        if (users.length > 0){
            return Promise.reject('El usuario yaa existe');
        }
        const encryptedPassword= CryptoJS.AES.encrypt(password, process.env.WHATSAPP_SECRET_KEY ).toString();
        const preparedQuery = "INSERT INTO users (names, lastNames, email, password) VALUES (?, ?, ?, ?)";
        const [rows] =await this.databaseConexion.query(preparedQuery, [names, lastNames, email, encryptedPassword])
        return rows;
    }

    async updateUser(params: UpdateUserFields){
        const {
            names,
            lastNames,
            email,
            password,
            id,
        } = params;
        
        console.log(params);
        
        const users = await this.getUsersById(id);
        if (users.length === 0){
            return Promise.reject('El usuario no existe');
        }
    
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.WHATSAPP_SECRET_KEY).toString();
        const preparedQuery = "UPDATE users SET names = ?, lastNames= ?, email = ?, password = ? WHERE id= ?";
        
        const [rows] = await this.databaseConexion.query(preparedQuery, [names, lastNames, email, encryptedPassword, id]);
        return rows;
    }
    
    async patchUser(params: PatchUser) {
        const { id, names, lastNames, email, password } = params;
    
        const users = await this.getUsersById(id);
    
        const updateFields = [
            names && `names = '${names}'`,
            lastNames && `lastNames = '${lastNames}'`,
            email && `email = '${email}'`,
            password && `password = '${password}'`,
        ].filter(Boolean);
    
        if (updateFields.length === 0) {
            return null;
        }
    
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.WHATSAPP_SECRET_KEY).toString();

        const preparedQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ${id}`;
    
        try {
            const [rows] = await this.databaseConexion.query(preparedQuery, [encryptedPassword]);
            return rows;
        } catch (error) {
            console.error('Error :', error);
            throw error;
        }
    }
    

}


