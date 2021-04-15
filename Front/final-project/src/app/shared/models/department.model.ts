import { ICategory } from "./category.model";

export interface IDepartment {
    id: number;
    name: string;
    icon: string;
    categories: ICategory[];
}