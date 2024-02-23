import { Request } from "express";

export enum UserURL {
    CREATE_USER = '/sign-up-user',
    LOGIN = '/login',
    CREATE_REFRESH_TOKEN = '/refresh-token'
}

export interface AuthenticatedRequest extends Request {
    userId?: string; 
}
