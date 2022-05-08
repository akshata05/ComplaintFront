import { StringLiteralLike } from "typescript";
import { Role } from "./role.enum";

export class User{
    id!:Number;
    username:string="";
    password:string="";
    name:string="";
    pincode:string="";
    accessToken:string="";
    refreshToken:string="";
    role!:Role;
}