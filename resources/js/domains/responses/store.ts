import { storeModuleFactory } from "../../services/store";

export type Response = {
    id: number;
    ticket_id: number;
    content: string;
    user_id: number;
    created_at: string;
};

const responseStore = storeModuleFactory<Response>("responses");

//getters
export const getAllResponses = responseStore.getters.all;
export const getResponseById = responseStore.getters.getById;

//actions
export const fetchResponses = responseStore.actions.getAll;

//setters
export const createResponse = responseStore.actions.create;
export const updateResponse = responseStore.actions.update;
export const patchResponse = responseStore.actions.patch;
export const deleteResponse = responseStore.actions.delete;
