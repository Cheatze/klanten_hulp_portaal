<script setup lang="ts">
import {
    fetchById,
    getTicketById,
    fetchCategories,
    getCategoryById,
} from "../store";
import { fetchUsers, getUserById } from "../../users/store";
import { useRoute } from "vue-router";
const route = useRoute();
const ticketId = Number(route.params.id);
fetchById(ticketId);
fetchUsers();
fetchCategories();
const ticket = getTicketById(ticketId);
</script>
<template>
    <h2 class="text-2xl font-bold mb-4">Ticket Details</h2>
    <div v-if="ticket">
        <h1><strong>Title:</strong> {{ ticket.title }}</h1>
        <p><strong>Description:</strong> {{ ticket.description }}</p>
        <p><strong>Status:</strong> {{ ticket.status }}</p>
        <p>
            <strong>Created by:</strong>
            {{ getUserById(ticket.made_by).value?.first_name }}
            {{ getUserById(ticket.made_by).value?.last_name }}
        </p>
        <p v-if="ticket.assigned_to">
            <strong>Assigned to:</strong>
            {{ getUserById(ticket.assigned_to).value?.first_name }}
            {{ getUserById(ticket.assigned_to).value?.last_name }}
        </p>
        <p>
            <strong>Category:</strong>
            {{ getCategoryById(ticket.category_id).value?.name }}
        </p>
    </div>
</template>
<style scoped>
div {
    margin-bottom: 1rem;
    margin-left: 1rem;
}
p {
    margin: 0.5rem 0;
}
</style>
