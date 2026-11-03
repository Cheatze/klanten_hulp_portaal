<script setup lang="ts">
import { computed, ref } from "vue";
import {
    fetchCategories,
    getAllCategories,
    deleteCategory,
} from "../../categories/store";

fetchCategories();

// Reactive states for alerts
const alertMessage = ref<string | null>(null);
const alertType = ref<"success" | "error">("success");

// Sort categories alphabetically by name
const sortedCategories = computed(() => {
    // If getAllCategories is a Pinia getter or ref, access its value via .value or directly if reactive
    const list = Array.isArray(getAllCategories)
        ? getAllCategories
        : (getAllCategories.value ?? []);
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
});

const DeleteConfirmation = async (categoryId: number) => {
    if (
        confirm(
            "Are you sure you want to delete this category? This action cannot be undone.",
        )
    ) {
        // Clear previous alerts before a new action
        alertMessage.value = null;

        try {
            // Await the store's delete action (assuming it makes an Axios call)
            const response = await deleteCategory(categoryId);

            // Success message from Laravel response -> { message: '...' }
            alertMessage.value =
                response?.data?.message || "Category deleted successfully.";
            alertType.value = "success";
        } catch (error: any) {
            // Error message from Laravel response -> { error: '...' } (Status 400)
            if (error.response && error.response.data.error) {
                alertMessage.value = error.response.data.error;
            } else {
                alertMessage.value =
                    error.message || "An unexpected error occurred.";
            }
            alertType.value = "error";
        }
    }
};
</script>

<template>
    <div
        class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100"
    >
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
            Categories Overview
        </h1>

        <!-- Dynamic Alert Banner -->
        <div
            v-if="alertMessage"
            :class="
                alertType === 'error'
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-green-50 border-green-200 text-green-700'
            "
            class="border px-4 py-3 rounded-lg relative mb-6 flex items-center justify-between shadow-sm"
            role="alert"
        >
            <span class="block sm:inline font-medium">{{ alertMessage }}</span>
            <button
                @click="alertMessage = null"
                class="text-lg font-bold ml-4 hover:opacity-75 focus:outline-none"
            >
                &times;
            </button>
        </div>

        <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table
                class="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700"
            >
                <thead
                    class="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold"
                >
                    <tr>
                        <th scope="col" class="px-6 py-3.5">Name</th>
                        <th scope="col" class="px-6 py-3.5">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                        v-for="category in sortedCategories"
                        :key="category.id"
                        class="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                    >
                        <td
                            class="px-6 py-4 whitespace-nowrap font-medium text-gray-900"
                        >
                            <a :href="`/categories/${category.id}/edit`">{{
                                category.name
                            }}</a>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                            <button
                                @click="() => DeleteConfirmation(category.id)"
                                class="text-red-600 hover:text-red-900"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr v-if="sortedCategories.length === 0">
                        <td class="px-6 py-4 text-gray-400 italic">
                            No categories found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
