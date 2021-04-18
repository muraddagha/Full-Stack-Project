import { ICategory } from "../category.model";
import { IPhoto } from "./product-photo.model";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    sku: string;
    inStock: boolean;
    softDeleted: boolean;
    category: ICategory;
    photos: IPhoto[];
}