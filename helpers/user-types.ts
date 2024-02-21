import { Request } from "express";

export enum UserURL {
    CREATE_USER = '/sign-up-user',
    LOGIN = '/login'
}

export interface AuthenticatedRequest extends Request {
    userId?: string; 
}
