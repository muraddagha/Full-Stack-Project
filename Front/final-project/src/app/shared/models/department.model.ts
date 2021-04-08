import { ICategory } from "./category.model";

export interface IDepartment {
    id: number;
    name: string;
    categories: ICategory[];
}