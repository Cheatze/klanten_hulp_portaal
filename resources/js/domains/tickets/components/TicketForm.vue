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
    <h2 class="text-2xl font-bold mb-4">Create Ticket form</h2>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="form.title" />
            <FormError name="title" />
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" v-model="form.description"></textarea>
            <FormError name="description" />
        </div>
        <div>
            <label for="status">Status:</label>
            <select id="status" v-model="form.status">
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
            </select>
            <FormError name="status" />
        </div>
        <div>
            <label for="user_id">Assigned to:</label>
            <select id="user_id" v-model="form.assigned_to">
                <option
                    v-for="user in getAllUsers"
                    :key="user.id"
                    :value="user.id"
                >
                    {{ user.first_name }} {{ user.last_name }}
                </option>
            </select>
        </div>
        <div>
            <label for="category_id">Category:</label>
            <select id="category_id" v-model="form.category_id">
                <option
                    v-for="category in getAllCategories"
                    :key="category.id"
                    :value="category.id"
                >
                    {{ category.name }}
                </option>
            </select>
        </div>
        <button type="submit">Create Ticket</button>
    </form>
</template>
