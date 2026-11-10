<script setup lang="ts">
import { ref } from "vue";
import { User } from "../store";
import errorMessage from "../../components/ErrorMessage.vue";
import FormError from "../../components/FormError.vue";

const props = defineProps<{
    user: User;
}>();

const form = ref({ ...props.user });

const emit = defineEmits<{
    (e: "submit", data: Omit<User, "id" | "created_at" | "updated_at">): void;
}>();
</script>
<template>
    <h1>Edit User form</h1>
    <div class="mx-auto max-w-2xl">
        <form
            @submit.prevent="emit('submit', form)"
            class="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div>
                <label
                    for="first_name"
                    class="mb-2 block text-sm font-medium text-gray-700"
                >
                    First Name
                </label>

                <input
                    id="first_name"
                    v-model="form.first_name"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter first name"
                />
            </div>

            <div>
                <label
                    for="last_name"
                    class="mb-2 block text-sm font-medium text-gray-700"
                >
                    Last Name
                </label>

                <input
                    id="last_name"
                    v-model="form.last_name"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter last name"
                />
            </div>

            <div>
                <label
                    for="email"
                    class="mb-2 block text-sm font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter email address"
                />
            </div>

            <div>
                <label
                    for="telephone"
                    class="mb-2 block text-sm font-medium text-gray-700"
                >
                    Telephone
                </label>

                <input
                    id="telephone"
                    v-model="form.telephone"
                    type="text"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter telephone number (optional)"
                />
            </div>

            <div>
                <label
                    for="is_admin"
                    class="mb-2 block text-sm font-medium text-gray-700"
                >
                    Is Admin
                </label>

                <input
                    id="is_admin"
                    v-model="form.is_admin"
                    type="radio"
                    value="true"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <label for="is_admin" class="ml-2 text-sm text-gray-700"
                    >Yes</label
                >
                <input
                    id="is_user"
                    v-model="form.is_admin"
                    type="radio"
                    value="false"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <label for="is_user" class="ml-2 text-sm text-gray-700"
                    >No</label
                >
            </div>
            <button
                type="submit"
                class="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
                Save Changes
            </button>
        </form>
    </div>
</template>
