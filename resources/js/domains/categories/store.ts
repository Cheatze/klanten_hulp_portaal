import { storeModuleFactory } from "../../services/store";

export type Category = {
    id: number;
    name: string;
};

const categoryStore = storeModuleFactory<Category>("categories");

//getters
export const getAllCategories = categoryStore.getters.all;
export const getCategoryById = categoryStore.getters.getById;

//Actions
export const fetchCategories = categoryStore.actions.getAll;
export const fetchCategoryById = categoryStore.actions.fetchById;
