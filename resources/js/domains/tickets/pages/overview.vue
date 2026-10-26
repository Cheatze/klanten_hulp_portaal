<script setup lang="ts">
import {
    fetchTickets,
    fetchTicketsByUser,
    getAllTickets,
    fetchCategories,
    getCategoryById,
    formatDate,
} from "../store";
import { fetchUsers, getAllUsers, getUserById } from "../../users/store";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "../../../composables/useAuth";

const router = useRouter();
const route = useRoute();
const { user } = useAuth();

//Test to see the user id of the logged in user
//alert("User id: " + user.value?.id);

if (route.query.verified === "1") {
    alert("Your email has been verified.");
}

//fetchTickets();
fetchTicketsByUser(user.value?.id);
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
                <td><a :href="`/tickets/${ticket.id}`">View Details</a></td>
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
