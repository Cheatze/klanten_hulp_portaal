<script setup lang="ts">
import { ref } from "vue";
import TicketForm from "../components/TicketForm.vue";
import { fetchCategories, createTicket, Ticket } from "../store";

const ticket = ref({
    title: "",
    description: "",
    status: "open",
    user_id: null,
    category_id: null,
});
</script>
<template>
    <h2 class="text-2xl font-bold mb-4">Create Ticket</h2>
    <TicketForm :ticket="ticket" />
</template>
