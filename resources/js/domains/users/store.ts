import { storeModuleFactory } from "../../services/store";

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    is_admin: boolean;
};

const userStore = storeModuleFactory<User>("users");

//getters
export const getAllUsers = userStore.getters.all;
export const getUserById = userStore.getters.getById;

//actions
export const fetchUsers = userStore.actions.getAll;
export const fetchUserById = userStore.actions.fetchById;
