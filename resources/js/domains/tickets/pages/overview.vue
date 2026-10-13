<script setup lang="ts">
import {
    fetchTickets,
    getAllTickets,
    fetchCategories,
    getCategoryById,
} from "../store";
import { fetchUsers, getAllUsers, getUserById } from "../../users/store";

fetchTickets();
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
                <!-- <th>Created At</th>
                <th>Updated At</th> -->
                <th>Link to details</th>
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
                <td>{{ getCategoryById(ticket.category_id).value?.name }}</td>
                <td v-if="ticket.assigned_to">
                    {{ getUserById(ticket.assigned_to).value?.first_name }}
                    {{ getUserById(ticket.assigned_to).value?.last_name }}
                </td>
                <td><a :href="`/tickets/${ticket.id}`">View Details</a></td>
                <!-- <td>{{ ticket.createdAt }}</td> -->
                <!-- <td>{{ ticket.updatedAt }}</td> -->
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
