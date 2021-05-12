import { IBrand } from "../brand/brand.model";
import { ICategory } from "../category.model";
import { IDiscount } from "../discount.model";
import { IOption } from "./product-option.model";
import { IPhoto } from "./product-photo.model";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    sku: string;
    description: string;
    inStock: boolean;
    isFeatured: boolean;
    isTrend: boolean;
    isTopSell: boolean;
    isHotDeal: boolean;
    isNewArrival: boolean;
    softDeleted: boolean;
    category: ICategory;
    brand: IBrand;
    discount: IDiscount;
    photos: IPhoto[];
    options: IOption[];
}