import { storeModuleFactory } from "../../services/store";

export type Ticket = {
    id: number;
    title: string;
    description: string;
    status: "open" | "closed" | "pending";
    made_by: number;
    assigned_to: number | null;
    category_id: number;
};

const ticketStore = storeModuleFactory<Ticket>("tickets");

//getters
export const getAllTickets = ticketStore.getters.all;
export const getTicketById = ticketStore.getters.getById;
export const fetchTickets = ticketStore.actions.getAll;

//setters
export const createTicket = ticketStore.actions.create;
export const updateTicket = ticketStore.actions.update;
export const deleteTicket = ticketStore.actions.delete;

export type Category = {
    id: number;
    name: string;
};

const categoryStore = storeModuleFactory<Category>("categories");

//getters
export const getAllCategories = categoryStore.getters.all;
export const getCategoryById = categoryStore.getters.getById;
export const fetchCategories = categoryStore.actions.getAll;
