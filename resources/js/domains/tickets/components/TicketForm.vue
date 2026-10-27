<script setup lang="ts">
import { ref } from "vue";
import { fetchCategories, getAllCategories, Ticket } from "../store";
import { fetchUsers, getAllUsers } from "../../users/store";
import ErrorMessage from "../..//components/ErrorMessage.vue";
import FormError from "../../components/FormError.vue";

fetchCategories();
fetchUsers();

// const props = defineProps<{
//     ticket: Omit<Ticket, "id" | "made_by"> & { id?: number; made_by?: number };
// }>();

const props = defineProps({
    ticket: Object,
});

const emit = defineEmits(["submit"]);

const form = ref({ ...props.ticket });

const handleSubmit = () => {
    emit("submit", form.value);
};
</script>
<template>
    <form
        @submit.prevent="handleSubmit"
        class="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
        <div>
            <label
                for="title"
                class="mb-2 block text-sm font-medium text-gray-700"
            >
                Title
            </label>

            <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter a ticket title"
            />

            <FormError name="title" />
        </div>

        <div>
            <label
                for="description"
                class="mb-2 block text-sm font-medium text-gray-700"
            >
                Description
            </label>

            <textarea
                id="description"
                v-model="form.description"
                rows="5"
                required
                class="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Describe the issue..."
            ></textarea>

            <FormError name="description" />
        </div>

        <div>
            <label
                for="status"
                class="mb-2 block text-sm font-medium text-gray-700"
            >
                Status
            </label>

            <select
                id="status"
                v-model="form.status"
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
            </select>

            <FormError name="status" />
        </div>

        <!-- <div>
            <label
                for="assigned_to"
                class="mb-2 block text-sm font-medium text-gray-700"
            >
                Assigned to
            </label>

            <select
                id="assigned_to"
                v-model="form.assigned_to"
                required
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
                <option :value="0" disabled>Select a user</option>

                <option
                    v-for="user in getAllUsers"
                    :key="user.id"
                    :value="user.id"
                >
                    {{ user.first_name }} {{ user.last_name }}
                </option>
            </select>

            <FormError name="assigned_to" />
        </div> -->

        <div>
            <label
                for="category_id"
                class="mb-2 block text-sm font-medium text-gray-700"
            >
                Category
            </label>

            <select
                id="category_id"
                v-model="form.category_id"
                required
                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
                <option :value="0" disabled>Select a category</option>

                <option
                    v-for="category in getAllCategories"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>

            <FormError name="category_id" />
        </div>

        <div class="flex justify-end border-t border-gray-100 pt-4">
            <button
                type="submit"
                class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800"
            >
                Create Ticket
            </button>
        </div>
    </form>
</template>
