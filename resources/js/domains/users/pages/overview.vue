<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchUsers, getAllUsers, deleteUser } from "../store";

fetchUsers();

const router = useRouter();

// Reactive states for alerts
const alertMessage = ref<string | null>(null);
const alertType = ref<"success" | "error">("success");

const DeleteConfirmation = async (userId: number) => {
    if (
        confirm(
            "Are you sure you want to delete this user? This action cannot be undone.",
        )
    ) {
        // Clear previous alerts before a new action
        alertMessage.value = null;

        try {
            // Await the store's delete action (assuming it makes an Axios call)
            const response = await deleteUser(userId);

            // Success message from Laravel response -> { message: '...' }
            alertMessage.value =
                response?.data?.message || "User deleted successfully.";
            alertType.value = "success";
        } catch (error: any) {
            alertMessage.value =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                "An unexpected error occurred.";
            alertType.value = "error";
        }
    }
};
</script>
<template>
    <h1 class="text-2xl max-w-4xl mx-auto font-bold mb-4">Users Overview</h1>
    <!-- Dynamic Alert Banner -->
    <div
        v-if="alertMessage"
        :class="
            alertType === 'error'
                ? 'bg-red-50 border-red-200 max-w-4xl mx-auto text-red-700'
                : 'bg-green-50 border-green-200 max-w-4xl mx-auto text-green-700'
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
    <div
        class="max-w-4xl mx-auto justify-center rounded-lg border border-gray-200"
    >
        <table class="min-w-70 divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        First Name
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Last Name
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Email
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Role
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Telephone
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in getAllUsers" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">{{ user.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.first_name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.last_name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.is_admin ? "Admin" : "User" }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ user.telephone }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="DeleteConfirmation(user.id)"
                            class="text-red-600 hover:text-red-900"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
