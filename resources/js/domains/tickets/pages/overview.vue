<script setup lang="ts">
import { fetchTicketsByUser, getAllTickets, formatDate } from "../store";
import { fetchCategories, getCategoryById } from "../../categories/store";
import { fetchUsers, getAllUsers, getUserById } from "../../users/store";
import { useRoute } from "vue-router";
import { useAuth } from "../../../composables/useAuth";

const route = useRoute();
const { user } = useAuth();

if (route.query.verified === "1") {
    alert("Your email has been verified.");
}

//fetchTickets();
if (user.value?.id !== undefined) {
    fetchTicketsByUser(user.value.id);
}
fetchUsers();
fetchCategories();
</script>
<template>
    <h1 class="text-2xl font-bold mb-4">Tickets Overview</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Category</th>
                <th>Assigned To</th>
                <th>Link to details</th>
                <th>Edit ticket</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
            <tr v-for="ticket in getAllTickets" :key="ticket.id">
                <td>{{ ticket.id }}</td>
                <td>{{ ticket.title }}</td>
                <td>{{ ticket.description }}</td>
                <td>{{ ticket.status }}</td>
                <td>
                    {{ getUserById(ticket.made_by).value?.first_name }}
                    {{ getUserById(ticket.made_by).value?.last_name }}
                </td>
                <td>
                    {{ getCategoryById(ticket.category_id).value?.name }}
                </td>
                <td v-if="ticket.assigned_to">
                    {{ getUserById(ticket.assigned_to).value?.first_name }}
                    {{ getUserById(ticket.assigned_to).value?.last_name }}
                </td>
                <td v-else>Unassigned</td>
                <td><a :href="`/tickets/${ticket.id}`">View Details</a></td>
                <td><a :href="`/tickets/${ticket.id}/edit`">Edit</a></td>
                <td>{{ formatDate(ticket.created_at) }}</td>
                <td>{{ formatDate(ticket.updated_at) }}</td>
            </tr>
        </thead>
    </table>
</template>
<style scoped>
table {
    width: 50%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
    text-align: left;
}
a {
    color: #3490dc;
    text-decoration: none;
}
</style>
