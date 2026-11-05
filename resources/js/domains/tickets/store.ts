import { storeModuleFactory } from "../../services/store";

export type Ticket = {
    id: number;
    title: string;
    description: string;
    status: "open" | "closed" | "pending";
    made_by: number;
    assigned_to: number | null;
    category_id: number;
    created_at: string;
    updated_at: string;
};

const ticketStore = storeModuleFactory<Ticket>("tickets");

//getters
export const getAllTickets = ticketStore.getters.all;
export const getTicketById = ticketStore.getters.getById;

//actions
export const fetchTickets = ticketStore.actions.getAll;
export const fetchById = ticketStore.actions.fetchById;
export const fetchTicketsByUser = ticketStore.actions.getByUser;

//setters
export const createTicket = ticketStore.actions.create;
export const updateTicket = ticketStore.actions.update;
export const deleteTicket = ticketStore.actions.delete;
export const patchTicket = ticketStore.actions.patch;

//in een helpers map zetten, zodat het overal gebruikt kan worden.
export const formatDate = (dateString: string) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

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
export const deleteResponse = responseStore.actions.delete;

// export type Category = {
//     id: number;
//     name: string;
// };

// const categoryStore = storeModuleFactory<Category>("categories");

// //getters
// export const getAllCategories = categoryStore.getters.all;
// export const getCategoryById = categoryStore.getters.getById;

// //Actions
// export const fetchCategories = categoryStore.actions.getAll;
// export const fetchCatagoryById = categoryStore.actions.fetchById;
