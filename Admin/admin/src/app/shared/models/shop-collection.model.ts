import { IProduct } from "./product/product.model";

export interface IShopCollection {
    id: number;
    orderBy: number;
    subtitle: string;
    title: string;
    backgroundColor: string;
    btnText: string;
    btnUrl: string;
    softDeleted: boolean;
    product: IProduct;
}