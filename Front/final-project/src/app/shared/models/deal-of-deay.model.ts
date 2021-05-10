import { IProduct } from "./product/product.model";

export interface IDealOfDay {
    subtitle: string
    title: string
    backgroundColor: string
    product: IProduct
    softDeleted: boolean
}