import { IProductOptionItem } from "./product-option-item.model";

export interface IOption {
    id: number;
    title: string;
    type: number;
    productOptionItems: IProductOptionItem[];
}