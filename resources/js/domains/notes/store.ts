import { storeModuleFactory } from "../../services/store";

export type Note = {
    id: number;
    ticket_id: number;
    content: string;
    user_id: number;
    created_at: string;
};

const noteStore = storeModuleFactory<Note>("notes");

//getters
export const getAllNotes = noteStore.getters.all;
export const getNoteById = noteStore.getters.getById;

//actions
export const fetchNotes = noteStore.actions.getAll;

//setters
export const createNote = noteStore.actions.create;
export const updateNote = noteStore.actions.update;
export const deleteNote = noteStore.actions.delete;
