import { ICategory } from "./category.model";

export interface IDepartment {
    id: number;
    name: string;
    icon: string;
    logo: string;
    fileName: string;
    isPopular: boolean;
    softDeleted: boolean;
}