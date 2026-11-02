<script setup lang="ts">
import { computed } from "vue";
import { fetchCategories, getAllCategories } from "../../categories/store";

fetchCategories();

// Sort categories alphabetically by name
const sortedCategories = computed(() => {
    // If getAllCategories is a Pinia getter or ref, access its value via .value or directly if reactive
    const list = Array.isArray(getAllCategories)
        ? getAllCategories
        : (getAllCategories.value ?? []);
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<template>
    <div
        class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100"
    >
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
            Categories Overview
        </h1>

        <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table
                class="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700"
            >
                <thead
                    class="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold"
                >
                    <tr>
                        <th scope="col" class="px-6 py-3.5">Name</th>
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
                            {{ category.name }}
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
