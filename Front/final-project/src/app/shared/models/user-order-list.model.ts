import { IItem } from "./user-order-item.model";

export interface IUserOrderList {
    id: number;
    orderDate: string;
    status: number;
    totalSalePrice: number;
    items: IItem[];
}