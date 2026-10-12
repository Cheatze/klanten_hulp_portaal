import { ref, computed } from "vue";
import { getRequest, postRequest, putRequest, deleteRequest } from "../http";

export interface Identifiable {
    id: number;
}

export const storeModuleFactory = <T extends Identifiable>(
    moduleName: string,
) => {
    const state = ref<Record<number, T>>({});

    const getters = {
        all: computed(() => Object.values(state.value)),
        getById: (id: number) => computed(() => state.value[id]),
    };

    const setters = {
        setAll: (items: T[]): void => {
            for (const item of items)
                state.value[item.id] = Object.freeze(item);
        },
        deleteByItem: (item: Pick<T, "id">): void => {
            delete state.value[item.id];
        },
    };

    const actions = {
        getAll: async (): Promise<void> => {
            const { data } = await getRequest(moduleName);
            if (!data) return;
            setters.setAll(data);
        },
        create: async (item: Omit<T, "id">): Promise<void> => {
            const { data } = await postRequest(moduleName, item);
            if (!data) return;
            setters.setAll(data);
        },
        update: async (id: number, item: Partial<T>): Promise<void> => {
            const { data } = await putRequest(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setAll(data);
        },
        delete: async (id: number): Promise<void> => {
            await deleteRequest(`${moduleName}/${id}`);
            setters.deleteByItem({ id });
        },
    };

    return { getters, setters, actions };
};
