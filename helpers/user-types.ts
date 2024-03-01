import { Request } from "express";

export enum UserURL {
    CREATE_USER = '/sign-up-user',
    LOGIN = '/login',
    CREATE_REFRESH_TOKEN = '/refresh-token',
    LOGOUT = '/logout'
}

export interface AuthenticatedRequest extends Request {
    userId?: string; 
}
