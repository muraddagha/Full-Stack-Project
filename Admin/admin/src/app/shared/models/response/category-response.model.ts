import { ICategory } from "../category.model";

export interface ICategoryResponse {
    categories: ICategory[];
    count: number;
}