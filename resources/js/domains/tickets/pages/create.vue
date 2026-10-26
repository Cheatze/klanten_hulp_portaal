<script setup lang="ts">
import { ref } from "vue";
import TicketForm from "../components/TicketForm.vue";
import { fetchCategories, createTicket, Ticket } from "../store";
import { useRouter } from "vue-router";

const ticket = ref<Omit<Ticket, "created_at" | "updated_at">>({
    id: 0,
    title: "",
    description: "",
    status: "open",
    made_by: 0,
    assigned_to: 0,
    category_id: 0,
});
</script>
<template>
    <h2 class="text-2xl font-bold mb-4">Create Ticket</h2>
    <TicketForm :ticket="ticket" />
</template>
