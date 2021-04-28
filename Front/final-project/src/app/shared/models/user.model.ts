import { IAdress } from "./adress.model";

export interface IUser {
    name: string;
    surname: string;
    email: string;
    phone: string;
    token: string;
    adress: IAdress;
    orderLists: any[];
}