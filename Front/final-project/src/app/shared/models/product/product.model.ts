import { IBrand } from "../brand.model";
import { ICategory } from "../category.model";
import { IDiscount } from "./discount.model";
import { IOption } from "./product-option.model";
import { IPhoto } from "./product-photo.model";
import { IProductReview } from "./product-review.model";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    starCount: number;
    sku: string;
    description: string;
    inStock: boolean;
    isFeatured: boolean;
    isTrend: boolean;
    isTopSell: boolean;
    isHotDeal: boolean;
    softDeleted: boolean;
    category: ICategory;
    discount: IDiscount;
    brand: IBrand;
    photos: IPhoto[];
    options: IOption[];
    reviews: IProductReview[];
}